# Infrastructure as Code - Shift Scheduler

This directory contains Terraform configuration for deploying the infrastructure on AWS.

## Setup

### 1. Configure Backend State

Set up backend by copying the example files:

```bash
# Development environment
cp backend/backend-dev.tfvars.example backend/backend-dev.tfvars
# Edit backend/backend-dev.tfvars with your actual S3 bucket name

# Production environment
cp backend/backend-prod.tfvars.example backend/backend-prod.tfvars
# Edit backend/backend-prod.tfvars with your actual S3 bucket name
```

### 2. Configure Environment Variables

Set up environment variable files:

```bash
# Development environment
cp vars/dev.tfvars.example vars/dev.tfvars
# Edit vars/dev.tfvars with your configuration

# Production environment
cp vars/prod.tfvars.example vars/prod.tfvars
# Edit vars/prod.tfvars with your configuration
```

> [!IMPORTANT]
> Never commit the actual `.tfvars` files to the repository. They contain sensitive information and are already ignored by `.gitignore`. Only commit the `.example` template files.

## Common Commands

### Format Terraform Code

Format all Terraform files recursively:

```bash
terraform fmt --recursive
```

### Initialize Terraform

Initialize Terraform with backend configuration for a specific environment:

**Development:**

```bash
terraform init --reconfigure -backend-config=backend/backend-dev.tfvars
```

**Production:**

```bash
terraform init --reconfigure -backend-config=backend/backend-prod.tfvars
```

> [!IMPORTANT]
> Use `--reconfigure` when switching between environments to reinitialize the backend with the new configuration.

### Apply Changes

Apply the Terraform configuration:

**Development:**

```bash
terraform apply -var-file="vars/dev.tfvars"
```

**Production:**

```bash
terraform apply -var-file="vars/prod.tfvars"
```

### Destroy Infrastructure

> [!WARNING]
> This will destroy all resources in the specified environment.

**Development:**

```bash
terraform destroy -var-file="vars/dev.tfvars"
```

**Production:**

```bash
terraform destroy -var-file="vars/prod.tfvars"
```

## Directory Structure

```
infrastructure/
├── backend/                    # Backend configuration files
├── modules/                    # Reusable Terraform modules
├── vars/                       # Environment variable files
├── backend.tf                  # Backend configuration
├── locals.tf                   # Local variables
├── main.tf                     # Main Terraform configuration
├── outputs.tf                  # Output definitions
├── providers.tf                # Providers configuration
├── random.tf                   # Random string suffix
├── versions.tf                 # Version constraints
├── variables.tf                # Variable definitions
└── README.md                   # This file
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
| <a name="provider_random"></a> [random](#provider\_random) | 3.7.2 |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_cloudfront"></a> [cloudfront](#module\_cloudfront) | ./modules/cloudfront | n/a |
| <a name="module_cognito"></a> [cognito](#module\_cognito) | ./modules/cognito | n/a |
| <a name="module_frontend_bucket"></a> [frontend\_bucket](#module\_frontend\_bucket) | ./modules/s3 | n/a |
| <a name="module_frontend_bucket_policy"></a> [frontend\_bucket\_policy](#module\_frontend\_bucket\_policy) | ./modules/s3_policy | n/a |
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
| <a name="output_frontend_bucket_domain_name"></a> [frontend\_bucket\_domain\_name](#output\_frontend\_bucket\_domain\_name) | Bucket domain name for use with CloudFront origins |
| <a name="output_frontend_bucket_name"></a> [frontend\_bucket\_name](#output\_frontend\_bucket\_name) | S3 bucket that stores the frontend build artifacts |
<!-- END_TF_DOCS -->
