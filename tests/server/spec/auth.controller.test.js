var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../../../server/config/config');
var should = require('should');
var connect = require('mongodb').connect;
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mongodb');
var connectionString = 'mongodb://' + config.test.dbHost + ':' + config.test.dbPort + '/' + config.test.dbName;
var url = 'http://' + config.test.serverIp + ':' + config.test.serverPort;

describe('Authentication', function () {

    before(function (done) {
        mongoose.connect(connectionString);
        done();
    });

    after(function (done) {
        // Clear the db after each test
        connect(connectionString, function (err, db) {
            databaseCleaner.clean(db, function () {
                console.log('Db clean');
                db.close();
            });
        });
        done();
    });

    describe('User registration', function () {
        it('register new user', function (done) {
            var data = {
                email: 'test@user.com',
                password: 'pass',
                password_repeat: 'pass'
            };
            request(url)
                .post('/api/v1/register')
                .send(data)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.property('status', 201);
                    done();
                });
        });
    });

    describe('User registration invalid email', function () {
        it('fails register new user with wrong email format', function (done) {
            var data = {
                email: 'testuser.com',
                password: 'pass',
                password_repeat: 'pass'
            };
            request(url)
                .post('/api/v1/register')
                .send(data)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.property('status', 422);
                    done();
                });
        });
    });

    describe('User login', function () {
        var token;
        it('registers new user', function (done) {
            var dataRegister = {
                email: 'test@user.com',
                password: 'pass',
                password_repeat: 'pass'
            };

            request(url)
                .post('/api/v1/register')
                .send(dataRegister)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.property('status', 201);
                    done();
                });
        });

        it('logs in', function (done) {

            var dataLogin = {
                email: 'test@user.com',
                password: 'pass',
                password_repeat: 'pass'
            };

            request(url)
                .post('/api/v1/login')
                .send(dataLogin)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.property('status', 200);
                    res.body.should.have.property('token');
                    res.body.should.have.property('user');
                    res.body.should.have.property('expires');
                    token = res.body.token;
                    done();
                });


        });

        it('accesses protected route', function (done) {
            request(url)
                .get('/api/v1/users')
                .set('x-access-token', token)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('email','test@user.com');
                    res.body[0].should.have.property('password','pass');
                    done();
                });
        });

    });
});