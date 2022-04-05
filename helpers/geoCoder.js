const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
  
    // Optional depending on the providers
    
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null // 'gpx', 'string', ...
  };
  
  const geocoder = NodeGeocoder(options);
  

module.exports = geocoder;