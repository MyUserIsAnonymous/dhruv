// Initialize Stripe - YOU'LL UPDATE THIS AFTER CLIENT GETS STRIPE KEYS
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY'); // ← UPDATE THIS LINE
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// Get selected coach
const selectedCoach = JSON.parse(localStorage.getItem('selectedCoach'));

// Redirect if no coach selected
if (!selectedCoach) {
    window.location.href = 'coaches.html';
}

// Display booking details
if (selectedCoach) {
    document.getElementById('bookingDetails').innerHTML = `
        <h3>Booking Summary</h3>
        <p><strong>Coach:</strong> ${selectedCoach.name}</p>
        <p><strong>Specialty:</strong> ${selectedCoach.specialty}</p>
        <p><strong>Session Rate:</strong> $${selectedCoach.rate}</p>
        <p><strong>Duration:</strong> 60 minutes</p>
        <hr>
        <p><strong>Total:</strong> $${selectedCoach.rate}</p>
    `;
}

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    try {
        // Create payment method
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: document.getElementById('clientName').value,
                email: document.getElementById('clientEmail').value
            }
        });
        
        if (error) {
            throw new Error(error.message);
        }
        
        // Here you would send to your backend to process payment
        // For demo, we'll simulate success
        
        // Save booking to Notion (via webhook) - YOU'LL UPDATE THIS URL AFTER PABBLY SETUP
        const bookingData = {
            clientName: document.getElementById('clientName').value,
            clientEmail: document.getElementById('clientEmail').value,
            coachId: selectedCoach.id,
            coachName: selectedCoach.name,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            amount: selectedCoach.rate,
            paymentMethodId: paymentMethod.id,
            status: 'Confirmed'
        };
        
        // Send to webhook (YOU'LL UPDATE THIS URL AFTER PABBLY SETUP)
        await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZjMDYzMTA0MzU1MjY4NTUzNyI_3D_pc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });
        
        // Redirect to success page
        const params = new URLSearchParams({
            service: `Session with ${selectedCoach.name}`,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value
        });
        
        window.location.href = `success.html?${params.toString()}`;
        
    } catch (error) {
        document.getElementById('card-errors').textContent = error.message;
        submitButton.disabled = false;
        submitButton.textContent = 'Pay & Book Session';
    }
});

// Handle card errors
cardElement.addEventListener('change', function(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});
