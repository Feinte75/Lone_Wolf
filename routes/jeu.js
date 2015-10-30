var express = require('express');
var router = express.Router();
var pageInfo = require('./page_info');

router.get('/:pageNum', function(req, res, next) {
  // On récupère le paramètre de l'URL
  var pageNum = req.params.pageNum
  // On crée dynamiquement la page qu'on souhaite charger
  info = {
    id : pageNum
  }

  for(i = 0; i <  pageInfo["page"+pageNum].nbSection; i++) {
    
    var page = "./jeu/"+ pageNum + "/section" + 1 + ".jade"

    res.render(page, function(err, html) {
      info["section"+ (i+1)] = {};
      
      info["section"+ (i+1)].html = html;
      //res.render('./jeu/page', { title: pageNum, htmlPage: html })
    });

  }
  res.json(info);
});

router.get('/:pageNum/:section', function(req, res, next) {
  // On récupère le paramètre de l'URL
  var pageNum = req.params.pageNum
  var section = req.params.section
  // On crée dynamiquement la page qu'on souhaite charger
  var page = "./jeu/"+ pageNum + "/section" + section + ".jade"
  
  // On veut d'abord convertir la page en HTML, une fois que la conversion
  // est faite, on va injecter le HTML généré vers le fichier page.jade
  res.render(page, function(err, html) {
      res.json('./jeu/page', { title: pageNum, htmlPage: html })
  });
});

router.get('/illustrations/:valeur', function(req, res) {
    res.sendFile('/jeu/illustrations/'+req.params.valeur);
});

module.exports = router;
