stack_details = {
  env         = "dev"                                  #Ideally Injected by Pipeline
  region      = "us-west-2"
  stack_id    = "fedd1ace-6766-4c95-a1c4-72a8b3f56a4b"
  stack_name  = "paddle-planner"
  stack_owner = "alan.ryan@gmail.com"
}

vpc_details_paddle_planner = {
  dns_suffix     = "paddle-planner.com"
  num_az         = "1"
  vpc_cidr_block = "10.178.64.0/20"
}

subnet_cidrs_paddle_planner {
  vpc_cidr_block_amber = ["10.178.64.0/22", "10.178.68.0/22", "10.178.72.0/22"]
  vpc_cidr_block_green = ["10.178.76.0/25", "10.178.76.128/25", "10.178.77.0/25"]
  vpc_cidr_block_red   = ["10.178.77.128/25", "10.178.78.0/25", "10.178.78.128/25"]
}


whitelist_cidr_blocks = [
  "10.176.64.0/20",
]

