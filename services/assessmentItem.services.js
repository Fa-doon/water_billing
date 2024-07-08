// const { Assessment_Item, Building } = require("../models");
// const { CustomError } = require("../utils/customError");
// // const { roomTiers, purposeTiers, functionTiers } = require("../data/tiers");

// const newAssessment = async (buildingId) => {
//   // check if building exists
//   const building = await Building.findByPk(buildingId);

//   if (!building) {
//     throw new CustomError(`Building with ID ${buildingId} does not exist`, 404);
//   }

//   if (building.is_metered) {
//     // if building.size between a range and purpose, then calculate rate and store

//     // Orcreate rate table to minimize if else statements

//     if (
//       building.size >= 1 &&
//       building.size <= 3 &&
//       building.purpose === "Residential"
//     ) {
//       const rate = 110 * building.meter_reading;

//       return {
//         message: "Item assessed successfully",
//         rate: rate,
//         statusCode: 200,
//       };
//     }
//   } else {
//     // calculate using tier system, set rate and store details.
//   }
// };
