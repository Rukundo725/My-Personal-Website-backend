import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import 'dotenv/config'; 
import bcrypt from "bcrypt";


chai.should();
chai.use(chaiHttp);

// testing Authentication

describe('Login Routes TEST', () => {
    // should not post a user due to wrong info
        describe("POST api/user/register", () =>{
            it("It should not create a new user due to a not hashed password", (done) =>{
                const CreateUser = {
                    username: process.env.username,
                    email: process.env.email,
                    password: process.env.password
                };
                chai.request(app)
                .post("/api/user/register")
                .send(CreateUser)
                .end((err, response) => {
                    response.should.have.status(500);
                done();
        
                });
            });

            // in case we pass a wrong url 

            it("It should not create a user due to wrong url", (done)=>{
                const password1 = process.env.password
                const salt = bcrypt.genSalt(10);
                const hashedPass = bcrypt.hash(password1, salt);
                const CreateUser = {
                    username: process.env.username,
                    email: process.env.email,
                    password:hashedPass
                    
                }
                chai.request(app)
                    .post("/api/user/reg")
                    .send(CreateUser)
                    .end((err, response)=> {
                        response.should.have.status(404); 
                    done();
                    })
            })



        });
    
        // log in
        describe("POST api/user/login", () =>{
            it("should login", (done) =>{
                const LoginInfo = {
                    username: process.env.username,
                    email: process.env.email,
                    password: process.env.password
                };
                chai.request(app)
                .post("/api/user/login")
                .send(LoginInfo)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
        
                });
            });

            // in case we pass a wrong url 

            it("It should not let  a user to log in due to wrong url", (done)=>{
                const LoginInfo = {
                    username: process.env.username,
                    email: process.env.email,
                    password: process.env.password
                };
                chai.request(app)
                    .post("/api/user/log")
                    .send(LoginInfo)
                    .end((err, response)=> {
                        response.should.have.status(404); 
                    done();
                    })
            })
        });
         
    })

