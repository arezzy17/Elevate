const path = require('path');
const express = require('express');
const app = express();
var cors = require('cors')

var bodyParser = require('body-parser');

// Serve static files
app.use(express.static(__dirname + '/dist/Elevate'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


// default Heroku port

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/Elevate/index.html'));
});
app.listen(process.env.PORT || 4200);
