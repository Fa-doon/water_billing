"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Building extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Building.belongsTo(models.State, {
        foreignKey: "state_id",
        targetKey: "id",
      });

      Building.belongsTo(models.Lga, {
        foreignKey: "lga_id",
        targetKey: "id",
      });

      Building.belongsTo(models.Purpose, {
        foreignKey: "purpose_id",
        targetKey: "id",
      });

      Building.belongsTo(models.Function, {
        foreignKey: "function_id",
        targetKey: "id",
      });

      Building.belongsTo(models.Taxpayer, {
        foreignKey: "taxpayer_id",
        targetKey: "id",
      });
    }
  }
  Building.init(
    {
      name: DataTypes.STRING,
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
      size: DataTypes.DECIMAL(10, 2),
      purpose_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Purposes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      function_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Functions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      taxpayer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Taxpayers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      is_metered: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Building",
      timestamps: true
    }
  );
  return Building;
};
