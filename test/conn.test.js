const chai = require("chai");
const chaiHttp = require("chai-http");
// const server1 = require('../src/server');
const server = "http://localhost:3000"





chai.should();
chai.use(chaiHttp);
// const express = require('express');
const mongoose = require("mongoose");
require(`dotenv`).config();
const connect = require("../src/config/connection");

describe("drop database and init connection", () => {
  it("drop database", (done) => {
    connect
      .then(() => {
        mongoose.connection.db.dropDatabase(function () {
          done();
        });
      })
      .catch(done);
  });
});
