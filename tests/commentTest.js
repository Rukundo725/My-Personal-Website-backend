import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import 'dotenv/config'; 
import jwt from "jsonwebtoken";

chai.should();
chai.use(chaiHttp);

// testing comments

describe("Comments API", ()=>{

    // testing the send a comment api 

    describe("POST /api/comment/send", () =>{
        it("It should send comment", (done)=>{
            const comment ={
                "email": "cyusa@yahoo.com",
                "comment": "more about my test blog"

            };
            chai.request(app)
                .post("/api/comment/send")
                .send(comment)
                .end((err, response)=> {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message');
                 
                done();
                });
        });

        // in case we pass the wrong url 

        it("It should not send a comment due to wrong url", (done)=>{
            const comment ={
                "email": "cyusa@yahoo.com",
                "comment": "more about my test blog"

            };
            chai.request(app)
                .post("/api/comment/sends")
                .send(comment)
                .end((err, response)=> {
                    response.should.have.status(404);
                done();
                });
        });

        // in case we pass a comment with a missing property

        it("It should not send a comment due to a required missing property", (done)=>{
            const comment ={
                "email": "cyusa@yahoo.com"

            };
            chai.request(app)
                .post("/api/comment/send")
                .send(comment)
                .end((err, response)=> {
                    response.should.have.status(500);
                done();
                });
        });
    });

    // =========================================================================================

    // testing the  get all comments api 

    describe("GET /api/comment/", () =>{
        it("It should not get all comments due to authentication error 403", (done)=>{
            chai.request(app)
                .get("/api/comment/")
                .end((err, response)=> {
                    response.should.have.status(403);
                done();
                })
        })

        // in case we pass the wrong url 
        
        it("it should not get all comments", (done) => {
           
            jwt.sign(
              { email: process.env.email, password: process.env.password },
              process.env.SECRET,
              { expiresIn: "1250s" },
              (err, token) => {
                // console.log(token);
                chai
                  .request(app)
                  .get("/api/comment/f")
                  .set("Authorization", `bearer ${token}`)
                  .end((err, res) => {
                    console.log({ res: res.body, status: res.status });
                    res.should.have.status(404);
                    done();
                  });
              });
          });
        
        // getting all comments

        it("it should get all comments", (done) => {
           
              jwt.sign(
                { email: process.env.email, password: process.env.password },
                process.env.SECRET,
                { expiresIn: "1250s" },
                (err, token) => {
                  // console.log(token);
                  chai
                    .request(app)
                    .get("/api/comment/")
                    .set("Authorization", `bearer ${token}`)
                    .end((err, res) => {
                      console.log({ res: res.body, status: res.status });
                      res.should.have.status(200);
                      res.body.should.be.a("object");
                      res.body.should.have.property('message')
                      done();
                    });
                });
            });
    })

    
})