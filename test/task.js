const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server.test')
// const express = require('express');
// const mongoose = require('mongoose');
require(`dotenv`).config()
require('./index')

chai.should();
chai.use(chaiHttp);

describe('API',()=>{
   
var otp;
var email = "initiate@gmail.com",
username = "tenet",
firstName = "Carl",
lastName = "sagan",
password = "tenet@123",
cnfPass = "tenet@123"
describe("Check uniqueness",()=>{
    it("email should be unique",async()=>{
       
       chai.request(server)
      .post("/api/meta/email_unique")
      .send({email})
      .end((err,response)=>{
          response.should.have.status(200);
        //   response.text.should.be.equal("unique")
          
      })
    })
    it("username should be unique",async()=>{
       chai.request(server)
      .post("/api/meta/uname_unique")
      .send({username})
      .end((err,response)=>{
          response.should.have.status(200);
        //   response.text.should.be.equal("unique")
      })
    })
})

describe('auth-api',()=>{
    it("It should verify email and put in database",(done)=>{
      const userMeta = {
          email,
          password,
          cnfPass
      };
        chai.request(server)
      .post("/api/auth/verificationEmail")
      .send(userMeta)
      .end((err,response)=>{
          response.should.have.status(200);
          // response.body.should.be.a('array');
          // response.body.should.have.length(2)
          done();
      })
    })


it("getting opt",(done)=>{
      chai.request(server)
    .post("/api/auth/otp")
    .send({email})
    .end((err,response)=>{
        response.should.have.status(200);
         otp = response.body.otp;

        done();
    })
})

it("It will Register user",(done)=>{
      const userMeta = {
          email,
          username,
          firstName,
          lastName,
          otp:otp,
      };
      chai.request(server)
      .post("/api/auth/register")
      .send(userMeta)
      .end((err,response)=>{
          response.should.have.status(200);
        //   response.body.should.be.a('array');
          done();
      })
    })
})
describe("Login User", () => {
    it("It will login user", (done) => {
        const userCred = {
            email,
            password,
        }
         chai.request(server)
      .post("/api/auth/login")
      .send(userCred)
      .end((err,response)=>{
          response.should.have.status(200);
          done();
      })
    })
})
})