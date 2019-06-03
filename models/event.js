'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    Event.hasMany(models.EventAthelete)
    Event.belongsToMany(models.Athelete, { through: models.EventAthelete, foreignKey: 'EventId'});
    Event.belongsTo(models.Sport)
  };
  return Event;
};
