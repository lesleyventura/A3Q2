const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3722;

app.use(cookieParser());

app.get('/', (req, res) => {
  // visit count from cookies
  let visitCount = parseInt(req.cookies.visitCount, 10) || 0;
  let lastVisit = req.cookies.lastVisit;

  visitCount += 1;

  let message;
  if (visitCount === 1) {
    message = 'Welcome to my webpage! It is your first time that you are here.';
  } else {
    message = `Hello, this is the ${visitCount} time that you are visiting my webpage.`;
    if (lastVisit) {
      message += ` <br>Last time you visited my webpage on: ${lastVisit}`;
    }
  }

  const now = new Date();
  function padZero(value) {
    return value.toString().padStart(2, "0");
  }

  function getTimezoneAbbreviation() {
    // Use Intl.DateTimeFormat to get the timezone abbreviation
    const formatter = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' });
    const parts = formatter.formatToParts(now);
    const timeZonePart = parts.find(part => part.type === 'timeZoneName');
    
    // Return the timezone abbreviation or a default value
    return timeZonePart ? timeZonePart.value : 'Unknown';
  }

  function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    var hours = padZero(now.getHours());
    var minutes = padZero(now.getMinutes());
    var seconds = padZero(now.getSeconds());
    var year = padZero(now.getFullYear());
    var timezoneAbbr = getTimezoneAbbreviation();
  
    return `${dayName} ${monthName} ${day} ${hours}:${minutes}:${seconds} ${timezoneAbbr} ${year}`;
  }


  const formattedDate = formatDate(now);

  res.cookie('visitCount', visitCount);
  res.cookie('lastVisit', formattedDate);

  res.send(`<html><body><h1>${message}</h1></body></html>`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
