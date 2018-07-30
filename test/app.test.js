const request = require("supertest");

//TODO: need repair Tests
let app = require("../server").app;

it("should return Hello API", function(done){

    request(app)
        .get("/")
        .expect("Hello Test")
        .end(done);
});