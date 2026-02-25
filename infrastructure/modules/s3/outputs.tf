output "arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.this.arn
}

output "domain_name" {
  description = "Global S3 endpoint for the bucket"
  value       = aws_s3_bucket.this.bucket_domain_name
}

output "id" {
  description = "Unique ID of the S3 bucket"
  value       = aws_s3_bucket.this.id
}

output "name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.this.bucket
}

output "regional_domain_name" {
  description = "Regional S3 endpoint for the bucket"
  value       = aws_s3_bucket.this.bucket_regional_domain_name
}
