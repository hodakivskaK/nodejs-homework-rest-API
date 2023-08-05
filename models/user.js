const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
 
  token: {
    String,

   }
  
}, {
  versionKey: false
})

userSchema.post("save", handleMongooseError)

const User = model("user", userSchema)


const registerSchema = Joi.object({
  password: Joi.string().min(5).required().messages({
      'any.required': `missing required password field`
    }),
  email: Joi.string().required().messages({
      'any.required': `missing required email field`
    }),
  subscription: Joi.string(),
})

const loginSchema = Joi.object({
  password: Joi.string().min(5).required().messages({
      'any.required': `missing required password field`
    }),
  email: Joi.string().required().messages({
      'any.required': `missing required email field`
    }),
})

const schemas = {
  registerSchema,
  loginSchema
}

module.exports = {
    User,
    schemas,
};

