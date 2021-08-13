const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server.test')
require(`dotenv`).config()


chai.should();
chai.use(chaiHttp);
var username = "tenet",
password = "tenet@123",
token,
orgName = "NSEC",
orgId = "college@nsec",
wrongOrgName = "123",
wrongOrgId = ""


describe('Org Api',()=>{
    describe('Token',()=>{
        it('should get Token',(done)=>{
            const userCred = {
                username,
                password,
            }
              chai.request(server)
      .post("/test/token")
      .send(userCred)
      .end((err,response)=>{
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.have.property('token')
          token = response.body.token;
          done();
      })
        })
    })
    describe("Org validation",()=>{
        it("Org Name should not be validated",(done)=>{
            chai.request(server)
            .post("/api/meta/unique_org_name")
            .set("authorization",token)
            .send({wrongOrgName})
            .end((err,response)=>{
                response.should.have.status(422);
                done();
            })
        })
    })
    describe("Org Uniqueness",()=>{
        it("Org Name should be unique",(done)=>{
            chai.request(server)
      .post("/api/meta/unique_org_name")
      .set('authorization',token)
      .send({orgName})
      .end((err,response)=>{
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          response.body.message.should.equal('unique')
          done();
      })
        })
         it("Org Id should be unique",(done)=>{
            chai.request(server)
      .post("/api/meta/unique_org_id")
      .set('authorization',token)
      .send({orgId})
      .end((err,response)=>{
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          response.body.message.should.equal('unique')
          done();
      })
        })
    })
    describe('Authorizating Api',()=>{

        it("Should not Create Org with out token",(done)=>{
        const orgDetails = {
            orgName,
            orgId
        }
             chai.request(server)
            .post("/api/org/createOrg")
            .send(orgDetails)
            .end((err,response)=>{
            response.should.have.status(400);
            response.should.be.json;
            response.body.should.have.property('error')
            response.body.error.should.have.property('message')
            response.body.error.message.should.equal('Unauthorized')
            done();
             })
         })
    })
    describe('Create Org',()=>{

        it("It should Create Org",(done)=>{
        const orgDetails = {
            orgName,
            orgId
        }
             chai.request(server)
            .post("/api/org/createOrg")
            .set("authorization",token)
            .send(orgDetails)
            .end((err,response)=>{
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('message')
                response.body.message.should.equal('Registered')
                done();
            })
        })
    })
    describe('Organisation Sameness',()=>{
     it("Org Name should be same",(done)=>{
            chai.request(server)
      .post("/api/meta/unique_org_name")
      .set('authorization',token)
      .send({orgName})
      .end((err,response)=>{
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('message')
          response.body.message.should.equal('same')
          done();
      })
        })
         it("Org Id should be same",(done)=>{
            chai.request(server)
      .post("/api/meta/unique_org_id")
      .set('authorization',token)
      .send({orgId})
      .end((err,response)=>{
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('message')
          response.body.message.should.equal('same')
          done();
      })
        })
    })
    
})