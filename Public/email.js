document.addEventListener("DOMContentLoaded", async function () {
    try {
        const token = localStorage.getItem('token');  // localStorage'dan token'ı al
        if (!token) {
            console.log("Token bulunamadı, giriş yapılmamış.");
            return;
        }
        console.log("Token:", localStorage.getItem('token'));

        const response = await fetch("http://127.0.0.1:3000/api/v1/getUser", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token  // Token'ı Authorization başlığına ekle
            }
        });
        
        console.log("API Yanıtı:", response)
        if (response.ok) {
            const data = await response.json();
            const emailAddress = data.email;  // Gelen e-posta adresini al

            if (emailAddress) {
                document.getElementById('email-address').textContent = emailAddress;
            }
        } else {
            console.error("Kullanıcı bilgileri alınamadı.");
        }
    } catch (error) {
        console.error("Bir hata oluştu:", error);
    }
});
