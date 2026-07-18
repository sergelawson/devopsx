import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { AwsS3Website } from "./website";

// Deploy static website to S3 and use index.html as the default page.
const website = new AwsS3Website("my-website", {
  files: ["index.html"],
});

export const url = website.url;
