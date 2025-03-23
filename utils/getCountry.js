const axios = require('axios');

async function getCountryFromIP(ip) {
    try {
        // IP API'yi kullanarak ülke bilgisini alıyoruz
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        if (response.data && response.data.country) {
            return response.data.country;
        } else {
            return "Bilinmeyen";  // Eğer ülke alınamazsa
        }
    } catch (error) {
        console.error("IP'den ülke alınırken hata:", error);
        return "Bilinmeyen";  // Hata durumunda
    }
}

module.exports = getCountryFromIP;
