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
        expect(res.body.msg).to.equal('File saved successfully');
        done();
      });
  });

  it('should display created files', function(done) {
    chai.request('localhost:3000')
      .get('/api/pets')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.equal('object');
        done();
      });
  });

  it('should overwrite a file using PUT', function(done) {
    chai.request('localhost:3000')
      .put('/api/pets/pet_88.json')
      .send({name: 'i have been overwritten by the test'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.equal('File has been updated');
        done();
      });
  });

  it('should update a file using PATCH', function(done) {
    chai.request('localhost:3000')
      .patch('/api/pets/pet_88.json')
      .send({type: 'i have been patched by test'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.equal('File has been updated');
        done();
      });
  });

  it('should delete specified file using DELETE', function(done) {
    chai.request('localhost:3000')
      .del('/api/pets/pet_88.json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.equal('File has been deleted');
        done();
      });
  });
});