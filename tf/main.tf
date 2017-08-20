# VPC and Networking setup
#module "vpc_paddle_planner" {
#  source = "modules/vpc_module/"

# vpc_name      = "paddle-planner"
# stack_details = "${var.stack_details}"
# vpc_details   = "${var.vpc_details_paddle_planner}"
# subnet_cidrs  = "${var.subnet_cidrs_paddle_planner}"
#}

module "s3_paddle_planner_http" {
  source      = "modules/s3_http_server/"
  bucket_name = "paddle-planner.com"
  acl         = "public-read"
  versioning  = true
}

module "s3_paddle_planner_http_www" {
  source      = "modules/s3_http_server/"
  bucket_name = "www.paddle-planner.com"
  acl         = "public-read"
  versioning  = true
}

module "s3_paddle_planner_config" {
  source      = "modules/s3_bucket_module/"
  bucket_name = "paddle-planner-config"
  acl         = "private"
  versioning  = true
}
