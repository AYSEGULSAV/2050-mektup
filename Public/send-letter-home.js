document.addEventListener("DOMContentLoaded", async function () {
    const messageInput = document.getElementById("message");

    let isLoggedIn = false;

    // Giriş kontrolü yap
    const authResponse = await fetch('http://127.0.0.1:3000/api/v1/check-session', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    });

    const authData = await authResponse.json();
    isLoggedIn = authResponse.ok && authData.success && authData.user;

    // Eğer giriş yapılmamışsa, textarea'yı kilitle ve uyarı ver
    if (!isLoggedIn) {
        messageInput.disabled = false; // disabled yaparsan click olayı yakalanmaz
        messageInput.addEventListener("focus", () => {
            alert("You must log in to write your letter ✨");
            messageInput.blur(); // inputtan çıkartır, yazmayı engeller
        });

        messageInput.addEventListener("keydown", (e) => {
            e.preventDefault(); // yazmayı engeller
        });
    }
});