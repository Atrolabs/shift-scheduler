#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<EOF
Usage: $(basename "$0") <module-name>

Creates a new Terraform module under infrastructure/modules/<module-name> with
main.tf, variables.tf, outputs.tf, and README.md containing terraform-docs markers.
EOF
}

if [[ $# -ne 1 ]]; then
  usage >&2
  exit 1
fi

MODULE_NAME="$1"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODULE_DIR="${REPO_ROOT}/infrastructure/modules/${MODULE_NAME}"

if [[ -e "${MODULE_DIR}" ]]; then
  echo "Error: ${MODULE_DIR} already exists." >&2
  exit 1
fi

mkdir -p "${MODULE_DIR}"

cat <<EOF > "${MODULE_DIR}/main.tf"
locals {
  module_tags = {
    Component = "${MODULE_NAME}"
    Path      = "infrastructure/modules/${MODULE_NAME}"
    Service   = "${MODULE_NAME}"
  }

  tags = local.module_tags
}

// TODO: add resources (apply tags = local.tags on taggable resources)
EOF

cat <<'EOF' > "${MODULE_DIR}/variables.tf"
// TODO: define variables
EOF

cat <<'EOF' > "${MODULE_DIR}/outputs.tf"
// TODO: define outputs
EOF

cat <<'EOF' > "${MODULE_DIR}/README.md"
<!-- BEGIN_TF_DOCS -->

<!-- END_TF_DOCS -->
EOF

echo "Module created at ${MODULE_DIR}"

