resource "aws_s3_bucket" "s3_http" {
  bucket = "${var.bucket_name}"
  acl    = "${var.acl}"

  #  policy = "${file("./s3_bucket_policy.json")}"

  versioning {
    enabled = "${var.versioning}"
  }
  website {
    index_document = "index.html"
    error_document = "error.html"

    routing_rules = <<EOF
[{
    "Condition": {
        "KeyPrefixEquals": "docs/"
    },
    "Redirect": {
        "ReplaceKeyPrefixWith": "documents/"
    }
}]
EOF
  }
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["https://www.paddle-planner.com"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  #  logging {
  #    target_bucket = "${aws_s3_bucket.log_bucket.id}"
  #    target_prefix = "log/"
  #  }
}
