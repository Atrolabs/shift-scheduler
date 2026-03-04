locals {
  module_tags = {
    Component = "frontend"
    Path      = "infrastructure/modules/s3"
    Service   = "s3"
  }

  tags = local.module_tags
}

resource "aws_s3_bucket" "this" {
  bucket        = "frontend-${var.suffix}"
  force_destroy = var.force_destroy

  tags = local.tags
}

resource "aws_s3_bucket_ownership_controls" "this" {
  bucket = aws_s3_bucket.this.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "this" {
  block_public_acls       = true
  block_public_policy     = true
  bucket                  = aws_s3_bucket.this.id
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "this" {
  bucket = aws_s3_bucket.this.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.this.id

  versioning_configuration {
    status = var.versioning_enabled ? "Enabled" : "Suspended"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "this" {
  bucket = aws_s3_bucket.this.id

  rule {
    abort_incomplete_multipart_upload {
      days_after_initiation = var.abort_incomplete_multipart_upload_days
    }

    filter {
      prefix = ""
    }

    id     = "abort-multipart"
    status = "Enabled"
  }
}

resource "aws_s3_bucket_cors_configuration" "this" {
  bucket = aws_s3_bucket.this.id
  count  = length(var.cors_allowed_origins) > 0 ? 1 : 0

  cors_rule {
    allowed_headers = var.cors_allowed_headers
    allowed_methods = var.cors_allowed_methods
    allowed_origins = var.cors_allowed_origins
    expose_headers  = var.cors_expose_headers
    max_age_seconds = var.cors_max_age_seconds
  }
}

data "aws_iam_policy_document" "cloudfront_access" {
  count = length(var.cloudfront_distribution_arns) > 0 ? 1 : 0

  statement {
    actions = ["s3:GetObject"]
    effect  = "Allow"
    sid     = "AllowCloudFrontReadOnly"

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = var.cloudfront_distribution_arns
    }

    principals {
      identifiers = ["cloudfront.amazonaws.com"]
      type        = "Service"
    }

    resources = ["${aws_s3_bucket.this.arn}/*"]
  }
}

resource "aws_s3_bucket_policy" "cloudfront_access" {
  count  = length(var.cloudfront_distribution_arns) > 0 ? 1 : 0
  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.cloudfront_access[0].json

  depends_on = [aws_s3_bucket_public_access_block.this]
}
