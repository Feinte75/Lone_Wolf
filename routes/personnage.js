var express = require('express');
var router = express.Router();

router.get('/nouveauPersonnage', function(req, res) {
  res.render('nouveau_personnage', { pageActuelle: "nouveauPersonnage"});
});

router.get('/test', function(req, res) {
  res.json(req.session.personnage);
});

router.post('/nouveauPersonnage', function(req, res) {

  if(typeof req.body.kai == 'undefined' || req.body.kai.length != 5) {
      res.status(500).json({ error : "Selectionnez 5 disciplines kai"});
  }
     
  if(typeof req.body.nomPersonnage == 'undefined') {
      res.status(500).json({ error : "Entrez un nom de personnage"});
  }
  
  if(typeof req.body.objet1 == 'undefined' || req.body.objet2 == 'undefined') {
    res.status(500).json({ error : "Veuillez selectionner deux objets"});
  }

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

  for (var kai in personnage.disciplinesKai) {
    req.body.kai.forEach(function(e) {
      if(e == kai) {
        personnage.disciplinesKai[kai] = true;
      }
    });
  }

  // Ajout objets, TODO : Verification des inputs
  personnage.objet1 = req.body.objet1;
  personnage.objet2 = req.body.objet2;
  
  personnage.nomPersonnage = req.body.nomPersonnage;
  personnage.habilete = Math.floor(Math.random() * (19 - 10 + 1) + 10);
  personnage.endurance = Math.floor(Math.random() * (29 - 20 + 1) + 20);

  req.session.personnage = personnage;
  res.json(personnage); 
});

module.exports = router;
