## Scripts

Small helpers for common operations.

- `deploy_frontend_to_s3.sh` – Builds the frontend and uploads the build artifacts to the S3 bucket for the chosen environment (defaults to `dev`). Requires `npm`, `aws-cli`.<br>
  Usage: 
  `./scripts/deploy_frontend_to_s3.sh [environment]`

- `generate_terraform_docs.sh` – Runs `terraform-docs` against `infrastructure/` and every module subdirectory to inject up-to-date Inputs/Outputs tables into each README. Requires `terraform-docs`.<br>
  Usage: `./scripts/generate_terraform_docs.sh`

- `create_terraform_module.sh` – Scaffolds a new module folder under `infrastructure/modules/` with `main.tf`, `variables.tf`, `outputs.tf`, and a `README.md` containing terraform-docs markers.<br>
  Usage: `./scripts/create_terraform_module.sh analytics`

> Run scripts from the repo root so relative paths resolve correctly. Some scripts require additional tools (e.g., `terraform-docs`, Terraform CLI, AWS CLI, npm); install them beforehand and configure AWS credentials via `AWS_PROFILE` or environment variables.
