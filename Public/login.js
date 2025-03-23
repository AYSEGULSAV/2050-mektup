 // İlk formun gönderilmesi
 document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

    // E-posta gönderme isteği backend'e yapılır
    const response = await fetch('http://127.0.0.1:3000/api/v1/send-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (response.ok) {
        // İlk formu gizle ve şifre formunu göster
        document.getElementById('space').style.display = 'none';
        document.getElementById('spacex').style.display = 'block';
        
        // Kullanıcıya şifre gönderildiğini belirten bir mesaj
        alert('Şifreniz e-posta adresinize gönderildi.');
    } else {
        alert('E-posta gönderilemedi, lütfen tekrar deneyin.');
    }
});

// Şifre doğrulama formunun gönderilmesi
document.getElementById('passwordForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value;

    // Şifre doğrulama isteği backend'e yapılır
    const response = await fetch('http://127.0.0.1:3000/api/v1/verify-password', {
        method: 'POST',
        credentials: 'include', 
        headers: {
           // Cookie'lerin frontend'e gönderilmesi için gerekli
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });

    if (response.ok) {
        window.location.href = './../src/index.html'; // Başarıyla giriş yapıldı, yönlendir
    } else {
        alert('Incorrect Password!');
    }
      
   
});

