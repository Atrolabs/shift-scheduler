<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_cloudfront_distribution.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution) | resource |
| [aws_cloudfront_origin_access_control.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_origin_access_control) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_blacklisted_countries"></a> [blacklisted\_countries](#input\_blacklisted\_countries) | List of countries to blacklist from the CloudFront distribution | `list(string)` | n/a | yes |
| <a name="input_cache_policy_id"></a> [cache\_policy\_id](#input\_cache\_policy\_id) | Cache policy ID for the CloudFront distribution | `string` | n/a | yes |
| <a name="input_default_root_object"></a> [default\_root\_object](#input\_default\_root\_object) | Default root object for the CloudFront distribution | `string` | n/a | yes |
| <a name="input_frontend_bucket_domain_name"></a> [frontend\_bucket\_domain\_name](#input\_frontend\_bucket\_domain\_name) | Domain name of the frontend bucket | `string` | n/a | yes |
| <a name="input_frontend_bucket_name"></a> [frontend\_bucket\_name](#input\_frontend\_bucket\_name) | Name of the frontend bucket | `string` | n/a | yes |
| <a name="input_origin_request_policy_id"></a> [origin\_request\_policy\_id](#input\_origin\_request\_policy\_id) | Origin request policy ID for the CloudFront distribution | `string` | n/a | yes |
| <a name="input_suffix"></a> [suffix](#input\_suffix) | Randomized suffix to keep resource names unique | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_arn"></a> [arn](#output\_arn) | ARN of the CloudFront distribution |
| <a name="output_domain_name"></a> [domain\_name](#output\_domain\_name) | Domain name of the CloudFront distribution |
| <a name="output_id"></a> [id](#output\_id) | ID of the CloudFront distribution |
<!-- END_TF_DOCS -->