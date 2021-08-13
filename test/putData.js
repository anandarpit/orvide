const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server.test')
require(`dotenv`).config()


chai.should();
chai.use(chaiHttp);

describe("Put Data in Test",()=>{
    // it("putting data in multiple doc",(done)=>{
       
    //    chai.request(server)
    //   .post("/test/putData")
    //   .send({email:"asdf"})
    //   .end((err,response)=>{
    //        response.should.have.status(200);
    //       done();
           
          
    //   })
    // })
     it("putting array data in one doc",(done)=>{
       
       chai.request(server)
      .post("/test/putDataArrays")
      .send({email:"asdf"})
      .end((err,response)=>{
           response.should.have.status(200);
          done();
           
          
      })
    })
})