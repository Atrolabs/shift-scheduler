# Shift Scheduler Infrastructure

Terraform configuration for deploying the application stack on AWS (`eu-central-1`).

## Setup

### 1. Configure Backend State

Copy and edit the example backend configuration:

```bash
cp backend/backend-dev.tfvars.example backend/backend-dev.tfvars
cp backend/backend-prod.tfvars.example backend/backend-prod.tfvars
```

### 2. Configure Environment Variables

Copy and edit the example variable files:

```bash
cp vars/dev.tfvars.example vars/dev.tfvars
cp vars/prod.tfvars.example vars/prod.tfvars
```

> **Important:** Never commit `.tfvars` files. They contain sensitive values and are git-ignored. Only commit `.tfvars.example` templates.

## Common Commands

### Format

```bash
terraform fmt --recursive
```

### Initialize

```bash
# Development
terraform init --reconfigure -backend-config=backend/backend-dev.tfvars

# Production
terraform init --reconfigure -backend-config=backend/backend-prod.tfvars
```

Use `--reconfigure` when switching between environments.

### Apply

```bash
# Development
terraform apply -var-file="vars/dev.tfvars"

# Production
terraform apply -var-file="vars/prod.tfvars"
```

### Destroy

> **Warning:** This destroys all resources in the target environment.

```bash
terraform destroy -var-file="vars/dev.tfvars"
```

## Directory Structure

```
infrastructure/
├── backend/          # Remote state backend configs
├── modules/          # Reusable Terraform modules
│   ├── cloudfront/
│   ├── cognito/
│   ├── resource_group/
│   └── s3/
├── vars/             # Environment variable files
├── backend.tf        # Backend configuration
├── locals.tf         # Local variables and tags
├── main.tf           # Module composition
├── outputs.tf        # Root outputs
├── providers.tf      # Provider configuration
├── random.tf         # Random suffix resource
├── variables.tf      # Input variables
└── versions.tf       # Version constraints
```

---

## Terraform Docs

<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 1.0 |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | ~> 5.0 |
| <a name="requirement_random"></a> [random](#requirement\_random) | ~> 3.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_random"></a> [random](#provider\_random) | 3.8.1 |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_cloudfront"></a> [cloudfront](#module\_cloudfront) | ./modules/cloudfront | n/a |
| <a name="module_cognito"></a> [cognito](#module\_cognito) | ./modules/cognito | n/a |
| <a name="module_frontend_bucket"></a> [frontend\_bucket](#module\_frontend\_bucket) | ./modules/s3 | n/a |
| <a name="module_resource_group"></a> [resource\_group](#module\_resource\_group) | ./modules/resource_group | n/a |

## Resources

| Name | Type |
|------|------|
| [random_string.suffix](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_app_base_url"></a> [app\_base\_url](#input\_app\_base\_url) | Optional custom base URL of your application (e.g., https://app.example.com). When unset, the CloudFront distribution URL is used. | `string` | `null` | no |
| <a name="input_aws_region"></a> [aws\_region](#input\_aws\_region) | AWS region for deployment | `string` | `"eu-central-1"` | no |
| <a name="input_environment"></a> [environment](#input\_environment) | Environment name (dev, prod) | `string` | n/a | yes |
| <a name="input_project_name"></a> [project\_name](#input\_project\_name) | Name of the project | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_cognito_hosted_ui_base_url"></a> [cognito\_hosted\_ui\_base\_url](#output\_cognito\_hosted\_ui\_base\_url) | Base URL for Cognito Hosted UI |
| <a name="output_cognito_hosted_ui_login_url"></a> [cognito\_hosted\_ui\_login\_url](#output\_cognito\_hosted\_ui\_login\_url) | Login URL for Cognito Hosted UI - redirect users here if not authenticated |
| <a name="output_cognito_hosted_ui_logout_url"></a> [cognito\_hosted\_ui\_logout\_url](#output\_cognito\_hosted\_ui\_logout\_url) | Logout URL for Cognito Hosted UI |
| <a name="output_cognito_user_pool_client_id"></a> [cognito\_user\_pool\_client\_id](#output\_cognito\_user\_pool\_client\_id) | Cognito User Pool Client ID |
| <a name="output_cognito_user_pool_domain"></a> [cognito\_user\_pool\_domain](#output\_cognito\_user\_pool\_domain) | Cognito Hosted UI Domain |
| <a name="output_cognito_user_pool_id"></a> [cognito\_user\_pool\_id](#output\_cognito\_user\_pool\_id) | Cognito User Pool ID |
| <a name="output_dev_admin_user"></a> [dev\_admin\_user](#output\_dev\_admin\_user) | Admin user credentials (dev only) |
| <a name="output_dev_employee_user"></a> [dev\_employee\_user](#output\_dev\_employee\_user) | Employee user credentials (dev only) |
| <a name="output_dev_temp_password"></a> [dev\_temp\_password](#output\_dev\_temp\_password) | Temporary password for dev test users (dev only) |
| <a name="output_frontend_bucket_domain_name"></a> [frontend\_bucket\_domain\_name](#output\_frontend\_bucket\_domain\_name) | Bucket domain name for use with CloudFront origins |
| <a name="output_frontend_bucket_name"></a> [frontend\_bucket\_name](#output\_frontend\_bucket\_name) | S3 bucket that stores the frontend build artifacts |
<!-- END_TF_DOCS -->
