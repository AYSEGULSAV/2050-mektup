document.getElementById("sendButton").addEventListener("click", async function(event) {
    event.preventDefault();

    const message = document.getElementById("message")?.value.trim();
    const email = document.getElementById("emailInput")?.value.trim();
    const deliveryTimeInput = document.querySelector('input[name="deliveryTime"]:checked');
    const visibilityInput = document.querySelector('input[name="audience"]:checked');

    if (!message) return alert("Please write a letter.");
    if (!email) return alert("Please enter your email address.");
    if (!deliveryTimeInput) return alert("Please select the delivery time.");
    if (!visibilityInput) return alert("Please choose the privacy option for your letter.");


    const deliveryDate = calculateDeliveryDate(deliveryTimeInput.value); 
    const visibility = visibilityInput.value;

    console.log("Gönderilecek tarih:", deliveryDate); 

    sendLetter(message, email, deliveryDate, visibility); 
});
