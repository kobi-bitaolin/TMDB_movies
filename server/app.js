
const express = require('express');
const connectDB = require('./connectdb');
const app = express();
const env = require('dotenv');
env.config();
const PORT = process.env.PORT || 5001;
connectDB();

app.listen(PORT, () => {
console.log(`server listen ${PORT}`);
})




