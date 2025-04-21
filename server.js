const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Replace with your Discord Webhook URL
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1363745587966509086/cZ_E6PovxYXwRVkjeepJ_eH9IgAUqddoZOX9iWS5EAm2akXJndOR6hnD4ia7WMKwBv_r';

// Middleware to log IP addresses automatically when the user visits the site
app.get('/', (req, res) => {
    const userIP = req.ip || req.connection.remoteAddress; // Capture IP address
    console.log(`User IP: ${userIP}`); // Log the IP to the server's console

    // Send the IP to your Discord Webhook
    axios.post(WEBHOOK_URL, {
        content: `New IP logged: ${userIP}`,
    })
    .then(response => {
        console.log('IP sent to Discord webhook:', response.data); // Log the response data from Discord webhook
    })
    .catch(err => {
        console.error('Error sending IP to Discord:', err.response ? err.response.data : err); // Log detailed error info
    });

    // Respond to the user
    res.send('Your IP has been logged!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
