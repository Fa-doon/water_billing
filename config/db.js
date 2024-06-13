const { Sequelize } = require("sequelize");
const config = require("./config");

const connectToDB = async () => {
  const sequelize = new Sequelize(config.production);

  try {
    await sequelize.authenticate();
    console.log(`Database connection successful`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return sequelize;
};

module.exports = { connectToDB };
