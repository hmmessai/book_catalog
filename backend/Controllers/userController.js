require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require("jsonwebtoken");

const createToken = async (id) => {
    return jwt.sign(id, process.env.TOKEN_SECRET);
};

const register = async (req, res) => {
    const data = req.body;

    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(data.password, salt);
    data.password = hashed_password;
    try {
        const newUser = new User({
            name: data.name,
            age: data.age,
            email: data.email,
            password: data.password,
        });

        await newUser.save();

        const new_user = {
            'name': newUser.name,
            'age': newUser.age,
            'email': newUser.email,
            'id': newUser.id,
        }
        const token = await createToken(new_user);
        res.cookie("token", token);
        res.status(200).json({
            message: `new user ${newUser.name} created`,
            status: true,
            data: new_user
        });
    } catch  (err) {
        console.log(err);
        let errmsg = "";
        if (err.code === 11000) {
            const fieldName = Object.keys(err.keyValue)[0];
            const fieldValue = err.keyValue[fieldName];
            errmsg = `${fieldName} ${fieldValue} already taken`;
        } else {
            errmsg = "Internal Error";
        }
        res.cookie("token", "");
        res.status(500).json({ 
            message: `Error creating user, ${errmsg}`,
            status: false
        });
    }
}

const login = async (req, res) => {
    const userdata = req.body;
  
    const user = await User.findOne({ 
        email: userdata['email'], 
        name: userdata['name'] 
    });
    if (user){
        const auth = await bcrypt.compare(
            userdata.password,
            user.password
        );
        if (auth) {
            const userObject = {
                name: user.name,
                age: user.age,
                email: user.email,
                id: user.id
            };
            const token = createToken(userObject);
            res.cookie("token", token);
            console.log(token);
            res.status(200).json({
                message: "Success",
                status: true,
                data: userObject
            })
        } else {
            res.cookie("token", "");
            res.status(401).json({
                message: "Password is incorrect",
                status: false
            });
        }
    } else {
        res.cookie("token", "");
        res.status(404).json({
            message: 'User not found',
            status: false
        });
    }
    
};
  
const logout = (req, res) => {
    res.cookie("token", "");
    res.status(200).json({
        message: "Logged out successfully",
        status: true,
    });
};

const protect = (req, res, next) => {
    let token;
    if (!req.headers.authorization) {
        return res.status(403).json({ 
            message: "You are not logged in",
            status: false
        });
    }

    token = req.headers.authorization.split(" ")[1];
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) {
        console.log("Could not log user in:-", err.message);
        res.status(401).json({
          status: false,
          message: "You are not logged in",
        });
        return;
      }
      const user = payload;

  
      req.user = user;
      next();
    });
  };

const getUser = async (req, res) => {
    const user = req.user
    res.status(200).json({
        message: "Success",
        status: true,
        data: user
    })
};

module.exports = { register, protect, logout, login, getUser };