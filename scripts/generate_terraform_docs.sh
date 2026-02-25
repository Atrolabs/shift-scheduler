#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INFRA_DIR="${REPO_ROOT}/infrastructure"

if ! command -v terraform-docs >/dev/null 2>&1; then
  echo "Error: terraform-docs is not installed or not on PATH." >&2
  echo "Install it from https://terraform-docs.io/ and rerun this script." >&2
  exit 1
fi

update_docs() {
  local target_dir="$1"
  local label="$2"

  if [[ ! -d "$target_dir" ]]; then
    echo "Skipping ${label}: directory does not exist." >&2
    return
  fi

  if [[ ! -f "${target_dir}/README.md" ]]; then
    echo "Skipping ${label}: README.md not found (terraform-docs requires BEGIN/END markers)." >&2
    return
  fi

  echo "Updating terraform docs for ${label} (${target_dir})"
  terraform-docs markdown table --output-file README.md --output-mode inject "${target_dir}"
}

# Update root infrastructure README.
update_docs "${INFRA_DIR}" "infrastructure root"

# Update each module README.
for module_path in "${INFRA_DIR}"/modules/*; do
  [[ -d "${module_path}" ]] || continue
  module_name="$(basename "${module_path}")"
  update_docs "${module_path}" "module ${module_name}"
done

echo "Terraform docs updated."

