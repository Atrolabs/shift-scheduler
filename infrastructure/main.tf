module "resource_group" {
  source       = "./modules/resource_group"
  project_name = var.project_name
  suffix       = local.suffix
}

module "frontend_bucket" {
  source        = "./modules/s3"
  force_destroy = var.environment != "prod"
  suffix        = local.suffix
}

module "cloudfront" {
  source                      = "./modules/cloudfront"
  blacklisted_countries       = local.blacklisted_countries
  cache_policy_id             = local.cloudfront_cache_policy_id
  default_root_object         = "index.html"
  frontend_bucket_domain_name = module.frontend_bucket.regional_domain_name
  frontend_bucket_name        = module.frontend_bucket.name
  origin_request_policy_id    = local.cloudfront_origin_request_policy_id
  suffix                      = local.suffix
}

module "frontend_bucket_policy" {
  source                       = "./modules/s3_policy"
  cloudfront_distribution_arns = [module.cloudfront.arn]
  s3_bucket_arn                = module.frontend_bucket.arn
  s3_bucket_id                 = module.frontend_bucket.id
}

module "cognito" {
  source       = "./modules/cognito"
  app_base_url = coalesce(var.app_base_url, format("https://%s", module.cloudfront.domain_name))
  environment  = var.environment
  region       = var.aws_region
  suffix       = local.suffix
}