"use strict";
const { Model } = require("sequelize");
// const bcrypt = require("bcrypt")
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.belongsTo(models.Role, {
        foreignKey: "role_id",
        targetKey: "id",
      });
    }
  }
  Admin.init(
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
    },
    {
      sequelize,
      modelName: "Admin",
      timestamps: true,
    }
  );

  return Admin;
};
