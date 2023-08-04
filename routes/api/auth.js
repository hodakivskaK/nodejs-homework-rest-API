const express = require('express'); 
const router = express.Router()

const ctrl = require('../../controllers/auth'); 
const {validate,  authenticate} = require('../../middleware')

const { schemas } = require("../../models/user")

// register
router.post('/users/register', validate.validateBodyPut(schemas.registerSchema), ctrl.register)

// login
router.post('/users/login', validate.validateBodyPut(schemas.loginSchema), ctrl.login)

// current token
router.get('/users/current', authenticate,  ctrl.getCurrent)

// logout
router.post('/users/logout', authenticate, ctrl.logout)

module.exports = router;