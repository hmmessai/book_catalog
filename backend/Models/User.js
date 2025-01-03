const mongoose = require('mongoose');
const connectDB = require('../Config/db');


const userSchema = new mongoose.Schema({
    name: { type: String, unique: true},
    age: Number,
    email: { type: String, required: true, unique: true },
    password: String,
    role: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User