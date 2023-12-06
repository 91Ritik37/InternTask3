require("dotenv").config();
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

const User = require('../model/userSchema');

const verification = require("../protected/protected")
// ACCESS_TOKEN_SECERT = "api";



const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "All fields are mandatory!" });

    }


    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400).json({ message: "User already registered!" });

    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);


    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })




    res.status(201).json({ message: "User register successfully", user });

    console.log(`User Register successfully ${user}`)


}



const loginUser = async (req, res) => {


    const { email, password } = req.body;
    if (!email || !password) {

        res.status(400).json({ message: "All fields are mandatory!" });
    }

    const user = await User.findOne({ email });
    //  compare password and Hased passed;

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Password or username " });
    }

    const token = jwt.sign({ email, id: user._id }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: '30000s' });

    res.cookie('token', token);

    res.json({ message: "Login Successfully ", token })
    // res.status(200).json({ message: "Login Successfully " });


}



const forgotPassword = async (req, res) => {


    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const secret = process.env.ACCESS_TOKEN_SECERT + user.password;

    const payload = {
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(payload, secret, { expiresIn: '30m' });
    const link = `http://localhost:3000/reset-password/${user._id}/${token}`
    console.log(link);
    res.status(200).json({ message: 'Password reset email sent successfully' });


}





module.exports = { registerUser, loginUser, forgotPassword };