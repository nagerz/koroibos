var express = require("express");
var router = express.Router();

var Athelete = require('../../../models').Athelete;
var Team = require('../../../models').Team;
var Event = require('../../../models').Event;
var EventAthelete = require('../../../models').EventAthelete;
var Sport = require('../../../models').Sport;

const Sequelize = require('sequelize');
const Op = Sequelize.Op

var pry = require('pryjs');

router.get("/", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  var count = await olympianCount();
  var maleWeight = await avgMaleWeight();
  var femaleWeight = await avgFemaleWeight();
  var age = await avgAge();
  var stats = {
    olympian_stats: {
      total_competing_olympians: count,
      average_weight: {
        unit: "kg",
        male_olympians: maleWeight,
        female_olympians: femaleWeight
      },
      average_age: age
    }
  };
  res.status(200).send(JSON.stringify(stats));
});

const olympianCount = async () => {
  var count = await Athelete.findAll()
  return await count.length
}

function avgMaleWeight() {
  return new Promise((resolve, reject) => {
    Athelete.findAll({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('weight')), 'weight']],
      where: {sex: 'M'}
    })
    .then(avgWeight => {
      resolve(Math.round(avgWeight[0].weight * 10) / 10)
    })
    .catch(error => {
      reject(error)
    })
  })
};

function avgFemaleWeight() {
  return new Promise((resolve, reject) => {
    Athelete.findAll({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('weight')), 'weight']],
      where: {sex: 'F'}
    })
    .then(avgWeight => {
      resolve(Math.round(avgWeight[0].weight * 10) / 10)
    })
    .catch(error => {
      reject(error)
    })
  })
};

function avgAge() {
  return new Promise((resolve, reject) => {
    Athelete.findAll({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('age')), 'age']]
    })
    .then(avgAge => {
      resolve(Math.round(avgAge[0].age * 10) / 10)
    })
    .catch(error => {
      reject(error)
    })
  })
};


module.exports = router;
