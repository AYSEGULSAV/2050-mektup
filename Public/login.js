
 document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

  
    const response = await fetch('http://127.0.0.1:3000/api/v1/send-password', {
        method: 'POST',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (response.ok) {
      
        document.getElementById('space').style.display = 'none';
        document.getElementById('spacex').style.display = 'block';
        

        alert('Şifreniz e-posta adresinize gönderildi.');
    } else {
        alert('E-posta gönderilemedi, lütfen tekrar deneyin.');
    }
});


document.getElementById('passwordForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value;

    const response = await fetch('http://127.0.0.1:3000/api/v1/verify-password', {
        method: 'POST',
        credentials: 'include', 
        headers: {
     
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });

    if (response.ok) {
        window.location.href = './../src/index.html'; 
    } else {
        alert('Incorrect Password!');
    }
      
   
});

