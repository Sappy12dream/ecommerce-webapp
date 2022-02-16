const express = require('express');
const app = express();
const errorMiddleware = require('./Middleware/error')

app.use(express.json());
//Routes
const product = require('./Routes/productRoute');
const user = require('./Routes/userRoute')
app.use('/api/v1',product);
app.use('/api/v1',user);
app.use(errorMiddleware);

module.exports = app;