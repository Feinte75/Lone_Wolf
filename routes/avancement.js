var express = require('express');
var router = express.Router();

router.get('/avancement/:id', function(req, res) {
  var id = req.params.id;

  var db = req.db;
  var collection = db.get('avancement');

  collection.find({nomPersonnage : id}, {}, function(e, docs) {
    if(e) res.status(500).json(e);
    else if(docs.length != 0) res.json(docs);
    else res.sendStatus(404);
  });
});

router.post('/avancement/:id', function(req, res) {

  var id = req.params.id;
  var avancement = req.body.avancement;
  var db = req.db;
  var collection = db.get('avancement');

  collection.update({nomPersonnage : id}, {nomPersonnage : id, "avancement" : avancement}, { upsert: true }, function(e, docs) {
    if(e) res.status(500).json(e);
    else if(docs.length != 0) res.json(docs);
    else res.sendStatus(404);
  });

});


router.get('/supprimeravancement/:id', function(req, res) {

  var id = req.params.id;
  var db = req.db;
  var collection = db.get('avancement');

  collection.remove({nomPersonnage : id}, function(e) {
    if(e) res.status(500).json(e);
    else res.sendStatus(200);
  });
});

module.exports = router;
