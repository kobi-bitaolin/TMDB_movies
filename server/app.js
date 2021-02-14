const express = require('express');
const connectDB = require('./connectDB');
const app = express();
const env = require('dotenv');
const PORT = process.env.PORT || 5000;

env.config();

// Connect to Database 
connectDB();




app.use(express.json());


//Routes Middleware
app.use("/api/user", require("./routes/auth"));


app.listen(PORT, () => {
console.log(`server listen ${PORT}`);
})




