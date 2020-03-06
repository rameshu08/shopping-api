const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(bodyParser.json({extendedUrl: true}));
app.use(cors());

app.use('/users', require('./controllers/user-controller'));
app.use('/products', require('./controllers/product-controller'));

module.exports = app;