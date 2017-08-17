variable "whitelist_cidr_blocks" {
  type = "list"
}

# Stack Details
variable "stack_details" {
  type = "map"
}


# Services VPC Details
variable "vpc_details_paddle_planner" {
  type = "map"
}

# VPC CIDR Blocks
variable "subnet_cidrs_paddle_planner" {
  type = "map"
}

output "vpc_id" {
  value = "${module.vpc_paddle_planner.vpc_id}"
}

output "services_network_green" {
  value = "${module.vpc_paddle_planner.network_green}"
}

output "services_network_amber" {
  value = "${module.vpc_paddle_planner.network_amber}"
}

output "services_network_red" {
  value = "${module.vpc_paddle_planner.network_red}"
}

