const express = require('express');
const mongoose = require('mongoose');
const createError = require(`http-errors`);
const logger = require('../logger')
const app = require('../server')
require(`dotenv`).config()
let server ;

 const connect = mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.DB_NAME, 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false,
  autoIndex: true,
  replicaSet: "orvide"
}).then(() => {
    logger.info(`Mongoose server listening`);
    // console.log("Mongoose server listening");
  }).catch(err => {
        logger.error(`Can not Connect ${err}`);

  })

var db = mongoose.connection;

db.on('error',()=>{
  logger.warn("connection error")
});

db.on('connection', () => {
  logger.info("hurrey Connected");
})

db.on('disconnected', () => {
  logger.info('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})


module.exports = connect;