
const mongoose = require('mongoose');

const db = 'mongodb+srv://kobi23:kobi23@cluster0.dbe8t.mongodb.net/TMDB?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(db, {
        useNewUrlParser: true,
        useFindAndModify: true
    }
)
    console.log('mongodb is connected.....');
}

module.exports = connectDB;
