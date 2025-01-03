const mongoose = require('mongoose');
// const connectDB = require('../Config/db');

// connectDB();

const bookSchema = new mongoose.Schema({
    name: { type: String, unique: true},
    author: String,
    translator: String,
    status: {
        type: Boolean,
        required: true,
        default: true,
      },
    pages: Number,
    cover_page: String,
    count: Number,
    return_date: Date,
    holder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

bookSchema.pre('save', function (next) {
    if (this.status) {
      this.holder = null;
      this.return_date = null;
    }
    next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;