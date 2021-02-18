import * as cdk from '@aws-cdk/core';
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns";
import ec2 = require('@aws-cdk/aws-ec2');
import ssm = require('@aws-cdk/aws-ssm')
import * as path from 'path';

export class FrontendCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpcId = ssm.StringParameter.valueFromLookup(this, '/acme/demo/prime/vpc/id')
    const vpc = ec2.Vpc.fromLookup(this, 'AcmeVpc', {
      isDefault: false,
      vpcId: vpcId
    })

    const backendUri = ssm.StringParameter.fromStringParameterName(
      this, 'backendUri', '/acme/demo/prime/backend/endpoint').stringValue

    const PrimeFrontEndFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'service', {
      vpc,
      memoryLimitMiB: 1024,
      cpu: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../', "median-prime-numbers-react-app"), {
          repositoryName: 'acme/demo/prime-frontend'
        }),
        containerName: 'Prime-Service-FrontEnd',
        containerPort: 8001,
        environment: {
          REACT_APP_BACKEND_URI : `http://${backendUri}`,
          REACT_APP_BACKEND_PORT: '80'
        }
      },
      assignPublicIp: false,
      desiredCount: 2,
      publicLoadBalancer: true
    });
    
    PrimeFrontEndFargateService.targetGroup.configureHealthCheck({
      path: "/",
      port: "8001"
    });
  }
}
