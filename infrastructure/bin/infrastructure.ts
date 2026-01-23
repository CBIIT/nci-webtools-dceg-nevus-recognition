#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CloudFrontS3Stack } from '../lib/cloudfront-s3-stack';

const app = new cdk.App();

// Get context values
const tier = app.node.tryGetContext('tier') || 'dev';
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION || 'us-east-1';
const sslCertificateArn = process.env.SSL_CERTIFICATE_ARN;

// Stack name pattern: {tier}-nevustool-cloudfront-s3
new CloudFrontS3Stack(app, `${tier}-nevustool-cloudfront-s3`, {
  env: {
    account,
    region,
  },
  tier,
  sslCertificateArn,
  description: `Nevus Recognition Tool CloudFront + S3 infrastructure for ${tier} environment`,
  tags: {
    Application: 'NevusTool',
    Environment: tier,
    ManagedBy: 'CDK',
  },
});

app.synth();
