

const mongoose = require('mongodb');


// User Schema
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: { type: String }
})


const User = mongoose.model('User', UserSchema);
module.exports = User;