const Config = require('../config');
const axios = require('axios');

async function get(endpoint) {
  try {  
    // let request = new Request(`${Config.apiBaseUrl}${endpoint}`, { method: 'GET', mode: 'no-cors' });
    // let response = await fetch(request);
    //console.log(response);
    //let result = response.json();
    //console.log(result);
    //return result;
    let response = await axios.get(`${Config.apiBaseUrl}${endpoint}`, {
      headers: {
        'Content-Type':'application/json'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}

const Api = { get };

export default Api;