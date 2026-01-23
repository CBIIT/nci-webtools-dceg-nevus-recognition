import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import { createTags } from "./utils/tags";

export interface CloudFrontS3StackProps extends cdk.StackProps {
  tier: string;
  sslCertificateArn?: string;
}

export class CloudFrontS3Stack extends cdk.Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: CloudFrontS3StackProps) {
    super(scope, id, props);

    const { tier, sslCertificateArn } = props;

    // Define custom domain and certificate if SSL certificate ARN is provided
    const domainName = sslCertificateArn ? `moles-melanoma-tool-${tier}.cancer.gov` : undefined;
    let certificate: certificatemanager.ICertificate | undefined;

    if (sslCertificateArn) {
      certificate = certificatemanager.Certificate.fromCertificateArn(
        this,
        "SSLCertificate",
        sslCertificateArn
      );
    }

    // Create S3 bucket for hosting frontend files
    this.bucket = new s3.Bucket(this, "FrontendBucket", {
      bucketName: `${tier}-nevustool-website`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: tier === 'prod' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: tier !== 'prod',
      encryption: s3.BucketEncryption.S3_MANAGED,
      versioned: tier === 'prod',
      lifecycleRules: [
        {
          enabled: true,
          noncurrentVersionExpiration: cdk.Duration.days(30),
        },
      ],
    });

    // Add tags to S3 bucket
    const s3Tags = createTags({ tier, resourceName: "s3" });
    Object.entries(s3Tags).forEach(([key, value]) => {
      cdk.Tags.of(this.bucket).add(key, value);
    });

    // Create CloudFront distribution
    this.distribution = new cloudfront.Distribution(this, "FrontendDistribution", {
      comment: `CloudFront distribution for Nevus Recognition Tool ${tier}`,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
      },
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
          ttl: cdk.Duration.seconds(0),
        },
      ],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      enableIpv6: true,
      // Add custom domain and certificate if SSL certificate ARN is provided
      ...(certificate && domainName && {
        domainNames: [domainName],
        certificate: certificate,
      }),
    });

    // Add tags to CloudFront distribution
    const cloudfrontTags = createTags({ tier, resourceName: "cloudfront" });
    Object.entries(cloudfrontTags).forEach(([key, value]) => {
      cdk.Tags.of(this.distribution).add(key, value);
    });

    // Stack outputs
    new cdk.CfnOutput(this, "BucketName", {
      value: this.bucket.bucketName,
      description: "S3 bucket name for website hosting",
      exportName: `${tier}-nevustool-bucket-name`,
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: this.distribution.distributionId,
      description: "CloudFront distribution ID",
      exportName: `${tier}-nevustool-distribution-id`,
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: this.distribution.distributionDomainName,
      description: "CloudFront distribution domain name",
      exportName: `${tier}-nevustool-domain-name`,
    });

    new cdk.CfnOutput(this, "WebsiteUrl", {
      value: certificate && domainName
        ? `https://${domainName}` 
        : `https://${this.distribution.distributionDomainName}`,
      description: "Website URL",
    });
  }
}