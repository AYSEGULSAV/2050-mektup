document.getElementById("sendButton").addEventListener("click", async function(event) {
    event.preventDefault();

    try {
        
        const authResponse = await fetch('http://127.0.0.1:3000/api/v1/check-session', {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const authData = await authResponse.json();
        console.log("Auth Data:", authData);

       
        if (!authResponse.ok || !authData.success || !authData.user) {
            alert("Lütfen giriş yapın!");
            window.location.href = "./../View/login.html"; 
            return;
        }
       
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

const currentDate = new Date();
const deliveryValue = deliveryTimeInput.value;

    
if (deliveryValue === '2050') {
    currentDate.setFullYear(2050);
} else {
    currentDate.setFullYear(currentDate.getFullYear() + parseInt(deliveryValue));
}

const formattedDate = currentDate.toISOString();
const visibility = visibilityInput.value;

      
        const response = await fetch('http://127.0.0.1:3000/api/v1/send-letter', {
            method: 'POST',
            credentials: 'include', 
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ message, email, visibility, deliveryTime: formattedDate  }),
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
