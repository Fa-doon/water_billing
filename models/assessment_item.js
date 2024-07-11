"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assessment_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assessment_Item.belongsTo(models.Building, {
        foreignKey: "building_id",
        targetKey: "id",
      });
      Assessment_Item.belongsTo(models.Size_range, {
        foreignKey: "Size_ranges",
        targetKey: "id",
      });
    }
  }
  Assessment_Item.init(
    {
      building_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Buildings",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      sizerange_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Size_ranges",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      meter_reading: DataTypes.INTEGER,
      meter_id: DataTypes.STRING,
      rate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Assessment_Item",
      timestamps: true,
    }
  );
  return Assessment_Item;
};
