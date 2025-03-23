document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/getUser");
        const data = await response.json();

        if (data.email) {
            document.getElementById("email-address").textContent = data.email;
        }
    } catch (error) {
        console.error("Kullanıcı bilgisi alınamadı:", error);
    }
});
