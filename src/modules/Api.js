const Config = require('../config');

async function get(endpoint) {
  try {  
    let request = new Request(`${Config.apiBaseUrl}${endpoint}`, { method: 'GET' });
    let response = await fetch(request);
    //console.log(response);
    let result = response.json();
    //console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

async function getFullURL(url) {
  try {  
    let request = new Request(url, { method: 'GET' });
    let response = await fetch(request);
    //console.log(response);
    let result = response.json();
    //console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

const Api = { get, getFullURL };

export default Api;