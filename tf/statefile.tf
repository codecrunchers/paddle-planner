# Remote Statefile
# Cannot contain interpolations

terraform {
  backend "s3" {
    region = "eu-west-1"
    bucket = "paddle-planner.com"
    key    = "statefiles/prod.tfstate"
    acl    = "private"
  }
}

# Setup the region here
provider "aws" {
  region = "${var.stack_details["region"]}"
}
