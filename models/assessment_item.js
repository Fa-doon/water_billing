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
        foreignKey: "Buildings",
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
      meter_id: DataTypes.STRING,
      rate: DataTypes.DECIMAL(12, 4),
    },
    {
      sequelize,
      modelName: "Assessment_Item",
      timestamps: true
    }
  );
  return Assessment_Item;
};
