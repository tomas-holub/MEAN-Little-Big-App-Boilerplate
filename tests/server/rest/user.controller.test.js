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

describe('User controller', function () {

    var id, token;

    before(function (done) {
        mongoose.connect(connectionString);
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function(done){
        connect(connectionString, function (err, db) {
            databaseCleaner.clean(db, function () {
                console.log('Db clean');
                db.close();
                done();
            });
        });
    });

    beforeEach(function(done){
        register(done);
    });

    beforeEach(function(done){
        login(done);
    });

    describe('User test', function () {

        it('gets all users', function (done) {

            request(url)
                .get('/api/v1/users')
                .set('x-access-token', token)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('email','loged@user.com');
                    res.body[0].should.not.have.property('password');
                    done();
                });
        });

        it('gets user by id', function (done) {
            request(url)
                .get('/api/v1/users/' + id)
                .set('x-access-token', token)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.user.should.have.property('email','loged@user.com');
                    res.body.user.should.not.have.property('password');
                    done();
                });
        });
    });

    function register(done){
        var userData = {
            email: 'loged@user.com',
            password: 'password',
            password_repeat: 'password'
        };
        request(url)
            .post('/api/v1/register')
            .send(userData)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
    }

    function login(done) {
        var userData = {
            email: 'loged@user.com',
            password: 'password'
        };
        request(url)
            .post('/api/v1/login')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                token = res.body.token;
                id    = res.body._id;
                done();
            });
    }

});