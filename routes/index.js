var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    // Cette fonction va tenter de convertir le fichier jade situé à
    // view/index.jade en HTML pour l'envoyer vers le client.
    // On profite pour envoyer au client l'attribut « title ».
    res.render('index', { title: "Lone Wolf", pageActuelle: "accueil"});
});

router.get('/nouveauPersonnage', function(req, res) {
    res.render('nouveau_personnage', { pageActuelle: "nouveauPersonnage"});
});

router.get('/aide', function(req, res) {
    res.render('aide', { pageActuelle: "aide"});
});

module.exports = router;
