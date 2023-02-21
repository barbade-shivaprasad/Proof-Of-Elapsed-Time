const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(routes);

module.exports = app;
