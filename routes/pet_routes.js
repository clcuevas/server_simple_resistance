'use strict';

var fs = require('fs');
var bodyparser = require('body-parser');

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
    };

    fs.writeFile(filename, JSON.stringify(pet, null, 4), function(err) {
      if(err) {
        console.log(err);
      }
      res.json({msg: 'File saved successfully'});
    });//end write to json file
  });//end POST TO TEST

  router.post('/pets', function(req, res) {
    var id = Math.floor(Math.random() * 100);
    var filename = './data/prod/pet_' + id + '.json';

    var pet = {
      'id': id,
      'name': req.body.name,
      'owner': req.body.owner,
      'weight': req.body.weight,
      'type': req.body.type
    };

    fs.writeFile(filename, JSON.stringify(pet, null, 4), function(err) {
      if(err) {
        console.log(err);
      }
      console.log(pet);
      res.json({msg: 'File saved successfully'});
    });//end write to json file
  });//end POST

  router.get('/pets', function(req, res) {
    var dir = './data/prod/';
    fs.readdir(dir, function(err, files) {
      if(err) {
        console.log(err);
      }
      res.send(files);
    });//end read directory
  });//end GET

  router.put('/pets/:file', function(req, res) {
    var id = Math.floor(Math.random() * 100);

    var pet = {
      'id': id,
      'name': req.body.name,
      'owner': req.body.owner,
      'weight': req.body.weight,
      'type': req.body.type
    };

    fs.exists('./data/prod/' + req.params.file, function(exists) {
      if(exists) {
        fs.writeFile('./data/prod/' + req.params.file, JSON.stringify(pet, null, 4), function(err) {
          if(err) {
            console.log(err);
          }
          res.json({msg: 'File has been updated'});
        });//end write to file
      } else {
        res.json({msg: 'File does not exist! Try again'});
      }
    });//end if file exists
  });//end PUT

  router.patch('/pets/:file', function(req, res) {
    var id = Math.floor(Math.random() * 100);

    var pet = {
      'id': id,
      'name': req.body.name,
      'owner': req.body.owner,
      'weight': req.body.weight,
      'type': req.body.type
    };
    
    fs.exists('./data/prod/' + req.params.file, function(exists) {
      if(exists) {
        fs.readFile('./data/prod/' + req.params.file, 'utf-8', function(err, data) {
          var tempObj = JSON.parse(data.toString());
          if(req.body.id === undefined) {
            req.body.id = tempObj.id;
          }

          tempObj.id = req.body.id;

          if(req.body.name === undefined) {
            req.body.name = tempObj.name;
          }

          tempObj.name = req.body.name;

          if(req.body.owner === undefined) {
            req.body.owner = tempObj.owner;
          }

          tempObj.owner = req.body.owner;

          if(req.body.weight === undefined) {
            req.body.weight = tempObj.weight;
          }

          tempObj.weight = req.body.weight;

          if(req.body.type === undefined) {
            req.body.type = tempObj.type;
          }

          tempObj.type = req.body.type;

          fs.writeFile('./data/prod/' + req.params.file, JSON.stringify(tempObj, null, 4), function(err) {
            if(err) {
              console.log(err);
            }
            res.json({msg: 'File has been updated'});
          });//end write to file
        });//end read file
      } else {
        res.json({msg: 'File does not exist!'});
      }
    });//end if file exists
  });//end PATCH

  router.delete('/pets/:file', function(req, res) {
    fs.exists('./data/prod/' + req.params.file, function(exists) {
      if(exists) {
        fs.unlink('./data/prod/' + req.params.file, function(err) {
          if(err) {
            console.log(err);
          }
          res.json({msg: 'File has been deleted'});
        });//end file unlink
      } else {
        res.json({msg: 'File does not exist!'});
      }
    });//end if file exists
  });//end DELETE

};