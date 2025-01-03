require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../Models/Book');
const User = require('../Models/User');
const cloudinary = require('../Config/cloudinary');
const upload = require('../Config/multer');
const { humanReadableDate, remainingDays } = require('../util/date_conv');

const { ObjectId } = mongoose.Types;
// author: String,
//     translator: String,
//     status: Boolean,
//     pages: Number,
//     cover_page: String,
//     count: Number,
//     return_date: Date,
//     holder:

const addBook = async (req, res) => {
    const data = req.body;
    

    if (!req.file) {
        return res.status(400).json({ message: "No cover image uploaded", status: false });
    }

    try {
        // Function to upload the file stream to Cloudinary
        const uploadToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',  // Automatically detect the file type
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);  // Reject the promise in case of error
                        } else {
                            resolve(result);  // Resolve with the result if successful
                        }
                    }
                );

                // Stream the buffer to Cloudinary
                uploadStream.end(fileBuffer);
            });
        };

        // Upload the cover image using the file buffer
        const coverPageResult = await uploadToCloudinary(req.file.buffer);

        // Create a new Book object with the Cloudinary URL
        const newBook = new Book({
            name: data.name,
            author: data.author,
            translator: data.translator,
            status: data.status,
            pages: data.pages,
            cover_page: coverPageResult.secure_url,  // Save the image URL from Cloudinary
            count: data.count,
            return_date: data.return_date,
            holder: null
        });

        // Save the new book to the database
        await newBook.save();
        res.status(200).json({
            message: "Book saved successfully",
            status: true,
            data: newBook
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            status: false
        });
    }
};


const getBook = async (req, res) => {
    const data = req.body;

    try{
        const book = await Book.findById(data.id);

        if (book){
            const user = await User.findById(book.holder);
            const name = user?.name || 'None'; 
            
            const copiedBook = Object.assign({}, book._doc); 
    
            copiedBook.holder = name;
            copiedBook.return_date = humanReadableDate(copiedBook.return_date);
            res.status(200).json({
                status: true,
                message: "Fetched book successfully",
                data: copiedBook,
            });
        } else {
            res.status(404).json({
                status: false,
                message: "Book not found",
            });
        }
    } catch (err) {
        console.log(err);
    }
}

const updateBook= async (req, res) => {
    const data = req.body;
    
    if (data.status === true) {
        data.holder = null;
        data.return_date = null;
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            data.id,
            { 
                holder: data.holder,
                return_date: data.return_date,
                status: data.status,
                count: data.count,
                pages: data.pages
            },
            { new: true }
        );

        if (!updatedBook) {
            res.status(404).json({
                message: "Book not found",
                status: false
            });
        }

        res.status(200).json({
            status: true,
            message: "Updated book successfully",
            data: updatedBook
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteBook = async (req, res) => {
    const data = req.body;

    try {
        const book = await Book.findById(data.id);
        if (book && book.count > 1){
            const updatedBook = await Book.findByIdAndUpdate(
                data.id,
                { $inc: { count: -1 } }, 
                { new: true }
            );
            res.status(200).json({
                message: `Deleted one of ${updatedBook.name} from the catalog`,
                status: true,
                data: updatedBook
            });
        } else {
            const deletedBook = await Book.findByIdAndDelete(data.id);
            if (!deletedBook){
                res.status(404).json({
                    message: "Could not delete the given book",
                    status: false
                });
            } else {
                res.status(200).json({
                    message: `Deleted ${deletedBook.name} successfully`,
                    status: true,
                    data: deletedBook
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            status: false
        });
    }
}

const allBooks = async (req, res) => {

    try {
        const books = await Book.find();

        const renewed_books = [];
        for (const book of books) {
            const user = await User.findById(book.holder);
            const name = user?.name || null; 
            
            const copiedBook = Object.assign({}, book._doc); 

            copiedBook.holder = name;
            copiedBook.return_date = humanReadableDate(copiedBook.return_date);

            renewed_books.push(copiedBook);
        }
        
        res.status(200).json({
            message: "Fectched all books successfully",
            status: true,
            data: renewed_books
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
            status: false,
        });
    }
}

module.exports = { addBook, getBook, updateBook, deleteBook, allBooks };