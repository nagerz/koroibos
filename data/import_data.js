var fs = require('fs');
var csv =  require('fast-csv');
const Athelete = require('../models').Athelete
const Event = require('../models').Event
const EventAthelete = require('../models').EventAthelete
const Sport = require('../models').Sport
const Team = require('../models').Team

let counter = 0;
let csvStream = csv.fromPath("./data/olympic_data_2016.csv", {headers: true})
.on('data', record =>  {

  csvStream.pause();
  let rec_name = record.Name;
  let rec_sex = record.Sex;
  let rec_age = record.Age;
  let rec_height = record.Height;
  let rec_weight = record.Weight;
  let rec_team = record.Team;
  let rec_sport = record.Sport;
  let rec_event = record.Event;
  let rec_medal = record.Medal.toString();

  if (rec_height == 'NA'){
    rec_height = null
  }
  if (rec_weight == 'NA'){
    rec_weight = null
  }

  Sport.findOrCreate({
    where: {
      name: rec_sport
    }
  })
  .then(sport => {
    Event.findOrCreate({
      where: {name: rec_event},
      defaults: { SportId: sport[0].id }
    })
    .then(event => {
      Team.findOrCreate({
        where: {name: rec_team}
      })
      .then(team => {
        Athelete.findOrCreate({
          where: {name: rec_name},
          defaults: {
            sex: rec_sex,
            age: rec_age,
            height: rec_height,
            weight: rec_weight,
            TeamId: team[0].id
          }
        })
        .then(athelete => {
          EventAthelete.create({
            AtheleteId: athelete[0].id,
            EventId: event[0].id,
            medal: rec_medal
          })
          .catch(error => {
            console.log("event athelete failure")
          })
        })
        .catch(error => {
          console.log("athelete failure")
        })
      })
      .catch(error => {
        console.log("team failure")
      })
    })
    .catch(error => {
      console.log("event failure")
    })
  })
  .catch(error => {
    console.log("sport failure")
  });

  counter ++;
  csvStream.resume();
})
.on('end',function(end) {
  console.log('Finished Importing. ' + counter + ' records added.');
})
.on('err',function(err) {
  return console.log(err);
});

setTimeout(function() {
  process.exit();
}, 40000);
