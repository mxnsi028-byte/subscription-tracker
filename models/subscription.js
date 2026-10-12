'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      Subscription.belongsTo(models.Plan, {
        foreignKey: 'planId',
        as: 'plan'
      });

      Subscription.hasMany(models.Invoice, {
        foreignKey: 'subscriptionId',
        as: 'invoices'
      });
    }
  }
  Subscription.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    planId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active', 'Cancelled', 'Expired'),
      allowNull: false,
      defaultValue: 'Active'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};