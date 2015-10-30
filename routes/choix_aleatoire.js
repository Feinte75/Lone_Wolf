var express = require('express');
var router = express.Router();
var page_info = require('./page_info');

router.get('/choixaleatoire/:nbPage', function(req, res) {
  
  nbPage = req.params.nbPage;
  random = Math.floor(Math.random() * 10);

  // Obtient les intervalles a partir de l'objet page_info
  ranges = page_info["page"+nbPage].ranges;

  // Retourne la page associée à l'intervalle dans lequel est random
  for(i = 0; i < ranges.length; i++) {
    if(random >= ranges[i][0] && random <= ranges[i][1])
      res.json({page : ranges[i][2]});
  }
  res.json({erreur : "Range non renseignée dans fichier, seul la page 167 est implémentée pour le moment"});
});

module.exports = router;
