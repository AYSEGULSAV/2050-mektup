document.getElementById('login-form').addEventListener("submit",async function(e) {
    e.preventDefault();
     const email=document.getElementById('email').value;
     const password=document.getElementById('password').value;

     const response=await fetch("http://127.0.0.1:3000/api/v1/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
     });
     const data =await response.json();
     if(response.ok){
        localStorage.setItem("token",data.token);
        alert("Giriş Başarılı");
        window.location.href="./../src/index.html"
     }else{
        alert("Hata:"+data.message);
     }

})
document.getElementById("signup").addEventListener("click", function () {
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
   message.textContent = "Kayıt ol sayfasına yönlendiriliyorsunuz...";
   message.style.color = "black";
   message.style.fontSize = "1.5rem";
   message.style.fontWeight = "bold";
 
   // Overlay içine mesajı ekle ve body'ye ekle
   overlay.appendChild(message);
   document.body.appendChild(overlay);
 
   setTimeout(() => {
     window.location.href = "./../View/sign.html";
   }, 1500);
 });
 
 
 