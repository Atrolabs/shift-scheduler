locals {
  # Geo-blocked per compliance policy — review and update as requirements change
  blacklisted_countries               = ["UA", "IL", "IN"]
  cloudfront_cache_policy_id          = "658327ea-f89d-4fab-a63d-7e88639e58f6" # Managed-CachingOptimized
  cloudfront_origin_request_policy_id = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf" # Managed-CORS-S3Origin
  global_tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
    Project     = var.project_name
  }
  suffix = lower(format("%s-%s-%s", var.project_name, var.environment, random_string.suffix.result))
}