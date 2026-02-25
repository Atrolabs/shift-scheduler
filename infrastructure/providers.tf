# Provider Configurations
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.global_tags
  }
}

provider "random" {
  # Random provider configuration (uses default settings)
}
