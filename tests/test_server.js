require('dotenv').config(); 

var request = require('supertest');

var app = require('../app');

var userId; 

describe('UserManager unit tests', function(){
    it("Create a new user", function (done) {
        request(app)
            .post("/users")
            .set("Connection", "keep alive")
            .set("Content-Type", "application/json")
            .type("form")
            .send({name: "Victor", email: "durojaiyevic@gmail.com", password: "mypassword"})
            .expect('Content-Type', /json/)
            .expect(200)
            .then(function(response) {
                userId = response.body._id; 
                done(); 
            })
    });

    it("Get all users", function (done) {
        request(app)
            .get("/users")
            .set("Connection", "keep alive")
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err) {
                if(err) return done(err); 
                return done();
            })
    });

    it("Get a single user", function (done) {
        request(app)
            .get("/users/" + userId)
            .set("Connection", "keep alive")
            .expect('Content-Type', /json/)
            .expect(200, '{"name":"Victor","email":"durojaiyevic@gmail.com","password":"mypassword","_id":"' + userId + '","__v":0}')
            .end(function (err) {
                if(err) return done(err); 
                return done();
            })
    });

    it("Get an unknown user", function (done) {
        request(app)
            .get("/users/1a23456bc7d89012e3f4ab56")
            .set("Connection", "keep alive")
            .expect('Content-Type', /text/)
            .expect(404, "No user found.")
            .end(function (err) {
                if(err) return done(err); 
                return done();
            })
    });

    it("Get a user with an invalid hash", function (done) {
        request(app)
            .get("/users/1")
            .set("Connection", "keep alive")
            .expect('Content-Type', /text/)
            .expect(500, "There was a problem finding the user.")
            .end(function (err) {
                if(err) return done(err); 
                return done();
            })
    });

    it("Update a user", function (done) {
        request(app)
            .put("/users/" + userId)
            .set("Connection", "keep alive")
            .set("Content-Type", "application/json")
            .type("form")
            .send({name: "Victor Durojaiye", email: "durojaiyevic@gmail.com", password: "newpassword"})
            .expect('Content-Type', /json/)
            .expect(200, '{"__v":0,"_id":"' + userId + '","email":"durojaiyevic@gmail.com","name":"Victor Durojaiye","password":"newpassword"}')
            .end(function (err) {
                if(err) return done(err); 
                return done();
            })
    });

    it("Update a user with an invalid hash", function (done) {
        request(app)
            .put("/users/1")
            .set("Connection", "keep alive")
            .set("Content-Type", "application/json")
            .type("form")
            .send({name: "Victor Durojaiye", email: "durojaiyevic@gmail.com", password: "newpassword"})
            .expect('Content-Type', /text/)
            .expect(500, "There was a problem updating the user.")
            .end(function (err) {
                if(err) return done(err); 
                return done();
            })
    });

    it("Delete a user", function (done) {
        request(app)
            .delete("/users/" + userId)
            .set("Connection", "keep alive")
            .expect('Content-Type', /text/)
            .expect(200, "User Victor Durojaiye was deleted.")
            .end(function (err) {
                if(err) return done(err); 
                return done();
            })
    });

    it("Delete a user with an invalid hash", function (done) {
        request(app)
            .delete("/users/1")
            .set("Connection", "keep alive")
            .expect('Content-Type', /text/)
            .expect(500, "There was a problem deleting the user.")
            .end(function (err) {
                if(err) return done(err); 
                return done();
            })
    });
    
});
