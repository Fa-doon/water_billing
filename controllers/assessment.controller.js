const { errorHandler } = require("../middlewares/error.middleware");
const assessmentService = require("../services/assessmentItem.services");

const createNewAssessment = async (req, res, next) => {
  try {
    const assessment = req.body;

    const assessmentItem = await assessmentService.newAssessment(assessment);
    return res.status(assessmentItem.statusCode).json({
      message: assessmentItem.message,
      details: assessmentItem.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

const getAllAssessmentItems = async (req, res, next) => {
  try {
    const assessments = await assessmentService.getAllAssessmentItems();

    return res.status(assessments.statusCode).json({
      message: assessments.message,
      assessmentDetails: assessments.data,
    });
  } catch (error) {
    errorHandler(error, res, next);
  }
};

module.exports = {
  createNewAssessment,
  getAllAssessmentItems
};
