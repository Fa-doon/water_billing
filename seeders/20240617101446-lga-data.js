"use strict";

const fs = require("fs");
const path = require("path");
const { lgaDetails } = require("../utils/seed");
const { Lga } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fileName = path.resolve(__dirname, "../_lga.json");
    const lgaData = JSON.parse(fs.readFileSync(fileName, "utf8"));

    const lgaDataResult = lgaDetails(lgaData);

    const existingLgaCount = await Lga.count();

    try {
      if (existingLgaCount === 0) {
        await queryInterface.bulkInsert("Lgas", lgaDataResult, {});
        console.log("LGAs successfully seeded");
      } else {
        console.log("LGAs already seeded...SKIP");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Lgas", null, {});
  },
};
