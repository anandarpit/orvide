const mongoose = require(`mongoose`);
const createError = require(`http-errors`);
const router = require("express").Router();
const express = require('express');
const path = require('path')
const app = express();
const {signAccessToken ,verifyAccessToken} = require(`../../jwt/tokens`);
const registerSchema = require('../../helpers/validation')
// const { route } = require("..");
const RegisterUser = require('../../controller/auth.controller');
const { VerifyUser } = require("../../controller/auth.controller");


router.post('/', async(req, res,next) => {
    console.log("login post")
    const { email, password } = req.body;
    if (await VerifyUser(email, password)) {
        console.log("user verified");
        res.send("You are verified!")
        
    }
    res.send("email or password is incorrect");

})

module.exports = router