# User Pool Outputs
output "user_pool_id" {
  description = "ID of the Cognito User Pool"
  value       = aws_cognito_user_pool.main.id
}

output "user_pool_client_id" {
  description = "ID of the Cognito User Pool Client"
  value       = aws_cognito_user_pool_client.main.id
}

# Hosted UI Outputs
output "hosted_ui_base_url" {
  description = "Base URL for the Cognito Hosted UI (for custom URL construction)"
  value       = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${var.region}.amazoncognito.com"
}

output "hosted_ui_login_url" {
  description = "Full login URL for the Cognito Hosted UI - redirect users here if not authenticated"
  value       = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${var.region}.amazoncognito.com/login?client_id=${aws_cognito_user_pool_client.main.id}&response_type=code&redirect_uri=${urlencode("${var.app_base_url}/callback")}"
}

output "hosted_ui_logout_url" {
  description = "Full logout URL for the Cognito Hosted UI"
  value       = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${var.region}.amazoncognito.com/logout?client_id=${aws_cognito_user_pool_client.main.id}&logout_uri=${urlencode(var.app_base_url)}"
}

output "user_pool_domain" {
  description = "Domain name for the Cognito Hosted UI"
  value       = aws_cognito_user_pool_domain.main.domain
}

# User Groups
output "admin_group_name" {
  description = "Name of the admin user group"
  value       = aws_cognito_user_group.admin.name
}

output "employee_group_name" {
  description = "Name of the employee user group"
  value       = aws_cognito_user_group.employee.name
}

# Development Users (dev environment only)
output "admin_user_username" {
  description = "Username of the admin user (dev environment only)"
  value       = var.environment == "dev" ? aws_cognito_user.admin_user[0].username : null
}

output "employee_user_username" {
  description = "Username of the employee user (dev environment only)"
  value       = var.environment == "dev" ? aws_cognito_user.employee_user[0].username : null
}
