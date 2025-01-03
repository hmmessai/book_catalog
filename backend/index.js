const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const connectDB = require('./Config/db');
const User = require('./Models/User');
const userRoute = require('./Routes/userRoutes');
const bookRoute = require('./Routes/bookRoutes');

connectDB();


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/user', userRoute);
app.use('/book', bookRoute);


app.listen(port, (err)=>{
    if(err) {
        console.log(err.message);
    } else {
        console.log(`Server started on port ${port}`);
    }
})