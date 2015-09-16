var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    // Cette fonction va tenter de convertir le fichier jade situé à
    // view/index.jade en HTML pour l'envoyer vers le client.
    // On profite pour envoyer au client l'attribut « title ».
    res.render('index', { title: "Lone Wolf (title)" });
});

router.get('/nouveauPersonnage', function(req, res) {
    res.render('nouveau_personnage');
});

router.get('/pagedejeu', function(req, res) {
    res.render('page_de_jeu');
});

router.get('/aide', function(req, res) {
    res.render('aide');
});


/* GET home page. */
// http://stackoverflow.com/questions/20089582/how-to-get-url-parameter-in-express-node-js
// http://stackoverflow.com/questions/12132978/use-a-variable-in-a-jade-include
router.get('/page/:valeur', function(req, res, next) {
  // On récupère le paramètre de l'URL
  var v = req.params.valeur

  // On crée dynamiquement la page qu'on souhaite charger
  var page = "./pages/page" + v + ".jade"

  // On veut d'abord convertir la page en HTML, une fois que la conversion
  // est faite, on va injecter le HTML généré vers le fichier page.jade
  res.render(page, function(err, html) {
      res.render('page', { title: v, htmlPage: html })
  });
});

module.exports = router;
