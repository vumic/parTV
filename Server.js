const express = require('express');  
const path = require('path');
const app = express();  
app.use(express.static(`${__dirname}/src`));


app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
  });
app.listen(process.env.PORT || 8080);  