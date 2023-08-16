const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const userSchema = Schema({
   verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },

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
   avatarURL: {
     type: String,
     required: true,
  },

  token: {
    String,

  },  
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
  avatarURL: Joi.string(),
})

const loginSchema = Joi.object({
  password: Joi.string().min(5).required().messages({
      'any.required': `missing required password field`
    }),
  email: Joi.string().required().messages({
      'any.required': `missing required email field`
    }),
})

const verifySchema = Joi.object({
   email: Joi.string().required().messages({
      'any.required': `missing required field email`
    }),
})

const schemas = {
  registerSchema,
  loginSchema,
  verifySchema
}

module.exports = {
    User,
    schemas,
};

