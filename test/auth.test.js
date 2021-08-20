const chai = require('chai')
const chaiHttp = require('chai-http')
const server = "http://localhost:3000"
const logger = require('../src/config/logger')
const should = require('should');
require(`dotenv`).config()

chai.should();
chai.use(chaiHttp)

describe('API', () => {
  var otp
  var email = 'initiatetenet@gmail.com',
    username = 'tenet',
    firstName = 'Carl',
    lastName = 'sagan',
    password = 'tenet@123',
    cnfPass = 'tenet@123'
  describe('Check uniqueness', () => {
    it('email should be unique', done => {
      chai
        .request(server)
        .post('/api/meta/email_unique')
        .send({ email })
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          response.body.message.should.equal('unique')
          done()
        })
    })

    it('username should be unique', done => {
      chai
        .request(server)
        .post('/api/meta/uname_unique')
        .send({ username })
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          response.body.message.should.equal('unique')
          done()
        })
    })
  })

  describe('auth-api', () => {
    it('It should verify email and put in database', done => {
      const userMeta = {
        email,
        password,
        cnfPass
      }
      chai
        .request(server)
        .post('/api/auth/verificationEmail')
        .send(userMeta)
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.should.have.length(2)
          response.body[1].should.equal('success')
          done()
        })
    })

    it('getting opt', done => {
      chai
        .request(server)
        .post('/test/fetchOTP')
        .send({ email })
        .end((err, response) => {
          response.should.have.status(200)
          otp = response.body.otp

          done()
        })
    })

    it('It will Register user', done => {
      const userMeta = {
        email,
        username,
        firstName,
        lastName,
        otp: otp
      }
      chai
        .request(server)
        .post('/api/auth/register')
        .send(userMeta)
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          response.body.message.should.equal('Registered')
          done()
        })
    })
  })

  describe('Check Sameness', () => {
    it('Email should be Same', done => {
      chai
        .request(server)
        .post('/api/meta/email_unique')
        .send({ email })
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          response.body.message.should.equal('same')
          done()
        })
    })

    it('Username should be same', done => {
      chai
        .request(server)
        .post('/api/meta/uname_unique')
        .send({ username })
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          response.body.message.should.equal('same')
          done()
        })
    })
  })
  describe('Login User', () => {
    it('It will login user', done => {
      const userCred = {
        email,
        password
      }
      chai
        .request(server)
        .post('/api/auth/login')
        .send(userCred)
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
          
        })
    })
  })
})

