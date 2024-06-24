"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Town extends Model {
    static associate(models) {
      // define association here
      Town.belongsTo(models.Lga, {
        foreignKey: "lga_id",
        targetKey: "id",
      });

      Town.hasMany(models.Building, {
        foreignKey: "town_id",
        sourceKey: "id",
      });

      Town.hasMany(models.Taxpayer, {
        foreignKey: "town_id",
        sourceKey: "id",
      });
    }
  }
  Town.init(
    {
      town: DataTypes.STRING,
      lga_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Lgas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
    },
    {
      sequelize,
      modelName: "Town",
      timestamps: true,
    }
  );
  return Town;
};
