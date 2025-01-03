const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
      } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if connection fails
      }
}

module.exports = connectDB;