const { Assessment_Item, Billing, Building } = require("../models");
const { CustomError } = require("../utils/customError");

const generateBill = async (billData) => {
  try {
    // const { building_id, assessment_item_id, from_date, to_date, status } =
    //   billData;

    const building = await Building.findByPk(billData.building_id);
    console.log(building);
    
    if (!building) {
      throw new CustomError(`Building does not exist`, 404);
    }

    const assessmentItem = await Assessment_Item.findOne({
      where: { id: billData.assessment_item_id, building_id: billData.building_id },
    });

    if (!assessmentItem) {
      throw new CustomError(
        `Assessment with ID ${billData.assessment_item_id} is not linked to building with ID ${billData.building_id}`
      );
    }

    const invoice = `INV-${Date.now()}`;

    const amount = assessmentItem.rate;

    const billing = await Billing.create({
      building_id: billData.building_id,
      assessment_item_id: billData.assessment_item_id,
      from_date: billData.from_date,
      to_date: billData.to_date,
      status: billData.status,
      amount,
      invoice_number: invoice,
    });

    return {
      message: "Bill generated successfully",
      data: billing,
      statusCode: 200,
    };
  } catch (error) {
    console.log("An error occured", error);
    throw error;
  }
};

module.exports = {
  generateBill,
};
