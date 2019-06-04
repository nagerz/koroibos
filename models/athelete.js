var pry = require('pryjs')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Athelete = sequelize.define('Athelete', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER
  }, {});
  Athelete.associate = function(models) {
    Athelete.hasMany(models.EventAthelete)
    Athelete.belongsToMany(models.Event, { through: models.EventAthelete, foreignKey: 'AtheleteId'})
    Athelete.belongsTo(models.Team)
  };

  // Athelete.team = function() {
  //   return new Promise((resolve, reject) => {
  //     this.team()
  //     .then(team => {
  //       eval(pry.it)
  //       resolve(team.name);
  //     })
  //   })
  // };

  return Athelete;
};
