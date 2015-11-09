var express = require('express');
var router = express.Router();

router.get('/nouveauPersonnage', function(req, res) {
  res.render('nouveau_personnage', { pageActuelle: "nouveauPersonnage"});
});

router.get('/sessiontest', function(req, res) {
  res.json(req.session.personnage);
});

router.post('/nouveauPersonnage', function(req, res) {

  // Verification Inputs
  if(typeof req.body.nomPersonnage == 'undefined' || req.body.nomPersonnage == '') {
      res.status(500).render('nouveau_personnage',{ erreur : "Entrez un nom de personnage"});
  }

  if(typeof req.body.kai == 'undefined' || req.body.kai.length != 5) {
      res.status(500).render('nouveau_personnage', { erreur : "Selectionnez 5 disciplines kai"});
  }

  if(typeof req.body.objet1 == 'undefined' || req.body.objet2 == 'undefined') {
    res.status(500).render('nouveau_personnage', { erreur : "Veuillez selectionner deux objets"});
  }

  // Declaration de l'objet personnage
  personnage = {
    nomPersonnage : "",
    disciplinesKai : {
      camouflage : false,
      chasse : false,
      sixiemeSens : false,
      orientation : false,
      guerison : false,
      maitriseDesArmes : false,
      bouclierPsychique : false,
      puissancePsychique : false,
      communicationAnimale : false,
      maitrisePsychiqueDeLaMatiere : false
    },
    objet1 : "",
    objet2 : "",
    habilete : 0,
    endurance : 0
  }

  // Verification du nom des disciplines et attribution
  for (var kai in personnage.disciplinesKai) {
    req.body.kai.forEach(function(e) {
      if(e == kai) {
        personnage.disciplinesKai[kai] = true;
      }
    });
  }

  personnage.objet1 = req.body.objet1;
  personnage.objet2 = req.body.objet2;

  personnage.nomPersonnage = req.body.nomPersonnage;
  personnage.habilete = Math.floor(Math.random() * (19 - 10 + 1) + 10);
  personnage.endurance = Math.floor(Math.random() * (29 - 20 + 1) + 20);

  req.session.personnage = personnage;

  var db = req.db;
  var collection = db.get('personnages');

  collection.insert(personnage, function (err, doc) {
    if(err) {
      res.send('DB problem');
    }
  });

  res.redirect('/jeu/1');

});


router.post('/modifierPersonnage/:id', function(req, res) {
  id = req.params.id;

  // Verification Inputs
  if(typeof req.body.nomPersonnage !== 'undefined'){
    if(req.body.nomPersonnage == '') {
        res.json(req.body.nomPersonnage);
    }
  }

  if(typeof req.body.kai !== 'undefined'){
    if(req.body.kai.length != 5) {
      res.json(req.body.kai);
    }
  }


  var personnage;

  //Requête à la BDD
  var db = req.db;
  var collection = db.get('personnages');

  collection.find({nomPersonnage : id}, {}, function(e, docs) {
    personnage = docs;
    //res.json(personnage);


      // Verification du nom des disciplines et attribution
      if(typeof req.body.kai !== 'undefined') {
        for (var kai in personnage.disciplinesKai) {
          //Boucle pour vérifier si la discipline kai sera attribuée
          req.body.kai.forEach(function(e) {
            if(e == kai) {
              personnage.kai = true;
            }
          });
        }
      }


      //Attribution des autres caractéristiques
      if(typeof req.body.objet1 !== 'undefined') {
        personnage.objet1 = req.body.objet1;
      }
      if(typeof req.body.objet2 !== 'undefined') {
        personnage.objet2 = req.body.objet2;
      }

      if(typeof req.body.nomPersonnage !== 'undefined') {
        personnage.nomPersonnage = req.body.nomPersonnage;
      }

        req.session.personnage = personnage;

      collection.update(
        {nomPersonnage : id},
        { $set: {
          nomPersonnage : personnage.nomPersonnage,
          kai : personnage.kai,

          objet1 : personnage.objet1,
          objet2 : personnage.objet2,

          nomPersonnage : personnage.nomPersonnage
        } }
      );

  });



});

module.exports = router;
