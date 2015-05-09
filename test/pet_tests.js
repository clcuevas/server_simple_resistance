'use strict';

var fs = require('fs');
//var bodyparser = require('body-parser');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

require('../server.js');

describe('Test Server', function() {
  it('should create a new JSON file', function(done) {
    chai.request('localhost:3000')
      .post('/api/pets/test')
      .send({name: 'white boy', owner: 'claudia', weight: 15, type: 'dog'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('msg');
        done();
      });
  });
});