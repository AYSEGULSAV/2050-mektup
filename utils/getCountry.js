const axios = require('axios');

async function getCountryFromIP(ip) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data.country || 'Bilinmeyen';
  } catch (error) {
    console.error('Ülke alınırken hata oluştu:', error);
    return 'Bilinmeyen';
  }
}

module.exports = getCountryFromIP;
