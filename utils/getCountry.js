const axios = require('axios');

async function getCountryFromIP(ip) {
    try {
    
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        if (response.data && response.data.country) {
            return response.data.country;
        } else {
            return "Bilinmeyen";  
        }
    } catch (error) {
        console.error("IP'den ülke alınırken hata:", error);
        return "Bilinmeyen";
    }
}

module.exports = getCountryFromIP;
