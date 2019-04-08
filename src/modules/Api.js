const Config = require('../config');

async function get(endpoint) {
  try {  
    let request = new Request(`${Config.apiBaseUrl}${endpoint}`, { method: 'GET', mode: 'no-cors' });
    let response = await fetch(request);
    //console.log(response);
    let result = response.json();
    //console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

const Api = { get };

export default Api;