import {
  docClient,
  environment,
  logger,
} from './configuration';

const { MEETBEL_TEST_TABLE_NAME } = environment;

const persistenceItemToCakeItem = (cakeItem) => {
  const {
    PK, SK, ...cake
  } = cakeItem;
  return cake;
};

const readCakes = async ({
  pageSize = 250,
}) => {
  logger.info('readCakes Persistence Adapter Called to Read Cakes');
  logger.info(`Provided with pageSize:${pageSize}`);

  try {
    logger.info('Attempting to read readCakes from persistence');
    const params = {
      TableName: MEETBEL_TEST_TABLE_NAME,
      KeyConditionExpression: 'PK = :expectedKey',
      ExpressionAttributeValues: {
        ':expectedKey': 'Cake',
      },
      Limit: pageSize,
      ReturnConsumedCapacity: 'TOTAL',
    };

    const {
      ScannedCount: scannedCount,
      Count: count,
      LastEvaluatedKey: lastEvaluatedKey,
      Items: items = [],
    } = await docClient.query(params).promise();

    logger.info(`DynamoDB get succeeded, scannedCount:${scannedCount} and item count:${count}`);
    logger.info(`And lastEvaluatedKey:${lastEvaluatedKey}`);

    if (items.length === 0) throw new Error('No Cake found in persistence');

    logger.info('Attempting to convert persistence items to cakeItems');
    const cakeItems = items.map(persistenceItemToCakeItem);

    return {
      cakeItems,
    };
  } catch (error) {
    // if (error instanceof NonExistentItemError) {
    //   logger.info('Unable to get the requested resource from the DB');
    //   throw error;
    // }

    logger.error('failed to read Cake from DynamoDb with error:');
    logger.error(error.message);
    logger.error(error.stack);
    throw new Error('Failed to read Cake');
  }
};

export default readCakes;
