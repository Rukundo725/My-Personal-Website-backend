import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

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
                    response.body.should.be.a('array');
                 
                done();
                })
        })

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
                    response.body.should.have.property('_id');
                    response.body.should.have.property('_id').eq("622acf9615c4ef8e29ceee83");
                    response.body.should.have.property('title');
                    response.body.should.have.property('snippet');
                    response.body.should.have.property('createdAt');
                    response.body.should.have.property('updatedAt');
                    response.body.should.have.property('__v');
                      
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
        it("It should POST an article by id", (done)=>{
            const article ={

                "title": "new blog from testing",
                "snippet": "about my new blog after testing",
                "body": "more about my test blog"

            };
            chai.request(app)
                .post("/api/blog/add")
                .send(article)
                .end((err, response)=> {
                    response.should.have.status(200);
                    response.body.should.eq("Article added");
                    response.body.should.be.a('string');
                    
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
        // in case we pass don't include any property of the object

        it("It should not POST an article It will throw an 500 error status", (done)=>{
            const article ={

                "title": "new blog from testing",
                "snippet": "about my new blog after testing"
               

            };
            chai.request(app)
                .post("/api/blog/add")
                .send(article)
                .end((err, response)=> {
                    response.should.have.status(500);
                done();
                })
        })
    })

    
    // ================================================================================================

    // testing the  put(modify)  article by ID  api 

    describe("PUT /api/blog/:id", () =>{
        it("It should PUT an article by id", (done)=>{
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
                    response.should.have.status(200);
                    response.body.should.be.a('string');
                    response.body.should.eq("Article updated");
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

        // in case we pass the wrong id 

        it("It should not PUT an article by id", (done)=>{
            const ArticleId = "622ac9e21dcd4a8b6c2868";
            const article ={

                "title": "new blog from testing",
                "snippet": "about my new blog after testing",
                "body": "more about my test blog"

            };
            chai.request(app)
                .put("/api/blog/" + ArticleId)
                .send(article)
                .end((err, response)=> {
                    response.should.have.status(500);
                
                done();
                })
        })

    })

    // ================================================================================================

    // testing the  delete  article by ID  api 

    describe("DEL /api/blog/:id", () =>{
        it("It should DELETE an article by id", (done)=>{
            const ArticleId = "622ac9e21dcd4a8b6c2868a6";
            chai.request(app)
                .del("/api/blog/" + ArticleId)
                .end((err, response)=> {
                    response.should.have.status(200);
                    response.body.should.be.a('string');
                    response.body.should.eq("Article is deleted");
                      
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

        it("It should not DELETE an article by id", (done)=>{
            const ArticleId = "622ac9e21dcd4a8b6c2868";
            chai.request(app)
                .del("/api/blog/" + ArticleId)
                .end((err, response)=> {
                    response.should.have.status(500);
                
                done();
                })
        })

    })


})

