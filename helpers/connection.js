const express = require('express');
const mongoose = require('mongoose');
require(`dotenv`).config()

const Connect = mongoose.connect(process.env.MONGO_URL, {dbName: process.env.DB_NAME ,useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true }).then(() => {
    console.log('mongodb connected.')
  }).catch((err)=>console.log(err))

mongoose.connection.on('error', () => {
    console.log("can not connect");
})

mongoose.connection.on('connection', () => {
    console.log("hurrey Connected");
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
})
  
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })
module.exports = Connect;