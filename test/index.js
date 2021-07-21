const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const express = require('express');
const mongoose = require('mongoose');
require(`dotenv`).config()
const connect = require("../src/helpers/connection");

describe('Init Connection and drop database',()=>{

it("Drop database",(done)=>{
connect.then(() => {
   mongoose.connection.db.dropDatabase(function(){
                done()
            })   
}).catch(done)

})
})