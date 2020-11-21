import { corsHeaders, logger } from './configuration';
import readCakes from './read_cakes';

const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;

export const getCakesRestHandler = async () => {
  try {
    logger.info('GET / getCakesRestHandler Invoked');

    logger.info('Attempting to get cakes from repository');
    const { cakeItems } = await readCakes({ pageSize: 250 });
    logger.info(`Successfully acquired cakes from repository, received cakeItems count:${cakeItems.length}`);

    // Not bothering with any mapping between Domain Objects and Persistence Items
    // or DDD in general I guess for that matter 😂
    const cakes = cakeItems;

    logger.info('getCakesRestHandler completed, returning REST response');
    return {
      headers: corsHeaders,
      body: JSON.stringify(cakes),
    };
  } catch (error) {
    logger.error('Error caught in getCakesRestHandler');
    logger.error(error.message);
    logger.error(error.stack);
    return {
      headers: corsHeaders,
      statusCode: INTERNAL_SERVER_ERROR_STATUS_CODE,
    };
  }
};

export default getCakesRestHandler;
