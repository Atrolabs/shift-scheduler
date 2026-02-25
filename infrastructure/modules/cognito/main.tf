locals {
  module_tags = {
    Component = "auth"
    Path      = "infrastructure/modules/cognito"
    Service   = "cognito"
  }

  tags = merge(local.module_tags, var.additional_tags)
}

resource "aws_cognito_user_pool" "main" {
  name                     = "user-pool-${var.suffix}"
  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]

  admin_create_user_config {
    allow_admin_create_user_only = true
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 30
  }

  # Schema attributes for user registration
  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "name"
    required                 = true
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "family_name"
    required                 = true
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "phone_number"
    required                 = false

    string_attribute_constraints {
      max_length = 2048
      min_length = 0
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "position"
    required                 = false

    string_attribute_constraints {
      max_length = 256
      min_length = 1
    }
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = local.tags
}


# User Pool Client with OAuth for Hosted UI
resource "aws_cognito_user_pool_client" "main" {
  name         = "client-${var.suffix}"
  user_pool_id = aws_cognito_user_pool.main.id

  allowed_oauth_flows                  = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes = [
    "email",
    "openid",
    "profile"
  ]
  callback_urls = ["${var.app_base_url}/callback"]
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
  generate_secret               = false
  logout_urls                   = ["${var.app_base_url}"]
  prevent_user_existence_errors = "ENABLED"
  read_attributes = [
    "custom:position",
    "email",
    "family_name",
    "name",
    "phone_number"
  ]
  supported_identity_providers = ["COGNITO"]
  write_attributes = [
    "custom:position",
    "email",
    "family_name",
    "name",
    "phone_number"
  ]
}

# User Pool Domain - required for Hosted UI
resource "aws_cognito_user_pool_domain" "main" {
  domain       = coalesce(var.hosted_ui_domain_prefix, "auth-${var.suffix}")
  user_pool_id = aws_cognito_user_pool.main.id
}

# User Groups
resource "aws_cognito_user_group" "admin" {
  name         = "admin"
  user_pool_id = aws_cognito_user_pool.main.id
  description  = "Administrator group with full access"
  precedence   = 1
}

resource "aws_cognito_user_group" "employee" {
  name         = "employee"
  user_pool_id = aws_cognito_user_pool.main.id
  description  = "Employee group with limited access"
  precedence   = 2
}


#==============================================================================
# DEV RESOURCES
#==============================================================================

# Test Users (only in dev environment)
resource "aws_cognito_user" "admin_user" {
  count        = var.environment == "dev" ? 1 : 0
  user_pool_id = aws_cognito_user_pool.main.id
  username     = "admin@example.com"

  attributes = {
    email             = "admin@example.com"
    name              = "Admin"
    family_name       = "User"
    phone_number      = "+1234567890"
    "position" = "Manager"
  }

  temporary_password   = "TempPass123!"
  force_alias_creation = false
  message_action       = "SUPPRESS"
}

resource "aws_cognito_user" "employee_user" {
  count        = var.environment == "dev" ? 1 : 0
  user_pool_id = aws_cognito_user_pool.main.id
  username     = "employee@example.com"

  attributes = {
    email             = "employee@example.com"
    name              = "Employee"
    family_name       = "User"
    phone_number      = "+1234567891"
    "position" = "Waitress"
  }

  temporary_password   = "TempPass123!"
  force_alias_creation = false
  message_action       = "SUPPRESS"
}

# Add users to groups
resource "aws_cognito_user_in_group" "admin_user_group" {
  count        = var.environment == "dev" ? 1 : 0
  user_pool_id = aws_cognito_user_pool.main.id
  group_name   = aws_cognito_user_group.admin.name
  username     = aws_cognito_user.admin_user[0].username
}

resource "aws_cognito_user_in_group" "employee_user_group" {
  count        = var.environment == "dev" ? 1 : 0
  user_pool_id = aws_cognito_user_pool.main.id
  group_name   = aws_cognito_user_group.employee.name
  username     = aws_cognito_user.employee_user[0].username
}
