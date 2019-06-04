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
    if (Object.keys(req.query).length != 0) {
      if (req.query.age) {
        if (req.query.age == 'youngest'){
          res.status(200).send(atheletes[0]);
        }else if (req.query.age == 'oldest'){
          res.status(200).send(atheletes[atheletes.length-1]);
        } else {
          res.status(404).send({error: "Invalid query."})
        }
      } else {
        res.status(404).send({error: "Invalid query."})
      }
    } else {
      let result = {olympians: atheletes}
      res.status(200).send(JSON.stringify(result));
    }
  })
  .catch(error => {
    res.status(404).send({error: error})
  });
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
      ],
      order: [['age', 'ASC']],
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
