var express = require('express');
var router = express.Router();

//usage combatRatioPos/Neg[randomNumber][abs(combatRatio)][0 = ennemi, 1 = joueur]
// CREDIT : Bernard Pallotta, forum MOODLE
combatRatioNeg =
[
  [[12,0],[11,0],[11,0],[10,0],[10,0],[9,0],[9,0],[8,0],[8,0],[7,0],[7,0],[6,0]],
  [[3,5],[2,5],[2,5],[1,6],[1,6],[0,6],[0,6],[0,8],[0,8],[0,999],[0,999],[0,999]],
  [[4,4],[3,5],[3,5],[2,5],[2,5],[1,6],[1,6],[0,7],[0,7],[0,8],[0,8], [0,999]],
  [[5,4],[4,4],[4,4],[3,5],[3,5],[2,5],[2,5],[1,6],[1,6],[0,7],[0,7],[0,8]],
  [[6,3],[5,4],[5,4],[4,4],[4,4],[3,5],[3,5],[2,6],[2,6],[1,7],[1,7],[0,8]],
  [[7,2],[6,3],[6,3],[5,4],[5,4],[4,4],[4,4],[3,5],[3,5],[2,6],[2,6],[1,7]],
  [[8,2],[7,2],[7,2],[6,3],[6,3],[5,4],[5,4],[4,5],[4,5],[3,6],[3,6],[2,6]],
  [[9,1],[8,2],[8,2],[7,2],[7,2],[6,3],[6,3],[5,4],[5,4],[4,5],[4,5],[3,5]],
  [[10,0],[9,1],[9,1],[8,1],[8,1],[7,2],[7,2],[6,3],[6,3],[5,4],[5,4],[4,4]],
  [[11,0],[10,0],[10,0],[9,0],[9,0],[8,0],[8,0],[7,2],[7,2],[6,3],[6,3],[5,3]]
];

combatRatioPos =
[
  [[12,0],[14,0],[14,0],[15,0],[15,0],[18,0],[18,0],[999,0],[999,0],[999,0],[999,0],[999,0]],
  [[3,5], [4,5], [4,5], [5,4] ,[5,4] ,[6,4] ,[6,4] ,[7,4] ,[7,4] ,[8,3] ,[8,3] ,[9,3] ],
  [[4,4], [5,4], [5,4], [6,3] ,[6,3] ,[7,3] ,[7,3] ,[8,3] ,[8,3] ,[9,3] ,[9,3] ,[10,2]],
  [[5,4], [6,3], [6,3], [7,3] ,[7,3] ,[8,3] ,[8,3] ,[9,2] ,[9,2] ,[10,2] ,[10,2] ,[11,2]],
  [[6,3], [7,3], [7,3], [8,2] ,[8,2] ,[9,2] ,[9,2] ,[10,2],[10,2],[11,2] ,[11,2] ,[12,2]],
  [[7,2], [8,2], [8,2], [9,2] ,[9,2] ,[10,2],[10,2],[11,2],[11,2],[12,2] ,[12,2] ,[14,1]],
  [[8,2], [9,2], [9,2], [10,2],[10,2],[11,1],[11,1],[12,1],[12,1],[14,1] ,[14,1] ,[16,1]],
  [[9,1], [10,1],[10,1],[11,1],[11,1],[12,0],[12,0],[12,0],[12,0],[16,0] ,[16,0] ,[18,0]],
  [[10,0],[11,0],[11,0],[12,0],[12,0],[14,0],[14,0],[14,0],[14,0],[18,0] ,[18,0] ,[999,0]],
  [[11,0],[12,0],[12,0],[14,0],[14,0],[16,0],[16,0],[16,0],[16,0],[999,0],[999,0],[999,0]]
];

router.get('/combat/:habiliteJoueur/:habiliteEnnemi', function(req, res) {

  random = Math.floor( Math.random() * 10 );
  habiliteJoueur = req.params.habiliteJoueur;
  habiliteEnnemi = req.params.habiliteEnnemi;

  quotientAttaque = habiliteJoueur - habiliteEnnemi;
  perteEnduranceJoueur = 0;
  perteEnduranceEnnemi = 0;

  if(quotientAttaque > 0 && quotientAttaque < 12) {
    perteEnduranceJoueur = combatRatioPos[random][quotientAttaque][1];
    perteEnduranceEnnemi = combatRatioPos[random][quotientAttaque][0];
  }
  else if(quotientAttaque >= 12) {
    perteEnduranceJoueur = combatRatioPos[random][11][1];
    perteEnduranceEnnemi = combatRatioPos[random][11][0];
  }
    
  if(quotientAttaque <= 0 && quotientAttaque > -12) {
    perteEnduranceJoueur = combatRatioNeg[random][-quotientAttaque][1];
    perteEnduranceEnnemi = combatRatioNeg[random][-quotientAttaque][0];
  }
  else if(quotientAttaque <= -12) {
    perteEnduranceJoueur = combatRatioNeg[random][11][1];
    perteEnduranceEnnemi = combatRatioNeg[random][11][0];
  }

  res.json({perteJoueur: perteEnduranceJoueur, perteEnnemi: perteEnduranceEnnemi, quotientAttaqueCombat : quotientAttaque});
});

module.exports = router;
