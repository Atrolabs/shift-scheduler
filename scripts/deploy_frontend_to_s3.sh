#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage: deploy_frontend_to_s3.sh [environment]

Builds the frontend and uploads the dist/ artifacts to the S3 bucket
provisioned by Terraform. Automatically queries Terraform outputs to find
the correct bucket name, so you only need to provide the target environment.

Positional arguments:
  environment   Which Terraform environment to target (default: dev)

Environment variables:
  AWS_PROFILE   Optional AWS CLI profile to use
  AWS_REGION    Overrides detected bucket region for aws CLI commands
EOF
}

log() {
  echo "[deploy] $*"
}

fatal() {
  echo "[deploy] ERROR: $*" >&2
  exit 1
}

ensure_cmd() {
  command -v "$1" >/dev/null 2>&1 || fatal "Required command '$1' not found in PATH"
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
FRONTEND_DIR="${REPO_ROOT}/frontend"
INFRA_DIR="${REPO_ROOT}/infrastructure"

ENVIRONMENT="${1:-dev}"

if [[ "${ENVIRONMENT}" == "-h" || "${ENVIRONMENT}" == "--help" ]]; then
  usage
  exit 0
fi

BACKEND_CONFIG="${INFRA_DIR}/backend/backend-${ENVIRONMENT}.tfvars"
VARS_FILE="${INFRA_DIR}/vars/${ENVIRONMENT}.tfvars"

[[ -d "${FRONTEND_DIR}" ]] || fatal "Frontend directory not found at ${FRONTEND_DIR}"
[[ -d "${INFRA_DIR}" ]] || fatal "Infrastructure directory not found at ${INFRA_DIR}"
[[ -f "${BACKEND_CONFIG}" ]] || fatal "Missing backend config ${BACKEND_CONFIG}. Create it from the .example template."
[[ -f "${VARS_FILE}" ]] || fatal "Missing vars file ${VARS_FILE}. Create it from the .example template and fill in values."

ensure_cmd terraform
ensure_cmd npm
ensure_cmd aws

log "Initializing Terraform backend for '${ENVIRONMENT}' (idempotent)"
pushd "${INFRA_DIR}" >/dev/null
terraform init -input=false -reconfigure -backend-config="${BACKEND_CONFIG}" >/dev/null

if ! terraform output -raw frontend_bucket_name >/dev/null 2>&1; then
  fatal "Unable to read 'frontend_bucket_name' output. Make sure you applied Terraform for the '${ENVIRONMENT}' environment first."
fi
FRONTEND_BUCKET="$(terraform output -raw frontend_bucket_name)"
popd >/dev/null

log "Detected frontend bucket: ${FRONTEND_BUCKET}"

if [[ -z "${FRONTEND_BUCKET}" ]]; then
  fatal "Terraform output returned an empty bucket name"
fi

if [[ -n "${AWS_REGION:-}" ]]; then
  BUCKET_REGION="${AWS_REGION}"
else
  log "Querying bucket region via AWS API"
  BUCKET_REGION="$(aws s3api get-bucket-location --bucket "${FRONTEND_BUCKET}" --output text)"
  if [[ "${BUCKET_REGION}" == "None" ]]; then
    BUCKET_REGION="us-east-1"
  fi
  AWS_REGION="${BUCKET_REGION}"
fi

log "Using AWS region: ${AWS_REGION}"

log "Installing frontend dependencies"
pushd "${FRONTEND_DIR}" >/dev/null
npm ci

log "Building frontend bundle"
npm run build
popd >/dev/null

DIST_DIR="${FRONTEND_DIR}/dist"
[[ -d "${DIST_DIR}" ]] || fatal "Build output directory ${DIST_DIR} not found"

log "Syncing static assets to s3://${FRONTEND_BUCKET}"
aws s3 sync "${DIST_DIR}" "s3://${FRONTEND_BUCKET}" \
  --region "${AWS_REGION}" \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html"

log "Uploading index.html with no-cache header"
aws s3 cp "${DIST_DIR}/index.html" "s3://${FRONTEND_BUCKET}/index.html" \
  --region "${AWS_REGION}" \
  --cache-control "no-cache"

log "Deployment complete"

