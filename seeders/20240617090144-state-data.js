"use strict";

const fs = require("fs");
const path = require("path");
const { State } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fileName = path.resolve(__dirname, "../data/_states.json");
    const stateData = JSON.parse(fs.readFileSync(fileName, "utf8"));

    const existingStatesCount = await State.count();

    try {
      if (existingStatesCount === 0) {
        await queryInterface.bulkInsert("States", stateData, {});
        console.log("States table seeded successfully");
      } else {
        console.log("States already seeded...SKIP");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("States", null, {});
  },
};
