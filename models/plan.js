'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plan.hasMany(models.Subscription, {
        foreignKey: 'planId',
        as: 'subscriptions'
      });
    }
  }
  Plan.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    billingCycle: {
      type: DataTypes.ENUM('Monthly', 'Yearly'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};