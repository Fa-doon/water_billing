"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size_range extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Size_range.init(
    {
      min_size: DataTypes.INTEGER,
      max_size: DataTypes.INTEGER,
      rate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Size_range",
      timestamps: true,
    }
  );
  return Size_range;
};
