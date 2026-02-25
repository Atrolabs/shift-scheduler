locals {
  module_tags = {
    Component = "resource-group"
    Path      = "infrastructure/modules/resource_group"
    Service   = "resource-group"
  }

  tags = merge(local.module_tags, var.additional_tags)
}

resource "aws_resourcegroups_group" "project" {
  description = "All AWS resources for ${var.project_name}"
  name        = "rg-${var.suffix}"

  resource_query {
    query = jsonencode({
      ResourceTypeFilters = ["AWS::AllSupported"]
      TagFilters = [
        {
          Key    = "Project"
          Values = [var.project_name]
        }
      ]
    })
  }

  tags = local.tags
}
