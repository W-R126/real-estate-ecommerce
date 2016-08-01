var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Building = db.Building;

router.get('/types', function(req, res, next){
  res.send(Building.rawAttributes.propertyType.values);
})

router.get('/styles', function(req, res, next){
  res.send(Building.rawAttributes.architecturalStyle.values);
})

router.get('/:id', function(req, res, next){
  Building.findById(req.params.id)
  .then(building=> res.send(building))
  .catch(next);
})


router.get('/', function(req, res, next){
  if(req.query.price) req.query.price = JSON.parse(req.query.price);
  if(req.query.stories) req.query.stories = JSON.parse(req.query.stories);
  Building.findAll({where:req.query})
  .then(buildings=>res.send(buildings))
  .catch(next);
})

router.put('/changeStatus/:id', function(req, res, next){
  Building.update(req.body, {where: { id: req.params.id},
    returning: true
  })
  .then(building => res.send(building[1][0]))
  .catch(next);
})

router.put('/changeType/:id', function(req, res, next){
  Building.update(req.body, {where: { id: req.params.id},
    returning: true
  })
  .then(building => res.send(building[1][0]))
  .catch(next);
})

router.put('/updateBuilding/:id', function(req, res, next){
  Building.update(req.body, {where: { id: req.params.id},
    returning: true
  })
  .then(building => res.send(building[1][0]))
  .catch(next);
})


module.exports = router;
