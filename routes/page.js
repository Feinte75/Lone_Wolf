var express = require('express');
var router = express.Router();

// Route pour débugage
router.get('/pagedejeu', function(req, res) {
    res.render('page_de_jeu');
});

router.get('/:pageNum', function(req, res) {
  // On récupère le paramètre de l'URL
  var pageNum = req.params.pageNum
  // On crée dynamiquement la page qu'on souhaite charger
  var page = "./page/"+ "page" + pageNum + ".jade"

  // On veut d'abord convertir la page en HTML, une fois que la conversion
  // est faite, on va injecter le HTML généré vers le fichier page.jade
  res.render(page, function(err, html) {
      res.render('./page/page', { title: pageNum, htmlPage: html })
  });
});

router.get('/illustrations/:valeur', function(req, res) {
    res.sendFile('/page/illustrations/'+req.params.valeur);
});

module.exports = router;
