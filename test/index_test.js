process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../server/config.js');

describe('Routing', function () {
    var expires = moment().add('60', 'minutes').valueOf();
    var token;
    var url = 'https://localhost:' + config.port;

    before(function (done) {
        done();
    });

    describe('Login', function () {
        it('should exist', function (done) {
            request(url)
                .get('/api/1.0/login')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('should reject an unknown login', function (done) {
            var details = {
                uid: 'test',
                pwd: 'test'
            };
            request(url)
                .post('/api/1.0/login')
                .type('form')
                .send(details)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('should reject an valid login with an incorrect password', function (done) {
            var details = {
                uid: 'admin',
                pwd: 'test'
            };
            request(url)
                .post('/api/1.0/login')
                .type('form')
                .send(details)
                .expect(401)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('should accept a valid login', function (done) {
            var details = {
                uid: 'admin',
                pwd: 'admin'
            };
            request(url)
                .post('/api/1.0/login')
                .type('form')
                .send(details)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    result = jwt.encode({
                        iss: details.uid,
                        exp: expires
                    }, 'nbn2counj3o3uoiunc978ho3ijhjcdfohn2o934rf');
                    config.users[token] = result;
                token = result;
                    done();
                });
        });
    });

    describe('Company', function () {
        it('should reject a token-less session', function (done) {
            request(url)
                .get('/api/1.0/company')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should reject a session with an incorrect token', function (done) {
            var details = {
                'x-tkn': 'olabqwvwhjhnqvu'
            };
            request(url)
                .get('/api/1.0/company')
                .set('x-tkn', 'dfbhaflj')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should accept a session with a correct token', function (done) {
            request(url)
                .get('/api/1.0/company')
                .set('x-tkn', token)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });

    describe('Company -> ID', function () {
        it('should reject a token-less session', function (done) {
            request(url)
                .get('/api/1.0/company/3')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should reject a session with an incorrect token', function (done) {
            request(url)
                .get('/api/1.0/company/3')
                .set('x-tkn', 'dfbhaflj')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should accept a session with a correct token', function (done) {
            request(url)
                .get('/api/1.0/company/3')
                .set('x-tkn', token)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('should reject a request to an invalid company', function (done) {
            request(url)
                .get('/api/1.0/company/73869')
                .set('x-tkn', token)
                .expect(204)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });

    describe('ActiveUsers', function () {
        it('should reject a token-less session', function (done) {
            request(url)
                .get('/api/1.0/activeusers/')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should reject a session with an incorrect token', function (done) {
            request(url)
                .get('/api/1.0/activeusers/')
                .set('x-tkn', 'dfbhaflj')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should accept a session with a correct token', function (done) {
            request(url)
                .get('/api/1.0/activeusers/')
                .set('x-tkn', token)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });

    describe('Contact', function () {
        it('should reject a token-less session', function (done) {
            request(url)
                .get('/api/1.0/contact')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should reject a session with an incorrect token', function (done) {
            var details = {
                'x-tkn': 'olabqwvwhjhnqvu'
            };
            request(url)
                .get('/api/1.0/contact')
                .set('x-tkn', 'dfbhaflj')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should accept a session with a correct token', function (done) {
            request(url)
                .get('/api/1.0/contact')
                .set('x-tkn', token)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });

    describe('Contact -> ID', function () {
        it('should reject a token-less session', function (done) {
            request(url)
                .get('/api/1.0/contact/3')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should reject a session with an incorrect token', function (done) {
            request(url)
                .get('/api/1.0/contact/3')
                .set('x-tkn', 'dfbhaflj')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(401, res.statusCode);
                    done();
                });
        });

        it('should accept a session with a correct token', function (done) {
            request(url)
                .get('/api/1.0/contact/3')
                .set('x-tkn', token)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });

        it('should reject a request to an invalid contact', function (done) {
            request(url)
                .get('/api/1.0/contact/73869')
                .set('x-tkn', token)
                .expect(204)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });
});