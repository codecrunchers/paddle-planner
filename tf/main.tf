# VPC and Networking setup
module "vpc_paddle_planner" {
  source = "modules/vpc_module/"

  vpc_name      = "paddle-planner"
  stack_details = "${var.stack_details}"
  vpc_details   = "${var.vpc_details_paddle_planner}"
  subnet_cidrs  = "${var.subnet_cidrs_paddle_planner}"
}

