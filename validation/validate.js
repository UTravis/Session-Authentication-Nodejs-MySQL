const Joi = require("joi");

const schema = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required()
})


module.exports.schema = schema;
module.exports.loginSchema = loginSchema;