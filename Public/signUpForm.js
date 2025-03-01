document.getElementById('signup-form').addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:3000/api/v1/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password ,confirmPassword:password})
    });
    if (password.length < 6) {
        alert("Şifreniz en az 6 karakter olmalıdır.");
        return;
    }
    

    const data = await response.json();
    if (response.ok) {
        alert("Kayıt başarılı");
        window.location.href="./../View/login.html"
    } else {
        alert("Hata: " + data.message);
    }
});
document.getElementById("login").addEventListener("click", function () {
    const body = document.body;
    const overlay = document.createElement("div"); // Yeni bir div oluştur
    const message = document.createElement("p"); // Mesaj etiketi oluştur
  
    // Sayfayı karart
    body.style.transition = "opacity 0.8s";
    body.style.opacity = "0";
  
    // Overlay ayarları (Sayfa tamamen kararsa bile bu görünecek)
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "white";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000"; // Sayfanın üstünde olsun
  
    // Mesaj ayarları
    message.textContent = "Giriş yap sayfasına yönlendiriliyorsunuz...";
    message.style.color = "black";
    message.style.fontSize = "1.5rem";
    message.style.fontWeight = "bold";
  
    // Overlay içine mesajı ekle ve body'ye ekle
    overlay.appendChild(message);
    document.body.appendChild(overlay);
  
    setTimeout(() => {
      window.location.href = "./../View/login.html";
    }, 1500);
  });
