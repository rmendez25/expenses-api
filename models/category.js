const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 30,
    require: true
  },
});

const Category = mongoose.model('Category', categorySchema)

function validateCategory(category){
    const schema = Joi.object({
        name: Joi.string().trim().min(0).max(30),
    })

    return schema.validate(category, this)
}

exports.Category = Category
exports.validate = validateCategory
exports.categorySchema = categorySchema
