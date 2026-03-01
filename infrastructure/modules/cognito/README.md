<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | n/a |
| <a name="provider_random"></a> [random](#provider\_random) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_cognito_user.admin_user](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user) | resource |
| [aws_cognito_user.employee_user](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user) | resource |
| [aws_cognito_user_group.admin](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_group) | resource |
| [aws_cognito_user_group.employee](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_group) | resource |
| [aws_cognito_user_in_group.admin_user_group](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_in_group) | resource |
| [aws_cognito_user_in_group.employee_user_group](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_in_group) | resource |
| [aws_cognito_user_pool.main](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool) | resource |
| [aws_cognito_user_pool_client.main](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_client) | resource |
| [aws_cognito_user_pool_domain.main](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_domain) | resource |
| [random_password.dev_password](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_app_base_url"></a> [app\_base\_url](#input\_app\_base\_url) | Base URL of your application (e.g., https://app.example.com or http://localhost:3000) | `string` | `"http://localhost:3000"` | no |
| <a name="input_environment"></a> [environment](#input\_environment) | Environment (dev, prod) | `string` | n/a | yes |
| <a name="input_hosted_ui_domain_prefix"></a> [hosted\_ui\_domain\_prefix](#input\_hosted\_ui\_domain\_prefix) | Custom domain prefix for the Cognito Hosted UI (optional, will auto-generate if not provided) | `string` | `null` | no |
| <a name="input_region"></a> [region](#input\_region) | AWS region for deployment | `string` | n/a | yes |
| <a name="input_suffix"></a> [suffix](#input\_suffix) | Suffix for the resource name | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_admin_group_name"></a> [admin\_group\_name](#output\_admin\_group\_name) | Name of the admin user group |
| <a name="output_admin_user_username"></a> [admin\_user\_username](#output\_admin\_user\_username) | Username of the admin user (dev environment only) |
| <a name="output_dev_temp_password"></a> [dev\_temp\_password](#output\_dev\_temp\_password) | Temporary password for dev test users (dev environment only) |
| <a name="output_employee_group_name"></a> [employee\_group\_name](#output\_employee\_group\_name) | Name of the employee user group |
| <a name="output_employee_user_username"></a> [employee\_user\_username](#output\_employee\_user\_username) | Username of the employee user (dev environment only) |
| <a name="output_hosted_ui_base_url"></a> [hosted\_ui\_base\_url](#output\_hosted\_ui\_base\_url) | Base URL for the Cognito Hosted UI (for custom URL construction) |
| <a name="output_hosted_ui_login_url"></a> [hosted\_ui\_login\_url](#output\_hosted\_ui\_login\_url) | Full login URL for the Cognito Hosted UI - redirect users here if not authenticated |
| <a name="output_hosted_ui_logout_url"></a> [hosted\_ui\_logout\_url](#output\_hosted\_ui\_logout\_url) | Full logout URL for the Cognito Hosted UI |
| <a name="output_user_pool_client_id"></a> [user\_pool\_client\_id](#output\_user\_pool\_client\_id) | ID of the Cognito User Pool Client |
| <a name="output_user_pool_domain"></a> [user\_pool\_domain](#output\_user\_pool\_domain) | Domain name for the Cognito Hosted UI |
| <a name="output_user_pool_id"></a> [user\_pool\_id](#output\_user\_pool\_id) | ID of the Cognito User Pool |
<!-- END_TF_DOCS -->
