'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Function extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Function.init({
    function: DataTypes.STRING,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Function',
    timestamps: true
  });
  return Function;
};