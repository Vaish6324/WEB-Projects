const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const querystring = require('querystring');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const API_KEY = ''; // Replace with your actual API key

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res) => {
  const { phone, message } = req.body;

  const postData = querystring.stringify({
    route: 'q', 
    message: message,
    language: 'english',
    flash: 0,
    numbers: phone,
  });

  const options = {
    hostname: 'www.fast2sms.com',
    path: '/dev/bulkV2',
    method: 'POST',
    headers: {
      Authorization: API_KEY, 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };
  const smsRequest = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const parsedData = JSON.parse(data);
      if (parsedData.status_code === 200) {
        res.send('<h1>Message Sent Successfully!</h1>');
      } else {
        res.send('<h1>Error: Please ensure your account has completed a transaction of 100 INR or more.</h1>');
      }
    });
  });

  smsRequest.on('error', (error) => {
    res.send(`<h1>Error Sending Message: ${error.message}</h1>`);
  });

  // Write POST data to request body
  smsRequest.write(postData);
  smsRequest.end();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
