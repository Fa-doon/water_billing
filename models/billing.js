"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Billing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Billing.belongsTo(models.Building, {
        foreignKey: "building_id",
        targetKey: "id",
      });

      Billing.belongsTo(models.Assessment_Item, {
        foreignKey: "assessment_item_id",
        targetKey: "id",
      });
    }
  }
  Billing.init(
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
      invoice_number: DataTypes.STRING,
      assessment_item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Assessment_Items",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      from_date: DataTypes.DATE,
      to_date: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "paid"],
        defaultValue: "pending",
      },
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Billing",
      timestamps: true,
    }
  );
  return Billing;
};
