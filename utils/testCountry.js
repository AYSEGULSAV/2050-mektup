const getCountryFromIP = require('./getCountry');

async function test() {
  const ip = "8.8.8.8"; // Google'ın IP adresi, test için kullanabiliriz
  const country = await getCountryFromIP(ip);
  console.log(`IP: ${ip}, Ülke: ${country}`);
}

test();
