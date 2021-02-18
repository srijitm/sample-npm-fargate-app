#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BackendCdkStack } from '../lib/BackendStack';
import { FrontendCdkStack } from '../lib/FrontendStack';
import { VpcCdkStack } from '../lib/VpcStack';

const app = new cdk.App();
new VpcCdkStack(app, 'PrimeVpcCdkStack', { 
  env: { 
    account: process.env.TARGET_ACCOUNT_ID || process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.TARGET_REGION || process.env.CDK_DEFAULT_REGION 
}});

new BackendCdkStack(app, 'PrimeBackendCdkStack', { 
  env: { 
    account: process.env.TARGET_ACCOUNT_ID || process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.TARGET_REGION || process.env.CDK_DEFAULT_REGION 
}});

new FrontendCdkStack(app, 'PrimeFrontendCdkStack', { 
  env: { 
    account: process.env.TARGET_ACCOUNT_ID || process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.TARGET_REGION || process.env.CDK_DEFAULT_REGION 
}});
