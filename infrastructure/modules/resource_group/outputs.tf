output "arn" {
  description = "ARN of the resource group"
  value       = aws_resourcegroups_group.project.arn
}

output "name" {
  description = "Name of the resource group"
  value       = aws_resourcegroups_group.project.name
}
