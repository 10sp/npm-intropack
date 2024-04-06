#!/usr/bin/env node
// Function to log your details in the terminal
function logDetails() {

  let date = new Date();
  date.setFullYear(2024, 3, 6); // Set the year, month (0-indexed), and day
  date.setHours(23, 44, 32); // Set the hours, minutes, and seconds
  
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
    const message = `Hey there! Time is ${currentTime}, I'm Shiv Patil ,currently hacking around OrangeCells's codebases mainly backend.`;
    const twitterLink = "https://twitter.com/exclusiveshiv";
    const linkedinLink = "https://www.linkedin.com/in/ishivpatil/";
    const websiteLink = "https://10sp.github.io";
  
    // Create a colorful box using ANSI escape codes
    const colorfulBox = `  \x1b[38;5;51m+---------------------------------------------------------------+
    |   \x1b[38;5;105m${message}\x1b[38;5;51m    |
    +---------------------------------------------------------------+
    | \x1b[38;5;93mTwitter:\x1b[0m \x1b[38;5;39m${twitterLink}                    \x1b[38;5;51m|
    | \x1b[38;5;93mLinkedIn:\x1b[0m \x1b[38;5;39m${linkedinLink}             \x1b[38;5;51m|
    | \x1b[38;5;93mPortfolio:\x1b[0m  \x1b[38;5;39m${websiteLink}                            \x1b[38;5;51m|
    +---------------------------------------------------------------+\x1b[0m`;
  
    // Log the colorful box in the terminal
    console.log(colorfulBox);
  }
  // Call the function to log your details
  logDetails();
