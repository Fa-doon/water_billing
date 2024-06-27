const Joi = require("joi");

const validateTaxpayer = async (req, res, next) => {
  try {
    const taxpayer = req.body;

    const taxpayerSchema = Joi.object({
      fullname: Joi.string().required().messages({
        "string.base": "Invalid type, please provide a valid string",
        "string.required": "Fullname is required",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Please provide a valid email",
        "string.required": "Email is required",
      }),
      phone_number: Joi.string().required().messages({
        "string.base": "Invalid type, please provide a valid string",
        "string.required": "Phone number is required",
      }),
      state_id: Joi.number().integer().required().messages({
        "number.base": "Invalid type, state_id must be a number",
        "any.required": "state_id is required",
      }),
      lga_id: Joi.number().integer().required().messages({
        "number.base": "Invalid type, lga_id must be a number",
        "any.required": "lga_id is required",
      }),
      town_id: Joi.number().integer().required().messages({
        "number.base": "Invalid type, town_id must be a number",
        "any.required": "town_id is required",
      }),
      street: Joi.string().required().messages({
        "string.base": "Invalid type, please provide a valid string",
        "string.required": "street is required",
      }),
      address: Joi.string().required().messages({
        "string.base": "Invalid type, please provide a valid string",
        "string.required": "Address is required",
      }),
      employment_status: Joi.string()
        .required()
        .valid("employed", "self-employed", "unemployed")
        .messages({
          "string.base": "Invalid type, please provide a valid string",
          "any.only": `Must only contain "employed", "unemployed" or "self-employed"`,
        }),
    });

    const valid = await taxpayerSchema.validateAsync(taxpayer, {
      abortEarly: true,
    });

    if (valid.error) {
      const errorMessages = valid.error.details.map((error) => error.message);
      return res.status(422).json({
        message: errorMessages,
        success: false,
      });
    }
    next();
  } catch (error) {
    return res.status(422).json({
      message: error.message,
      success: false,
    });
  }
};

const validateBuilding = async (req, res, next) => {
  try {
    const building = req.body;

    const buildingSchema = Joi.object({
      name: Joi.string().required().messages({
        "string.base": "Invalid type, please provide a valid string",
        "string.required": "Name is required",
      }),
      state_id: Joi.number().integer().required().messages({
        "number.base": "Invalid type, state_id must be a number",
        "any.required": "state_id is required",
      }),
      lga_id: Joi.number().integer().required().messages({
        "number.base": "Invalid type, lga_id must be a number",
        "any.required": "lga_id is required",
      }),
      town_id: Joi.number().integer().required().messages({
        "number.base": "Invalid type, town_id must be a number",
        "any.required": "town_id is required",
      }),
      street: Joi.string().required().messages({
        "string.base": "Invalid type, please provide a valid string",
        "string.required": "street is required",
      }),
      address: Joi.string().required().messages({
        "string.base": "Invalid type, please provide a valid string",
        "string.required": "Address is required",
      }),
      size: Joi.number().integer().required().messages({
        "number.base": "Invalid type, size must be a number",
        "any.required": "size is required",
      }),
      function_id: Joi.number().integer().required().messages({
        "number.base": "Invalid type, function_id must be a number",
        "any.required": "function_id is required",
      }),
      purpose_id: Joi.number().integer().required().messages({
        "number.base": "Invalid type, function_id must be a number",
        "any.required": "purpose_id is required",
      }),
      taxpayer_id: Joi.number().integer().required().messages({
        "number.base": "Invalid type, taxpayer_id must be a number",
        "any.required": "taxpayer_id is required",
      }),

      is_metered: Joi.boolean().required().messages({
        "boolean.base": "Invalid type, is_metered must be a boolean ",
        "any.required": "is_metered is required",
      }),
    });

    const valid = await buildingSchema.validateAsync(building, {
      abortEarly: true,
    });

    if (valid.error) {
      const errorMessages = valid.error.details.map((error) => error.message);
      return res.status(422).json({
        message: errorMessages,
        success: false,
      });
    }
    next();
  } catch (error) {
    return res.status(422).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  validateTaxpayer,
  validateBuilding,
};
