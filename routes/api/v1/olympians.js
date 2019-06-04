var express = require("express");
var router = express.Router();
var Athelete = require('../../../models').Athelete;
var Team = require('../../../models').Team;
var Event = require('../../../models').Event;
var Sport = require('../../../models').Sport;

var pry = require('pryjs')

router.get("/", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  findAllAtheletes()
  .then(atheletes => {
    res.status(200).send(JSON.stringify(atheletes));
  })
});

function findAllAtheletes() {
  return new Promise((resolve, reject) => {
    Athelete.findAll({
      attributes: ['name', 'age'],
      include: [
        {
          model: Team,
          attributes: ['name']
        },
        {
          model: Event,
          include: [
            {
              model: Sport,
              attributes: ['name']
          }]
        }
      ]
    })
    .then(atheletes => {
      var atheletes = atheletes.map(athelete => {
        var team = athelete.Team.name
        var sport = athelete.Events[0].Sport.name
        athelete = athelete.toJSON();
        athelete.team = team
        athelete.sport = sport
        delete athelete.Team
        delete athelete.Events
        return athelete
      })
      resolve(atheletes)
      // eval(pry.it)
    })
    .catch(error => {
      eval(pry.it)
      reject(error)
    });
  })
};

module.exports = router;
