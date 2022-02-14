const express = require('express');
const app = express();
const errorMiddleware = require('./Middleware/error')

app.use(express.json());
//Routes
const product = require('./Routes/productRoute');
app.use('/api/v1',product);
app.use(errorMiddleware);

module.exports = app;