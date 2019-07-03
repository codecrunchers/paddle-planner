# Remote Statefile
# Cannot contain interpolations

terraform {
  backend "s3" {
    region = "us-west-2"
    bucket = "paddle-planner-config"
    key    = "statefiles/prod.tfstate"
    acl    = "private"
  }
}

# Setup the region here
provider "aws" {
  region = "${var.stack_details["region"]}"
}
