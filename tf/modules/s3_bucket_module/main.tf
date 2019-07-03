resource "aws_s3_bucket" "s3_bucket" {
  bucket = "${var.bucket_name}"
  acl    = "${var.acl}"

  tags {
    Name = "${var.bucket_name}"
  }
}
