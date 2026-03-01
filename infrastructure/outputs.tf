# Cognito Hosted UI Outputs - Use these URLs for testing
output "cognito_hosted_ui_base_url" {
  description = "Base URL for Cognito Hosted UI"
  value       = module.cognito.hosted_ui_base_url
}

output "cognito_hosted_ui_login_url" {
  description = "Login URL for Cognito Hosted UI - redirect users here if not authenticated"
  value       = module.cognito.hosted_ui_login_url
}

output "cognito_hosted_ui_logout_url" {
  description = "Logout URL for Cognito Hosted UI"
  value       = module.cognito.hosted_ui_logout_url
}

# Cognito resource outputs
output "cognito_user_pool_client_id" {
  description = "Cognito User Pool Client ID"
  value       = module.cognito.user_pool_client_id
  sensitive   = true
}

output "cognito_user_pool_domain" {
  description = "Cognito Hosted UI Domain"
  value       = module.cognito.user_pool_domain
}

output "cognito_user_pool_id" {
  description = "Cognito User Pool ID"
  value       = module.cognito.user_pool_id
}

# Frontend bucket outputs
output "frontend_bucket_domain_name" {
  description = "Bucket domain name for use with CloudFront origins"
  value       = module.frontend_bucket.domain_name
}

output "frontend_bucket_name" {
  description = "S3 bucket that stores the frontend build artifacts"
  value       = module.frontend_bucket.name
}

# Development Users (dev environment only)
output "dev_admin_user" {
  description = "Admin user credentials (dev only)"
  value       = var.environment == "dev" ? module.cognito.admin_user_username : null
}

output "dev_employee_user" {
  description = "Employee user credentials (dev only)"
  value       = var.environment == "dev" ? module.cognito.employee_user_username : null
}

output "dev_temp_password" {
  description = "Temporary password for dev test users (dev only)"
  value       = var.environment == "dev" ? module.cognito.dev_temp_password : null
  sensitive   = true
}
