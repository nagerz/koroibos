var express = require("express");
var router = express.Router();
var Event = require('../../../models').Event;
var Sport = require('../../../models').Sport;
var Athelete = require('../../../models').Athelete;
var Team = require('../../../models').Team;
var EventAthelete = require('../../../models').EventAthelete;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

var pry = require('pryjs');

router.get("/", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  eventsBySport()
  .then(sports => {
      let result = {events: sports}
      res.status(200).send(JSON.stringify(result));
  })
  .catch(error => {
    res.status(404).send({error: error})
  });
});

router.get("/:id/medalists", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  eventMedalists(req.params.id)
  .then(event => {
      // let result = {events: event}
      res.status(200).send(JSON.stringify(event));
  })
  .catch(error => {

    res.status(404).send({error: error})
  });
});

function eventsBySport() {
  return new Promise((resolve, reject) => {
    Sport.findAll({
      attributes: ['name'],
      include: [
        {
          model: Event,
          attributes: ['name']
        }
      ],
      order: [['name', 'ASC']]
    })
    .then(sports => {
      return sports.map(sport => {
        var events = sport.Events.map(event => {
          return event.name
        });
        let formattedSport = {
          sport: sport.name,
          events: events
        };
        return formattedSport
      })
    })
    .then(sports => {
      resolve(sports)
    })
    .catch(error => {
      reject(error)
    });
  })
};

function eventMedalists(id) {
  return new Promise((resolve, reject) => {
    Event.findOne({
      where: {
        id: id
      },
      attributes: ['name'],
      include: [
        {
          model: EventAthelete,
          attributes: ['medal'],
          where: {medal: {[Op.not]: 'NA'}},
          include: [
            {
              model: Athelete,
              attributes: ['name', 'age'],
              include: [
                {
                  model: Team,
                  attributes: ['name']
                }
              ]
            }
          ]
        }
      ]
    })
    .then(event => {
      var medalists = event.EventAtheletes.map(ea => {
        var medalist = {
          "name": ea.Athelete.name,
          "team": ea.Athelete.Team.name,
          "age": ea.Athelete.age,
          "medal": ea.medal
        }
        return medalist
      });
      let formattedEvent = {
        event: event.name,
        medalists: medalists
      };
      return formattedEvent
    })
    .then(event => {
      resolve(event)
    })
    .catch(error => {
      reject(error)
    });
  })
};

module.exports = router;
