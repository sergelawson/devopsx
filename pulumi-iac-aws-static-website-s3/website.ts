import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// List of arguments for the AWS S3 website component.
export interface AwsS3WebsiteArgs {
  files: string[]; //list of files to serve from the S3 bucket
}

export class AwsS3Website extends pulumi.ComponentResource {
  public readonly url: pulumi.Output<string>; // the S3 website url.
  constructor(
    name: string,
    args: AwsS3WebsiteArgs,
    opts?: pulumi.ComponentResourceOptions,
  ) {
    super("quickstart:index:AwsS3Website", name, args, opts);

    const bucket = new aws.s3.Bucket("my-bucket", {}, { parent: this });

    // Configure S3 static website hosting and use index.html as the default page.
    const website = new aws.s3.BucketWebsiteConfiguration(
      "website",
      {
        bucket: bucket.id,
        indexDocument: { suffix: "index.html" },
      },
      { parent: this },
    );

    // Allow object uploads to specify an ACL, which is needed for public-read below.
    const ownershipControls = new aws.s3.BucketOwnershipControls(
      "ownership-controls",
      {
        bucket: bucket.id,
        rule: {
          objectOwnership: "ObjectWriter",
        },
      },
      { parent: this },
    );

    // Permit public ACLs so website objects can be read anonymously.
    const publicAccessBlock = new aws.s3.BucketPublicAccessBlock(
      "public-access-block",
      {
        bucket: bucket.id,
        blockPublicAcls: false,
      },
      { parent: this },
    );

    // Create an S3 Bucket object for each file; note the changes to name/source:
    for (const file of args.files) {
      new aws.s3.BucketObject(
        file,
        {
          bucket: bucket.id,
          source: new pulumi.asset.FileAsset(file),
          contentType: "text/html",
          acl: "public-read",
        },
        {
          dependsOn: [ownershipControls, publicAccessBlock],
          parent: this,
        },
      );
    }

    // Capture the URL and make it available as a component property and output:
    this.url = pulumi.interpolate`http://${website.websiteEndpoint}`;
    this.registerOutputs({ url: this.url }); // Signal component completion.
  }
}
