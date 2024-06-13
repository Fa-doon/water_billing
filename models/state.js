"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      State.hasMany(models.Lga, {
        foreignKey: "state_id",
        sourceKey: "id"
      });

      State.hasMany(models.Taxpayer, {
        foreignKey: "state_id",
        sourceKey: "id"
      });

      State.hasMany(models.Building, {
        foreignKey: "state_id",
        sourceKey: "id"
      });
    }
  }
  State.init(
    {
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "State",
      timestamps: true
    }
  );
  return State;
};
