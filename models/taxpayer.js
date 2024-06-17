"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Taxpayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Taxpayer.belongsTo(models.State, {
        foreignKey: "state_id",
        targetKey: "id",
      });

      Taxpayer.belongsTo(models.Lga, {
        foreignKey: "lga_id",
        targetKey: "id",
      });
    }
  }
  Taxpayer.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      state_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "States",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      lga_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Lgas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      street: DataTypes.STRING,
      address: DataTypes.STRING,
      employment_status: {
        type: DataTypes.ENUM,
        values: ["employed", "self-employed", "unemployed"],
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Taxpayer",
      timestamps: true
    }
  );
  return Taxpayer;
};
