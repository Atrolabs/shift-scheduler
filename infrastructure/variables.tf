variable "app_base_url" {
  description = "Optional custom base URL of your application (e.g., https://app.example.com). When unset, the CloudFront distribution URL is used."
  type        = string
  default     = null
}

variable "aws_region" {
  default     = "eu-central-1"
  description = "AWS region for deployment"
  type        = string
}

variable "environment" {
  description = "Environment name (dev, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be one of: dev, prod."
  }
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}
