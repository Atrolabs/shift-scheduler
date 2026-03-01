locals {
  module_tags = {
    Component = "cdn"
    Path      = "infrastructure/modules/cloudfront"
    Service   = "cloudfront"
  }

  tags = local.module_tags
}

resource "aws_cloudfront_origin_access_control" "this" {
  name                              = "cloudfront-oac-${var.suffix}"
  description                       = "CloudFront OAC for ${var.suffix}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "this" {
  comment             = "CloudFront distribution for ${var.suffix}"
  default_root_object = var.default_root_object
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 403
    response_code         = 200
    response_page_path    = "/${var.default_root_object}"
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/${var.default_root_object}"
  }

  origin {
    domain_name              = var.frontend_bucket_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.this.id
    origin_id                = var.frontend_bucket_name
  }

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD"
    ]
    cache_policy_id = var.cache_policy_id
    cached_methods = [
      "GET",
      "HEAD"
    ]
    compress                 = true
    origin_request_policy_id = var.origin_request_policy_id
    target_origin_id         = var.frontend_bucket_name
    viewer_protocol_policy   = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      locations        = var.blacklisted_countries
      restriction_type = "blacklist"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = local.tags
}