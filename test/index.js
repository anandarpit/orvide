const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require('./server.test')

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
