variable "additional_tags" {
  default     = {}
  description = "Optional additional tags applied on top of global + module tags"
  type        = map(string)
}

variable "app_base_url" {
  default     = "http://localhost:3000"
  description = "Base URL of your application (e.g., https://app.example.com or http://localhost:3000)"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod."
  }
}

variable "hosted_ui_domain_prefix" {
  default     = null
  description = "Custom domain prefix for the Cognito Hosted UI (optional, will auto-generate if not provided)"
  type        = string
}

variable "region" {
  description = "AWS region for deployment"
  type        = string
}

variable "suffix" {
  description = "Suffix for the resource name"
  type        = string
}