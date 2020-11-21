import aws from 'aws-sdk';
import { newLogger } from '@travel-cloud/simple-lambda-logger';

const {
  REGION,
  MEETBEL_TEST_TABLE_NAME,
} = process.env;
const isRunningLocally = process.env.AWS_SAM_LOCAL === 'true';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': 'content-type, Authorization',
};

const logLevel = 'DEBUG';
const environment = {
  MEETBEL_TEST_TABLE_NAME,
};

const logger = newLogger(logLevel);

if (isRunningLocally) {
  aws.config.update({
    region: 'local',
    endpoint: 'http://dynamodb:8000/',
  });
  // Provide Local versions when running locally
  // environment.EXAMPLE_TABLE_NAME = 'exampleTableName';
} else {
  aws.config.update({
    region: REGION,
  });
}

const docClient = new aws.DynamoDB.DocumentClient();

export {
  aws,
  docClient,
  corsHeaders,
  environment,
  logger,
};
