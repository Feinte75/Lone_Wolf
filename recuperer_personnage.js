var express = require('express');
var router = express.Router();

router.get('/personnages', function(req, res) {
  var db = req.db;

  var collection = db.get('personnages');
  collection.find({}, {}, function(e, docs) {
    res.json(docs);
  });
});

router.get('/personnages/:id', function(req, res) {
  id = req.params.id;
  
  var db = req.db;
  var collection = db.get('personnages');
  collection.find({nomPersonnage : id}, {}, function(e, docs) {
    res.json(docs);
  });
});

module.exports = router;
