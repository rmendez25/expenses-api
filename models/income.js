const Joi = require("joi");
const mongoose = require("mongoose");
const { userSchema } = require("./user");

const incomeSchema = new mongoose.Schema({
  user: {
    type: userSchema,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
    require: true,
  },
  incomeSource: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 30,
  },
  incomeAmount: {
    type: Number,
    min: 0,
    require: true,
  },
});

const Income = mongoose.model("Income", incomeSchema);

function validateIncome(income) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    date: Joi.date().required(),
    incomeSource: Joi.string().trim().min(0).max(30),
    incomeAmount: Joi.number().min(0).required(),
  });

  return schema.validate(income, this);
}

exports.Income = Income;
exports.validate = validateIncome;