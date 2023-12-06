const { json } = require("body-parser");
const { error } = require("console");
const express = require("express");
const jwt = require('jsonwebtoken');
const { promisify } = require("util");

const verification = async (req, res, next) => {
    // const header = req.headers.cookie;
    // console.log(header);


    let token;
    if (req.headers.cookie && req.headers.cookie.startsWith("token")) {
        token = req.headers.cookie.split("=");
    }

    if (token == undefined) {
        res.status(400).json({ message: "Unauthorized" });
        return;

    } else {
        const decode = await promisify(jwt.verify)(token[1], process.env.ACCESS_TOKEN_SECERT);
        console.log("decode", decode)
        next();

    }

    //console.log("token", token);



}




module.exports = verification;