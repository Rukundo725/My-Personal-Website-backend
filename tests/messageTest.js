import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import 'dotenv/config'; 
import jwt from "jsonwebtoken";

chai.should();
chai.use(chaiHttp);

// testing messages

describe("Messages API", ()=>{

    // testing the send a message api 

    describe("POST /api/message/send", () =>{
        it("It should send message", (done)=>{
            const message ={

                "name": "new blog from testing",
                "email": "cyusa@yahoo.com",
                "message": "more about my test blog"

            };
            chai.request(app)
                .post("/api/message/send")
                .send(message)
                .end((err, response)=> {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message');
                 
                done();
                });
        });

        // in case we pass the wrong url 

        it("It should not send a message due to wrong url", (done)=>{
            const message ={

                "name": "new blog from testing",
                "email": "cyusa@yahoo.com",
                "message": "more about my test blog"

            };
            chai.request(app)
                .post("/api/message/sends")
                .send(message)
                .end((err, response)=> {
                    response.should.have.status(404);
                done();
                });
        });

        // in case we pass a message with a missing property

        it("It should not send a message due to a required missing property", (done)=>{
            const message ={

                "name": "new blog from testing",
                "message": "more about my test blog"

            };
            chai.request(app)
                .post("/api/message/send")
                .send(message)
                .end((err, response)=> {
                    response.should.have.status(500);
                done();
                });
        });
    });

    // =========================================================================================

    // testing the  get all messages api 

    describe("GET /api/message/", () =>{
        it("It should not get all messages due to authentication error 403", (done)=>{
            chai.request(app)
                .get("/api/comment/")
                .end((err, response)=> {
                    response.should.have.status(403);
                done();
                })
        })

       // getting all messages in case we pass a wron url

       it("it should get all messages", (done) => {
           
        jwt.sign(
          { email: process.env.email, password: process.env.password },
          process.env.SECRET,
          { expiresIn: "1250s" },
          (err, token) => {
            // console.log(token);
            chai
              .request(app)
              .get("/api/message/h")
              .set("Authorization", `bearer ${token}`)
              .end((err, res) => {
                console.log({ res: res.body, status: res.status });
                res.should.have.status(404);
                done();
              });
          });
      });
        
        // getting all messages

        it("it should get all messages", (done) => {
           
              jwt.sign(
                { email: process.env.email, password: process.env.password },
                process.env.SECRET,
                { expiresIn: "1250s" },
                (err, token) => {
                  // console.log(token);
                  chai
                    .request(app)
                    .get("/api/message/")
                    .set("Authorization", `bearer ${token}`)
                    .end((err, res) => {
                      console.log({ res: res.body, status: res.status });
                      res.should.have.status(200);
                      res.body.should.be.a("object");
                      res.body.should.have.property('Message')
                      done();
                    });
                });
            });
    })

    
})