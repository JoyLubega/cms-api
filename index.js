const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const fileRoute = require('./routes/file');
const prensentationRoute = require('./routes/presentations');
require('./db/db');

const app = express();
app.use(express.json());

app.use(cors());
var publicDir = require('path').join(__dirname,'/files');
app.use(express.static(publicDir)); 
app.use(fileRoute);
app.use(prensentationRoute);

app.listen(process.env.PORT || 3030, () => {
  console.log('server started on port 3030');
});
