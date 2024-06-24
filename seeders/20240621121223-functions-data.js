"use strict";

const fs = require("fs");
const path = require("path");
const { Function } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const fileName = path.resolve(__dirname, "../data/_functions.json");

    const functionData = JSON.parse(fs.readFileSync(fileName, "utf8"));

    const existingFunctionCount = await Function.count();

    try {
      if (existingFunctionCount === 0) {
        await queryInterface.bulkInsert("Functions", functionData, {});
        console.log("Functions seeded successfully");
      }
    } catch (error) {
      console.log("Functions already seeded...SKIP");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Functions", null, {});
  },
};
