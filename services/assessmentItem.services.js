// const { Assessment_Item, Building } = require("../models");
// const { CustomError } = require("../utils/customError");
// const { roomTiers, purposeTiers, functionTiers } = require("../data/tiers");

// const newAssessment = async (buildingId) => {
//   // check if building exists
//   const building = await Building.findByPk(buildingId);

//   if (!building) {
//     throw new CustomError(`Building with ID ${buildingId} does not exist`, 404);
//   }

//   if (building.is_metered) {
//     // generate meter ID, set rate and store details
//     // if building.size between a range and purpose, then calculate rate and store
//   } else {
//     // calculate using tier system, set rate and store details.
//   }
// };
