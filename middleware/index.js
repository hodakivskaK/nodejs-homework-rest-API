const validate = require("./validateBody");
const isValidId = require("./isValidId")
const authenticate = require("./authenticate")
const upload = require("./upload")

module.exports = {
    validate,
    isValidId,
    authenticate,
    upload,
}