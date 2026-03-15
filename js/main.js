// Lead Magnet Form Handler
document.getElementById('leadForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const messageDiv = document.getElementById('leadMessage');
    
    // Show loading
    messageDiv.textContent = 'Sending...';
    messageDiv.className = 'message';
    messageDiv.style.display = 'block';
    
    try {
        // Save to Notion via Pabbly (YOU'LL UPDATE THIS URL AFTER PABBLY SETUP)
        const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZjMDYzMTA0MzU1MjY4NTUzNyI_3D_pc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                source: 'Website Lead Magnet',
                date: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            messageDiv.textContent = '✓ Guide sent! Check your email.';
            messageDiv.className = 'message success';
            document.getElementById('leadForm').reset();
            
            // Trigger download (create a dummy PDF or replace with real one)
            // For now, just show success message
        } else {
            throw new Error('Failed to save');
        }
    } catch (error) {
        messageDiv.textContent = '❌ Something went wrong. Please try again.';
        messageDiv.className = 'message error';
    }
});
