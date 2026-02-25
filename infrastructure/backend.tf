# Backend Configuration
terraform {
  # Backend configuration using variables
  backend "s3" {
    # These values will be provided via backend config files
    # For dev: terraform init -backend-config="backend/backend-dev.tfvars"
    # For prod: terraform init -backend-config="backend/backend-prod.tfvars"
  }
}
