import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { Stack } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

const backend = defineBackend({
  auth,
  data,
});

// Override all Lambda functions to use Node.js 22
const dataStack = Stack.of(backend.data);
dataStack.node.findAll().forEach((child) => {
  if (child instanceof lambda.CfnFunction) {
    child.runtime = 'nodejs22.x';
  }
});
