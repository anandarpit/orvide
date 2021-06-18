const mongoose = require(`mongoose`);
const createError = require(`http-errors`);
const router = require("express").Router();
const express = require('express');
const path = require('path')
const app = express();
const {signAccessToken ,verifyAccessToken} = require(`../../jwt/tokens`);
const registerSchema = require('../../helpers/validation')
const {RegisterUser} = require('../../controller/auth.controller')

router.post('/', async (req, res, next) => {
  
  try {
    const validatedResult = await registerSchema().validateAsync(req.body)
    console.log(req.body);
    await RegisterUser(req.body);
    res.end()
  } catch (error) {
  console.log(error);
  }
  console.log("post register");
})



module.exports = router;  