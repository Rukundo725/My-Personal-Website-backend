import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import 'dotenv/config'; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


chai.should();
chai.use(chaiHttp);

// testing blog 

describe("Blog API", ()=>{

    // testing the  get all articles api 

    describe("GET /api/blog/", () =>{
        it("It should GET all posts", (done)=>{
            chai.request(app)
                .get("/api/blog/")
                .end((err, response)=> {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('Articles');
                 
                done();
                });
        });

        // in case we pass the wrong url 

        it("It should not GET all posts due to wrong url", (done)=>{
            chai.request(app)
                .get("/api/blogs/")
                .end((err, response)=> {
                    response.should.have.status(404);
                 
                done();
                });
        });
    });

    // ================================================================================================

    // testing the  get  article by ID  api 

    describe("GET /api/blog/:id", () =>{
        it("It should GET an article by id", (done)=>{
            const ArticleId = "622acf9615c4ef8e29ceee83";
            chai.request(app)
                .get("/api/blog/" + ArticleId)
                .end((err, response)=> {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('Article');
                    
                      
                done();
                })
        })

        // in case we pass the wrong url 

        it("It should not GET an article by id", (done)=>{
            const ArticleId = "622acf9615c4ef8e29ceee83";
            chai.request(app)
                .get("/api/blog" + ArticleId)
                .end((err, response)=> {
                    response.should.have.status(404); 
                done();
                })
        })

        // in case we pass the wrong id 

        it("It should not GET an article by id", (done)=>{
            const ArticleId = "622acf9615c4ef8e29ceee8";
            chai.request(app)
                .get("/api/blog/" + ArticleId)
                .end((err, response)=> {
                    response.should.have.status(500);
                
                done();
                })
        })

    })

    // =========================================================================================

    // testing the  post new  article api 

    describe("POST /api/blog/add", () =>{
        it("It should not POST an article by id due to authentication error 403", (done)=>{
            const article ={

                "title": "new blog from testing",
                "snippet": "about my new blog after testing",
                "body": "more about my test blog"

            };
            chai.request(app)
                .post("/api/blog/add")
                .send(article)
                .end((err, response)=> {
                    response.should.have.status(403);
                    // response.body.should.eq("Article added");
                    // response.body.should.be.a('object');
                    
                done();
                })
        })

        // in case we pass the wrong url 
        
        it("It should not POST an article in case of the wrong url", (done)=>{
            const article ={

                "title": "new blog from testing",
                "snippet": "about my new blog after testing",
                "body": "more about my test blog"

            };
            chai.request(app)
                .post("/api/blog/adds")
                .send(article)
                .end((err, response)=> {
                    response.should.have.status(404);
                done();
                })
        })
        // // in case we don't include any property of the object

        
        it("it should not CREATE a new blog due to uncoplete data", (done) => {
            const article ={

                "title": "new blog from testing",
                "snippet": "about my new blog after testing",
              

                };
         
              jwt.sign(
                { email: process.env.email, password: process.env.password },
                process.env.SECRET,
                { expiresIn: "1250s" },
                (err, token) => {
                  // console.log(token);
                  chai
                    .request(app)
                    .post("/api/blog/add")
                    .send(article)
                    .set("Authorization", `bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(500);
                      
                      done();
                    });
                });
            });

        // posting a new article 

        it("it should CREATE a new blog", (done) => {
            const article ={

                "title": "new blog from testing",
                "snippet": "about my new blog after testing",
                "body": "more about my test blog"

                };
         
              jwt.sign(
                { email: process.env.email, password: process.env.password },
                process.env.SECRET,
                { expiresIn: "1250s" },
                (err, token) => {
                  // console.log(token);
                  chai
                    .request(app)
                    .post("/api/blog/add")
                    .send(article)
                    .set("Authorization", `bearer ${token}`)
                    .end((err, res) => {
                      console.log({ res: res.body, status: res.status });
                      res.should.have.status(201);
                      res.body.should.be.a("object");
                      res.body.should.have.property('message').eql("Article added");
                      done();
                    });
                });
            });
    })

    
    // ================================================================================================

    // testing the  put(modify)  article by ID  api 

    describe("PUT /api/blog/:id", () =>{
        it("It should not PUT an article by id due to unauthorized access", (done)=>{
            const ArticleId = "622ac9e21dcd4a8b6c2868a6";
            const article ={

                "title": "new blog from testing",
                "snippet": "about my new blog after testing",
                "body": "more about my test blog"

            };
            chai.request(app)
                .put("/api/blog/" + ArticleId)
                .send(article)
                .end((err, response)=> {
                    response.should.have.status(403);
                   
                done();
                })
        })

        // in case we pass the wrong url 

        it("It should not PUT an article by id", (done)=>{
            const ArticleId = "622ac9e21dcd4a8b6c2868a6";
            const article ={

                "title": "new blog from testing",
                "snippet": "about my new blog after testing",
                "body": "more about my test blog"

            };
            chai.request(app)
                .put("/api/blog" + ArticleId)
                .send(article)
                .end((err, response)=> {
                    response.should.have.status(404); 
                done();
                })
        })

        // modifying the blog

        it("it should Modify a blog given the id", (done) => {
            const ArticleId = "622ac9e21dcd4a8b6c2868a6";
            const article ={
                "title": "new blog from testing",
                "snippet": "about my new blog after testing",
                "body": "more about my test blog"

            };
         
              jwt.sign(
                { email: process.env.email, password: process.env.password },
                process.env.SECRET,
                { expiresIn: "1250s" },
                (err, token) => {
                  // console.log(token);
                  chai
                    .request(app)
                    .put("/api/blog/" + ArticleId)
                    .send(article)
                    .set("Authorization", `bearer ${token}`)
                    .end((err, res) => {
                      console.log({ res: res.body, status: res.status });
                      res.should.have.status(200);
                      res.body.should.be.a("object");
                      res.body.should.have.property("message").eql("Article is Updated");
                      done();
                    });
                });
          });

    })

    // ================================================================================================

    // testing the  delete  article by ID  api 

    describe("DEL /api/blog/:id", () =>{
        it("It should not DELETE an article by id due to unauthorized access", (done)=>{
            const ArticleId = "622ac9e21dcd4a8b6c2868a6";
            chai.request(app)
                .del("/api/blog/" + ArticleId)
                .end((err, response)=> {
                    response.should.have.status(403);    
                done();
                })
        })

        // in case we pass the wrong url 

        it("It should not DELETE an article by id", (done)=>{
            const ArticleId = "622ac9e21dcd4a8b6c2868a6";
            chai.request(app)
                .del("/api/blog" + ArticleId)
                .end((err, response)=> {
                    response.should.have.status(404); 
                done();
                })
        })

        // in case we pass the wrong id 

        it("it should throw an error due to worng id", (done) => {
              jwt.sign(
                { email: process.env.email, password: process.env.password },
                process.env.SECRET,
                { expiresIn: "1250s" },
                (err, token) => {
                  // console.log(token);
                  chai
                    .request(app)
                    .del("/api/blog/"+ "622ac9e21" )
                    .set("Authorization", `bearer ${token}`)
                    .end((err, res) => {
                      res.should.have.status(500);
                      done();
                    });
                });
          });

        // it should DELETE a blog given the id 

        it("it should DELETE a blog given the id", (done) => {
            const ArticleId = "622ac9e21dcd4a8b6c2868a6";
              jwt.sign(
                { email: process.env.email, password: process.env.password },
                process.env.SECRET,
                { expiresIn: "1250s" },
                (err, token) => {
                  // console.log(token);
                  chai
                    .request(app)
                    .del("/api/blog/"+ ArticleId)
                    .set("Authorization", `bearer ${token}`)
                    .end((err, res) => {
                      console.log({ res: res.body, status: res.status });
                      res.should.have.status(200);
                      res.body.should.be.a("object");
                      res.body.should.have.property("message").eql("Article is deleted");
                      done();
                    });
                });
          });

    })


})

// ********************************************************************************************* 



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
                    .put("/api/user/log")
                    .send(LoginInfo)
                    .end((err, response)=> {
                        response.should.have.status(404); 
                    done();
                    })
            })
        });
         
    })

