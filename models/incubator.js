'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incubator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Incubator.hasMany(models.StartUp, {foreignKey : 'IncubatorId'})
    }
  }
  Incubator.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    location: DataTypes.STRING,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Incubator',
    hooks: {
      beforeCreate: (instance) => {
        if(instance.level === 'International') {
          instance.code = `1992-A-${new Date().getTime()}`
        } else if (instance.level === 'National') {
          instance.code = `1994-B-${new Date().getTime()}`
        } else {
          instance.code = `1996-C-${new Date().getTime()}`
        }
      }
    }
  });
  return Incubator;
};