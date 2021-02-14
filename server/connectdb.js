const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

const db = process.env.MONGO_DB_URI;

const connectDB = async () => {
  await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    console.log('mongodb is connected.....');
}

module.exports = connectDB;


