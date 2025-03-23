// api.js

const fetchData = (url) => {
    return fetch(url, {
      method: 'GET',
      credentials: 'include',  // Cookie'lerin frontend'e gönderilmesi için gerekli
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error('Error:', error);
        return null;  // Hata durumunda null döndürüyoruz
      });
  };
  
  export { fetchData };
  