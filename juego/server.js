const express = require('express');
const path = require('path');
const app = express();
app.set('port', (process.env.PORT || 8000));

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

// send the user to index html page in spite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});