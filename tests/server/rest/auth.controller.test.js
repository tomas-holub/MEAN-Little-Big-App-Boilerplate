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


describe('Authentication tests', function () {

    var clear = true;

    before(function (done) {
        mongoose.connect(connectionString);
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function(done){
        if (clear) {
            // Clear the db after each test
            connect(connectionString, function (err, db) {
                databaseCleaner.clean(db, function () {
                    console.log('Db clean');
                    db.close();
                    done();
                });
            });
        } else {
            done();
        }
    });

    describe('User registration', function () {
        it('register new user', function (done) {

            var data = {
                email: 'test@user.com',
                password: '123456',
                password_repeat: '123456'
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

        it('fails to register new user - invalid email', function (done) {
            var data = {
                email: 'wrong_email',
                password: '123456',
                password_repeat: '123456'
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

        it('fails to register new user - password to short', function (done) {
            var data = {
                email: 'test@user.com',
                password: '123',
                password_repeat: '123'
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

        it('fails to register new user - passwords do not match', function (done) {
            var data = {
                email: 'test@user.com',
                password: '123456',
                password_repeat: '123'
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

    describe('User login test set', function () {
        var token;
        it('registers new user, so we can login', function (done) {

            // don't clear the db for next test
            clear = false;

            var data = {
                email: 'test@user.com',
                password: 'password',
                password_repeat: 'password'
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

        it('logs in', function (done) {

            // clear the db for next test
            clear = true;

            var dataLogin = {
                email: 'test@user.com',
                password: 'password'
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
                    res.body.should.have.property('expires');
                    res.body.should.not.have.property('user');
                    token = res.body.token;
                    done();
                });

        });

    });
});