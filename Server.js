const express = require('express');  
const app = express();  
var path = require('path');
app.use(express.static(`${__dirname}/dist/demo`));

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/demo/index.html'));
  });
app.listen(process.env.PORT || 8080);  