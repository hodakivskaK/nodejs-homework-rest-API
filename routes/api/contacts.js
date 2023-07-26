const express = require('express');
 
const ctrl = require('../../controllers/contacts'); 
const {validate, isValidId} = require('../../middleware')
const {schemas} = require('../../models/contact')
const router = express.Router()

// routes get contacts list 
router.get('/', ctrl.listAll)

// routes get a contact
router.get('/:contactId', isValidId, ctrl.getContact)

// routes add a contact 
router.post('/', validate.validateBodyPut(schemas.addSchema),  ctrl.addContact )

// routes delete a contact
router.delete('/:contactId', isValidId,  ctrl.removeContact )

// routes change a contact
router.put('/:contactId', isValidId, validate.validateBodyPut(schemas.addSchema), ctrl.updateContact)

// routes update a favorite status in a contact
router.patch("/:contactId/favorite", isValidId, validate.validateBodyPatch(schemas.updateStatusContactSchema), ctrl.updateStatusContact);



module.exports = router;
