'use strict';

var fs = require('fs');
var bodyparser = require('body-parser');
//var counter = 0;

module.exports = function(router) {

  router.use(bodyparser.json());

  router.post('/pets/test', function(req, res) {
    var id = Math.floor(Math.random() * 100);
    var filename = './data/test/pet_test' + id + '.json';

    var pet = {
      'id': id,
      'name': req.body.name,
      'owner': req.body.owner,
      'weight': req.body.weight,
      'type': req.body.type
    }

    fs.writeFile(filename, JSON.stringify(pet, null, 4), function(err) {
      if(err) {
        console.log(err);
      }
      res.json({msg: 'File saved successfully'});
    });//end write to json file
  });

  router.post('/pets', function(req, res) {
    var id = Math.floor(Math.random() * 100);
    var filename = './data/prod/pet_' + id + '.json';

    var pet = {
      'id': id,
      'name': req.body.name,
      'owner': req.body.owner,
      'weight': req.body.weight,
      'type': req.body.type
    }

    fs.writeFile(filename, JSON.stringify(pet, null, 4), function(err) {
      if(err) {
        console.log(err);
      }
      //counter++;
      console.log(pet);
      res.json({msg: 'File saved successfully'});
      //console.log(counter);
    });//end write to json file
  });//end POST

  router.get('/pets', function(req, res) {
    var dir = './data/prod/';
    var obj = {};
    fs.readdir(dir, function(err, files) {
      if(err) {
        console.log(err);
      }
      
      files.forEach(function(file) {
        console.log(file);
        fs.readFile(dir+file, 'utf-8', function(err, data) {
          if(err) {
            console.log(err);
          }
          console.log('json ' + data);
          res.send(obj.file = data);
        });
        //res.send(obj.file);
      });
    });
  });



};