const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const { userSchema } = require("./user");

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50,
  },
  amount: {
    type: Number,
    min: 0,
    require: true,
  },
  category: {
    type: categorySchema,
    require: true,
  },
  purchaseDate: {
    type: Date,
    require: true,
  },
  user: {
    type: userSchema,
    require: true,
  },
  receipt: {
    type: String,
  },
  notes:{
    type: String,
    minlength: 0,
    maxlength: 255,
  }
},{versionKey:false});

const Expense = mongoose.model("Expense", expenseSchema);

function validateExpense(expense) {
  const schema = Joi.object({
    name: Joi.string().trim().min(0).max(50).required(),
    amount: Joi.number().min(0).required(),
    categoryId: Joi.objectId().required(),
    purchaseDate: Joi.date().required(),
    userId: Joi.objectId().required(),
    receipt: Joi.string(),
    notes: Joi.string().min(0).max(255)
  });

  return schema.validate(expense, this);
}

exports.Expense = Expense;
exports.expenseSchema = expenseSchema;
exports.validate = validateExpense;
