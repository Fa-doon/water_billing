"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lga.belongsTo(models.State, {
        foreignKey: "state_id",
        targetKey: "id",
      });

      Lga.hasMany(models.Taxpayer, {
        foreignKey: "lga_id",
        sourceKey: "id",
      });

      Lga.hasMany(models.Building, {
        foreignKey: "lga_id",
        sourceKey: "id",
      });
    }
  }
  Lga.init(
    {
      lga: DataTypes.STRING,
      state_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "States",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      }
    },
    {
      sequelize,
      modelName: "Lga",
      timestamps: true
    }
  );
  return Lga;
};
