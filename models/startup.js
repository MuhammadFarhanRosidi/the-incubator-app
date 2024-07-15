'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StartUp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get formatAge() {
      return new Date().getFullYear() - new Date(this.dateFound).getFullYear()
    }
    static associate(models) {
      // define association here
      StartUp.belongsTo(models.Incubator, {foreignKey : 'IncubatorId'})
    }
  }
  StartUp.init({
    startUpName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter StartUp Name',
        },
        notEmpty: {
          msg: 'Please enter StartUp Name',
        },
      },
    },
    founderName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter Founder Name',
        },
        notEmpty: {
          msg: 'Please enter Founder Name',
        },
      },
    },
    dateFound: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter Date Found',
        },
        notEmpty: {
          msg: 'Please enter Date Found',
        },
        isMinAge(value) {
          let ageNow = new Date().getFullYear()
          let ageValue = value.getFullYear()
          let ageCount = ageNow - ageValue
          if(ageCount < 5) {
            throw new Error('Minimum age is 5 years')
          }
        },
      },
    },
    educationOfFounder: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter Education of Founder',
        },
        notEmpty: {
          msg: 'Please enter Education of Founder',
        },
      },
    },
    roleOfFounder: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter Role of Founder',
        },
        notEmpty: {
          msg: 'Please enter Role of Founder',
        },
        isMinEducation(value) {
          if(value === "Hustler") {
            if(this.educationOfFounder === 'SMA' || this.educationOfFounder === 'S1') {
              throw new Error('Minimum to choose Hustler is S2')
            }
          }
        },
      },
    },
    IncubatorId: DataTypes.INTEGER,
    valuation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter Valuation',
        },
        notEmpty: {
          msg: 'Please enter Valuation',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'StartUp',
  });
  return StartUp;
};