var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('./config/config.js');
var should = require('should');

describe('Init test to prove test setup works', function () {
    it('should add 1+1 correctly', function (done) {
        var onePlusOne = 1 + 1;
        assert.equal(2, onePlusOne);
        // must call done() so that mocha know that we are... done.
        // Useful for async tests.
        done();
    });
});


describe('Routing', function() {
    var url = 'http://localhost:3000';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {


        //var conn, mongoose;
        //mongoose = require("mongoose");
        //conn = mongoose.connect(config.db.mongodb);
        //
        //conn.connection.db.dropDatabase();


        // In our tests we use the test db
        mongoose.connect(config.db.mongodb);
        mongoose.connection.collections['users'].drop( function(err) {
            console.log('collection dropped');
        });

        done();
    });

    // use describe to give a title to your test suite, in this case the tile is "Account"
    // and then specify a function in which we are going to declare all the tests
    // we want to run. Each test starts with the function it() and as a first argument
    // we have to provide a meaningful title for it, whereas as the second argument we
    // specify a function that takes a single parameter, "done", that we will use
    // to specify when our test is completed, and that's what makes easy
    // to perform async test!
    describe('Account', function() {
        it('should return error trying to save duplicate username', function(done) {
            var user = {
                email: 'testuser',
                password: 'pass',
                password_repeat: 'pass'
            };
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .post('/api/v1/register')
                .send(user)
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.should.have.property('status', 201);
                    done();
                });
        });
        //it('should correctly update an existing account', function(done){
        //    var body = {
        //        firstName: 'JP',
        //        lastName: 'Berd'
        //    };
        //    request(url)
        //        .put('/api/profiles/vgheri')
        //        .send(body)
        //        .expect('Content-Type', /json/)
        //        .expect(200) //Status code
        //        .end(function(err,res) {
        //            if (err) {
        //                throw err;
        //            }
        //            // Should.js fluent syntax applied
        //            res.body.should.have.property('_id');
        //            res.body.firstName.should.equal('JP');
        //            res.body.lastName.should.equal('Berd');
        //            res.body.creationDate.should.not.equal(null);
        //            done();
        //        });
        //});
    });
});