const createError = require(`http-errors`);
const express = require("express");
const app = express();
const path = require('path');
const router = require("express").Router();
const { signAccessToken, isAlreadyLoggedIn } = require(`../../jwt/tokens`);
const { LoginUser } = require("../../controller/controller.auth.js");
const { loginSchema } = require('../../validation/validation.auth')
const staticpath =path.join(__dirname,'../../static');
app.use(express.static(staticpath));
console.log(staticpath);


router.post('/join',(req,res)=>{
    
})

module.exports =router;