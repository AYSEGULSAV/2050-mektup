document.getElementById("sendButton").addEventListener("click", async function(event) {
    event.preventDefault();

    // Kullanıcı giriş yapmış mı? (localStorage yerine backend doğrulaması ekleyelim)
    const token = localStorage.getItem("token"); // Kullanıcı giriş yaptıysa token'ı burada saklıyoruz.

    if (!token) {
        alert("Please log in to send a letter.");
        window.location.href = "./../View/login.html"; // Kullanıcı giriş yapmamışsa yönlendirme
        return;s
    }

    try {
        // Kullanıcının token'ını backend'e gönderip doğrulayalım
        const authResponse = await fetch('http://127.0.0.1:3000/api/v1/check-auth', {
            method: 'GET',
            credentials: 'include', 
            headers: { 
                'Authorization': `Bearer ${token}`,  // Token'ı header içinde gönderiyoruz
                'Content-Type': 'application/json'
            }
        });

        if (!authResponse.ok) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token"); // Geçersiz token'ı temizleyelim
            window.location.href = "./../View/letter.html";
            return;
        }

        // Kullanıcı doğrulandıysa mektup gönderme işlemi devam etsin
        const message = document.getElementById("message")?.value.trim();
        const email = document.getElementById("emailInput")?.value.trim();
        const deliveryTimeInput = document.querySelector('input[name="deliveryTime"]:checked');
        const visibilityInput = document.querySelector('input[name="audience"]:checked');

        if (!message) {
            alert("Please write a letter.");
            return;
        }
        if (!email) {
            alert("Please enter your email address.");
            return;
        }
        if (!deliveryTimeInput) {
            alert("Please select the delivery time.");
            return;
        }
        if (!visibilityInput) {
            alert("Please choose the privacy option for your letter.");
            return;
        }

        const deliveryTime = deliveryTimeInput.value;
        const visibility = visibilityInput.value;

        // Mektubu backend'e kaydet
        const response = await fetch('http://127.0.0.1:3000/api/v1/send-letter', {
            method: 'POST',
            credentials: 'include', 
            headers: { 
                'Authorization': `Bearer ${token}`, // Kullanıcı doğrulandı, token'ı yine ekleyelim
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ message, email, visibility, deliveryTime }),
        });

        if (!response.ok) {
            const data = await response.json();
            alert("An error occurred while saving the letter: " + (data.message || "Unknown error."));
            return;
        }

        alert("The letter was successfully saved!");
    } catch (error) {
        console.error('An error occurred while saving the letter:', error);
        alert("Unable to connect to the server. Please try again later.");
    }
});
