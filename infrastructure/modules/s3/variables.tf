variable "abort_incomplete_multipart_upload_days" {
  default     = 7
  description = "Cleanup dangling multipart uploads to save storage costs"
  type        = number
}

variable "additional_tags" {
  default     = {}
  description = "Optional additional tags applied on top of global + module tags"
  type        = map(string)
}

variable "cors_allowed_headers" {
  default     = ["*"]
  description = "Allowed headers for the CORS rule"
  type        = list(string)
}

variable "cors_allowed_methods" {
  default     = ["GET", "HEAD"]
  description = "Allowed HTTP methods for the CORS rule"
  type        = list(string)
}

variable "cors_allowed_origins" {
  default     = []
  description = "Allowed origins for CORS (empty list disables CORS config)"
  type        = list(string)
}

variable "cors_expose_headers" {
  default     = []
  description = "Response headers exposed via CORS"
  type        = list(string)
}

variable "cors_max_age_seconds" {
  default     = 600
  description = "Max age for preflight responses"
  type        = number
}

variable "force_destroy" {
  default     = false
  description = "Allow Terraform to delete non-empty buckets (enable for non-prod only)"
  type        = bool
}

variable "suffix" {
  description = "Randomized suffix to keep bucket names unique"
  type        = string
}

variable "versioning_enabled" {
  default     = false
  description = "Toggle object versioning"
  type        = bool
}
