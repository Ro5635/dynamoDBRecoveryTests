import { corsHeaders } from './configuration';

export const getCakesRestHandler = async () => {
  try {
    console.log('GET / getCakesRestHandler Invoked');

    const responseBody = [{ name: 'Rainbow Cake', weight: 2500, sugar: 55 }];
    console.log('getCakesRestHandler compleated, returning REST response');
    return {
      headers: corsHeaders,
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    console.error('Error caught in getCakesRestHandler');
    console.error(error.message);
    console.error(error.stack);
    return error;
  }
};

export default getCakesRestHandler;
