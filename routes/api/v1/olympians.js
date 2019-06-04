var express = require("express");
var router = express.Router();
var Athelete = require('../../../models').Athelete;
var Team = require('../../../models').Team;
var Event = require('../../../models').Event;
var EventAthelete = require('../../../models').EventAthelete;
var Sport = require('../../../models').Sport;

const Sequelize = require('sequelize');
const Op = Sequelize.Op

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
        },
        {
          model: EventAthelete,
          attributes: ['medal'],
          where: { medal: {[Op.not]: 'NA'} },
          required: false
        }
      ]
    })
    .then(atheletes => {
      return atheletes.map(athelete => {
        let formattedAthelete = {
          name: athelete.name,
          team: athelete.Team.name,
          age: athelete.age,
          sport: athelete.Events[0].Sport.name,
          total_medals_won: athelete.EventAtheletes.length
        };
        return formattedAthelete
      })
    })
    .then(atheletes => {
      resolve(atheletes)
    })
    .catch(error => {
      reject(error)
    });
  })
};

module.exports = router;
