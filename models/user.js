const Joi = require('joi')
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    role: {
        type: String,
        enum: ["dad", "mom", "baby", "other"],
        require: true,
    },
}, {versionKey: false});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().alphanum().trim().min(3).max(30).required(),
        lastName: Joi.string().alphanum().trim().min(3).max(30).required(),
        role: Joi.string().valid("dad", "mom", "baby", "other").required()
    })

    return schema.validate(user, this)
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema

