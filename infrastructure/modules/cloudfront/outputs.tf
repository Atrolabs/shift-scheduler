output "arn" {
  description = "ARN of the CloudFront distribution"
  value       = aws_cloudfront_distribution.this.arn
}

output "domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.this.domain_name
}

output "id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.this.id
}