# Nevus Recognition Tool - Infrastructure Deployment Instructions

## Overview

This project uses AWS CDK (Cloud Development Kit) with TypeScript to deploy the Nevus Recognition Tool React application to AWS using CloudFront and S3.

## Prerequisites

- Node.js 18+ installed
- AWS CLI configured with appropriate credentials
- AWS CDK CLI installed (`npm install -g aws-cdk`)
- AWS Account with necessary permissions

## Infrastructure Components

### Stack

**CloudFrontS3Stack** (`{tier}-nevustool-cloudfront-s3`)
- S3 bucket: `{tier}-nevustool-website`
- CloudFront distribution with Origin Access Control
- Custom cache policies for optimal performance
- SPA routing support (404/403 → index.html)
- Optional custom domain: `nevustool-{tier}.nci.nih.gov`

### Environment Variables

Required for deployment:

```bash
export TIER=dev|qa|stage|prod
export AWS_ACCOUNT_ID=your-aws-account-id
```

Optional:

```bash
export AWS_REGION=us-east-1  # defaults to CDK_DEFAULT_REGION or us-east-1
export SSL_CERTIFICATE_ARN=arn:aws:acm:...  # for custom domain
```

## GitHub Actions Workflow

### Deploy Frontend (`deploy.yml`)

**Purpose**: Build React app and deploy to S3/CloudFront

**Triggers**: 
- Manual via workflow_dispatch

**Workflow Steps**:
1. Checkout code
2. Setup Node.js 18
3. Build React application
4. Configure AWS credentials
5. Lookup S3 bucket from CloudFormation stack outputs
6. Deploy to S3 with optimized cache headers
7. Invalidate CloudFront cache

**Required GitHub Secrets**:
- `AWS_ACCOUNT_ID`

**Required GitHub Environment**: Configure per tier (dev, qa, stage, prod)

**Usage**:
1. Go to GitHub Actions tab
2. Select "Deploy Nevus Recognition Tool" workflow
3. Click "Run workflow"
4. Choose tier (dev, qa, stage, prod)
5. Click "Run workflow"

**When to Use**:
- After code changes
- When infrastructure already exists
- Fast deployment (~5-10 minutes)

## Local Development

### Setup

```bash
# Install CDK dependencies
cd infrastructure
npm install

# Build CDK project
npm run build
```

### CDK Commands

```bash
# Set environment variables
export AWS_ACCOUNT_ID=123456789012

# Synthesize CloudFormation templates
cdk synth -c tier=dev

# View differences before deployment
cdk diff -c tier=dev

# Deploy stack
cdk deploy -c tier=dev

# Deploy to other environments
cdk deploy -c tier=qa
cdk deploy -c tier=stage
cdk deploy -c tier=prod

# Destroy stack
cdk destroy -c tier=dev
```

### Build React App Locally

```bash
# From project root
cd client
npm install
npm run build
# Output: client/build/ directory
```

## First Time Deployment

### 1. Configure GitHub

#### GitHub Secrets (Repository level)
Go to Settings → Secrets and variables → Actions → Repository secrets:

1. Add `AWS_ACCOUNT_ID` - Your AWS account ID (12 digits)

#### GitHub Environments
Go to Settings → Environments, create each environment (dev, qa, stage, prod):

Each environment can have:
- Protection rules (require approvals for prod)
- Environment-specific secrets if needed

### 2. Bootstrap CDK (First Time Only per Account/Region)

```bash
# Bootstrap CDK in your AWS account and region
cdk bootstrap aws://ACCOUNT_ID/us-east-1
```

This creates:
- CDK staging bucket for assets
- IAM roles for CloudFormation
- Necessary permissions for deployments

### 3. Deploy Infrastructure

```bash
# Deploy dev environment
cd infrastructure
cdk deploy -c tier=dev

# Or with custom SSL certificate
export SSL_CERTIFICATE_ARN=arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT_ID
cdk deploy -c tier=dev
```

This will create:
- S3 bucket for website hosting
- CloudFront distribution with optimized cache policies
- Origin Access Control for secure S3 access
- CloudFormation outputs (BucketName, DistributionId)

### 4. Deploy Application via GitHub Actions

1. Go to GitHub Actions tab
2. Select "Deploy Nevus Recognition Tool" workflow
3. Click "Run workflow"
4. Select tier: `dev`
5. Click "Run workflow"

The workflow will:
- Build the React application
- Upload to S3 bucket (retrieved from stack outputs)
- Invalidate CloudFront cache
- Provide deployment summary

### 5. Configure DNS (If using custom domain)

After successful deployment with SSL certificate:

1. Get CloudFront distribution domain from AWS Console or CDK output
2. Create CNAME record in your DNS:
   - Name: `moles-melanoma-tool-dev` (or appropriate tier)
   - Type: CNAME
   - Value: `d1234567890abc.cloudfront.net` (your CloudFront domain)
   - TTL: 300

## Deployment Environments

Each environment is completely isolated:

- **dev**: Development environment
  - Stack: `dev-nevustool-cloudfront-s3`
  - Bucket: `dev-nevustool-website`
  - Domain: `moles-melanoma-tool-dev.cancer.gov` (if configured)
  - Settings: Auto-delete on destroy, no versioning

- **qa**: Quality assurance environment
  - Stack: `qa-nevustool-cloudfront-s3`
  - Bucket: `qa-nevustool-website`
  - Domain: `moles-melanoma-tool-qa.cancer.gov` (if configured)
  - Settings: Auto-delete on destroy, no versioning

- **stage**: Staging environment
  - Stack: `stage-nevustool-cloudfront-s3`
  - Bucket: `stage-nevustool-website`
  - Domain: `moles-melanoma-tool-stage.cancer.gov` (if configured)
  - Settings: Auto-delete on destroy, no versioning

- **prod**: Production environment
  - Stack: `prod-nevustool-cloudfront-s3`
  - Bucket: `prod-nevustool-website`
  - Domain: `moles-melanoma-tool.cancer.gov` (if configured)
  - Settings: **Retained on destroy, versioning enabled**

## Stack Outputs

After infrastructure deployment, each stack exports:

- **BucketName**: S3 bucket name (used by GitHub Actions)
- **DistributionId**: CloudFront distribution ID (for cache invalidation)
- **DistributionDomainName**: CloudFront domain name
- **WebsiteUrl**: Full HTTPS URL to access the application

View outputs:
```bash
aws cloudformation describe-stacks \
  --stack-name dev-nevustool-cloudfront-s3 \
  --query 'Stacks[0].Outputs'
```

## Cache Strategy

The infrastructure implements optimized caching:

### Static Assets (`/static/*`, `/assets/*`)
- **Cache Duration**: 365 days
- **Compression**: Gzip and Brotli enabled
- **Purpose**: JavaScript bundles, CSS, images
- **Benefit**: Reduced bandwidth and faster loading

### HTML Files (default behavior)
- **Cache Duration**: 0 seconds (no cache)
- **Purpose**: index.html, asset-manifest.json
- **Benefit**: Always serves latest version, enables instant updates

### GitHub Actions Deployment
The workflow syncs files to S3 using these optimized settings automatically.

## Monitoring and Troubleshooting

### Check Stack Status

```bash
# View stack details
aws cloudformation describe-stacks --stack-name dev-nevustool-cloudfront-s3

# View stack events
aws cloudformation describe-stack-events --stack-name dev-nevustool-cloudfront-s3 --max-items 20
```

### View CloudFront Distribution

```bash
# List distributions
aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='CloudFront distribution for Nevus Recognition Tool dev']"

# Get distribution details
DIST_ID=$(aws cloudformation describe-stacks \
  --stack-name dev-nevustool-cloudfront-s3 \
  --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
  --output text)

aws cloudfront get-distribution --id $DIST_ID
```

### Check S3 Bucket Contents

```bash
# List files
aws s3 ls s3://dev-nevustool-website/ --recursive

# Check bucket size
aws s3 ls s3://dev-nevustool-website/ --recursive --human-readable --summarize
```

### View CloudFront Invalidations

```bash
DIST_ID=$(aws cloudformation describe-stacks \
  --stack-name dev-nevustool-cloudfront-s3 \
  --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
  --output text)

aws cloudfront list-invalidations --distribution-id $DIST_ID
```

### View Deployment Logs

Go to GitHub Actions → Select workflow run → View job logs

### Common Issues

**Issue**: "Stack does not exist"
- **Solution**: Deploy infrastructure first using `cdk deploy -c tier=dev`

**Issue**: "Bucket name already exists"
- **Solution**: Bucket names must be globally unique. Check if bucket exists in another account or was not properly deleted.

**Issue**: "BucketName output not found"
- **Solution**: Redeploy the CloudFormation stack to ensure outputs are created.

**Issue**: "Access Denied" when deploying
- **Solution**: Check AWS credentials and IAM permissions. User needs CloudFormation, S3, CloudFront, IAM permissions.

**Issue**: "CloudFront invalidation failed"
- **Solution**: Check distribution exists and is deployed. View CloudFormation outputs to verify DistributionId.

**Issue**: "Website shows old version"
- **Solution**: CloudFront cache may not be invalidated. Check invalidation status or wait a few minutes.

## Rollback Procedures

### Application Rollback (S3 Versioning - Production Only)

Production bucket has versioning enabled:

```bash
# List object versions
aws s3api list-object-versions \
  --bucket prod-nevustool-website \
  --prefix index.html

# Restore specific version
aws s3api copy-object \
  --copy-source "prod-nevustool-website/index.html?versionId=VERSION_ID" \
  --bucket prod-nevustool-website \
  --key index.html

# Invalidate CloudFront
DIST_ID=$(aws cloudformation describe-stacks \
  --stack-name prod-nevustool-cloudfront-s3 \
  --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
  --output text)

aws cloudfront create-invalidation \
  --distribution-id $DIST_ID \
  --paths "/*"
```

### Infrastructure Rollback (CloudFormation)

```bash
# View stack change sets
aws cloudformation list-change-sets --stack-name dev-nevustool-cloudfront-s3

# Rollback to previous version (if deployment failed)
aws cloudformation rollback-stack --stack-name dev-nevustool-cloudfront-s3

# Or use CDK to redeploy previous version
git checkout PREVIOUS_COMMIT
cd infrastructure
cdk deploy -c tier=dev
```

## Security Features

### S3 Security
- ✅ All S3 buckets are private (public access blocked)
- ✅ Origin Access Control ensures only CloudFront can access bucket
- ✅ Server-side encryption (S3-managed keys)
- ✅ Versioning enabled for production (rollback capability)

### CloudFront Security
- ✅ HTTPS enforced (HTTP redirects to HTTPS)
- ✅ IPv6 enabled
- ✅ TLS 1.2+ enforced
- ✅ Custom SSL certificate support

### Infrastructure Security
- ✅ All resources tagged for compliance
- ✅ IAM roles follow least privilege principle
- ✅ Stack resources protected by CloudFormation policies
- ✅ Production resources retained on deletion

## Cost Optimization

### S3 Costs
- Storage: Pay per GB stored
- Requests: PUT/GET charges (minimal with CloudFront)
- Data transfer: Out to CloudFront (free)

### CloudFront Costs
- Data transfer: Per GB delivered to users
- Requests: Per 10,000 requests
- Price Class 100: North America & Europe only (lowest cost)
- Invalidations: First 1,000/month free

### Cost Reduction Tips
1. Use long cache durations for static assets
2. Enable compression (Gzip/Brotli)
3. Limit CloudFront invalidations (use versioned file names)
4. Use Price Class 100 if global distribution not required

## Migration from Jenkins/Ansible

The GitHub Actions workflow replaces the previous Jenkins/Ansible deployment:

| Ansible Task | CDK/GitHub Actions |
|--------------|-------------------|
| Git checkout | `actions/checkout@v5` |
| Build frontend | `npm ci && npm run build` |
| Backup app | S3 versioning (automatic) |
| Copy files to server | S3 sync via AWS CLI |
| Set permissions | S3 bucket policies (automatic) |
| Start/stop service | Not needed (serverless) |

### Benefits
- ✅ No server maintenance required
- ✅ Global CDN via CloudFront
- ✅ Automatic SSL/TLS
- ✅ Infinite scalability
- ✅ Versioned deployments
- ✅ Easy rollback capabilities
- ✅ Infrastructure as Code (CDK)
- ✅ Cost-effective (pay per use)

## Useful Commands Reference

```bash
# CDK commands
cdk list -c tier=dev                  # List stacks
cdk synth -c tier=dev                 # Synthesize CloudFormation
cdk diff -c tier=dev                  # Show differences
cdk deploy -c tier=dev                # Deploy stack
cdk destroy -c tier=dev               # Delete stack

# AWS CLI - CloudFormation
aws cloudformation describe-stacks --stack-name dev-nevustool-cloudfront-s3
aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE

# AWS CLI - S3
aws s3 ls s3://dev-nevustool-website/
aws s3 sync client/build/ s3://dev-nevustool-website/ --delete

# AWS CLI - CloudFront
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"
aws cloudfront list-invalidations --distribution-id DIST_ID

# Get stack outputs
aws cloudformation describe-stacks \
  --stack-name dev-nevustool-cloudfront-s3 \
  --query 'Stacks[0].Outputs'
```

## Support

For issues or questions:

1. **Check GitHub Actions Logs**: Review workflow execution logs
2. **Check CloudFormation Events**: AWS Console → CloudFormation → Stack → Events
3. **Check CloudFront Distribution**: AWS Console → CloudFront → Distributions
4. **Check S3 Bucket**: AWS Console → S3 → Bucket
5. **Review CDK Diff**: Run `cdk diff -c tier=dev` to see what will change
6. **Contact DevOps Team**: For assistance with AWS resources or permissions

## Additional Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/cloudfront/)
- [S3 Static Website Hosting](https://docs.aws.amazon.com/s3/static-web-hosting/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
