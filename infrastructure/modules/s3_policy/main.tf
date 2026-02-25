data "aws_iam_policy_document" "cloudfront_access" {
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

    resources = ["${var.s3_bucket_arn}/*"]
  }
}

resource "aws_s3_bucket_policy" "cloudfront_access" {
  bucket = var.s3_bucket_id
  policy = data.aws_iam_policy_document.cloudfront_access.json
}