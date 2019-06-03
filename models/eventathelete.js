'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventAthelete = sequelize.define('EventAthelete', {
    medal: DataTypes.STRING,
    EventId: DataTypes.INTEGER,
    AtheleteId: DataTypes.INTEGER
  }, {});
  EventAthelete.associate = function(models) {
    EventAthelete.belongsTo(models.Event);
    EventAthelete.belongsTo(models.Athelete);
  };
  return EventAthelete;
};
