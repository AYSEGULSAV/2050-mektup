
function calculateDeliveryDate(optionValue) {
    const now = new Date();
    const yearsToAdd = parseInt(optionValue, 10);

    if (yearsToAdd === 2050) {
        now.setFullYear(2050);
        now.setMonth(0); // Ocak
        now.setDate(1);
    } else if (!isNaN(yearsToAdd)) {
        now.setFullYear(now.getFullYear() + yearsToAdd);
    } else {
        throw new Error("Invalid delivery time option.");
    }

    return now.toISOString(); 
}


// send-letter-shared.js
async function sendLetter(message, email, deliveryTime, visibility) {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/send-letter', {
            method: 'POST',
            credentials: 'include', 
            headers: { 
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
        
        
        resetForm(); 
    } catch (error) {
        console.error('An error occurred while saving the letter:', error);
        alert("Unable to connect to the server. Please try again later.");
    }
}
function resetForm() {
    
    document.getElementById("message").value = ''; 
    document.getElementById("emailInput").value = '';

    const deliveryTimeInputs = document.querySelectorAll('input[name="deliveryTime"]');
    const visibilityInputs = document.querySelectorAll('input[name="audience"]');

    deliveryTimeInputs.forEach(input => input.checked = false); 
    visibilityInputs.forEach(input => input.checked = false); 
}
