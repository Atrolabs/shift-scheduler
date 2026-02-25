variable "additional_tags" {
  default     = {}
  description = "Optional additional tags applied on top of global + module tags"
  type        = map(string)
}

variable "blacklisted_countries" {
  description = "List of countries to blacklist from the CloudFront distribution"
  type        = list(string)
}

variable "cache_policy_id" {
  description = "Cache policy ID for the CloudFront distribution"
  type        = string
}

variable "default_root_object" {
  description = "Default root object for the CloudFront distribution"
  type        = string
}

variable "frontend_bucket_domain_name" {
  description = "Domain name of the frontend bucket"
  type        = string
}

variable "frontend_bucket_name" {
  description = "Name of the frontend bucket"
  type        = string
}

variable "origin_request_policy_id" {
  description = "Origin request policy ID for the CloudFront distribution"
  type        = string
}

variable "suffix" {
  description = "Randomized suffix to keep resource names unique"
  type        = string
}