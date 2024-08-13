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


  
  function formatDate(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());
    const year = now.getFullYear();
    
    const timeZoneAbbr = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York', 
      timeZoneName: 'short'
    }).format(date).split(' ').pop();
  
    return `${dayName} ${monthName} ${day} ${hours}:${minutes}:${seconds} ${timezoneAbbr} ${year}`;
  }

  const now = new Date();
  const formattedDate = formatDate(now);

  res.cookie('visitCount', visitCount);
  res.cookie('lastVisit', formattedDate);

  res.send(`<html><body><h1>${message}</h1></body></html>`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
