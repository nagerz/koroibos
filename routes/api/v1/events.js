var express = require("express");
var router = express.Router();
var Event = require('../../../models').Event;
var Sport = require('../../../models').Sport;

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

module.exports = router;
