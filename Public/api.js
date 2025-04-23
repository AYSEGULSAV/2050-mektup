// api.js

const fetchData = (url) => {
    return fetch(url, {
      method: 'GET',
      credentials: 'include',  
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error('Error:', error);
        return null;  
      });
  };
  
  export { fetchData };
  