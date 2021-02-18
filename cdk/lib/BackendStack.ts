import * as cdk from '@aws-cdk/core';
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns";
import ec2 = require('@aws-cdk/aws-ec2');
import ssm = require('@aws-cdk/aws-ssm')
import * as path from 'path';

export class BackendCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpcId = ssm.StringParameter.valueFromLookup(this, '/acme/demo/prime/vpc/id')
    const vpc = ec2.Vpc.fromLookup(this, 'AcmeVpc', {
      isDefault: false,
      vpcId: vpcId
    })

    const PrimeBackendEndFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'service', {
      vpc,
      memoryLimitMiB: 1024,
      cpu: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../', "prime-calculator-nodejs"), {
          repositoryName: 'acme/demo/prime-backend'
        }),
        containerName: 'Prime-Service-BackEnd',
        containerPort: 3001,
      },
      assignPublicIp: false,
      desiredCount: 2,
      publicLoadBalancer: true,
    });
    
    PrimeBackendEndFargateService.targetGroup.configureHealthCheck({
      path: "/health"
    });

    new ssm.StringParameter(this, 'PrimeBackEndAlb', {
      parameterName: '/acme/demo/prime/backend/endpoint',
      description: 'ACME Demo Prime BackEnd endpoint',
      stringValue: PrimeBackendEndFargateService.loadBalancer.loadBalancerDnsName
    });

  }
}
