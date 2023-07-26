const {Contact} = require('../models/contact')
const { HttpError, ctrlWrapper } = require('../helpers')


const listAll = async (req, res) => {
    const result = await Contact.find()
    res.json(result);
}


const getContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId)
    
  
    if (!result) { 
      throw HttpError(404, "Not found" );
    }

    res.status(200).json(result);
}

 
const addContact = async (req, res) => {  
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

    
const updateContact = async (req, res) => {
    const { contactId } = req.params;

    console.log(contactId)
    
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
     if (!result) { 
       throw HttpError(404, "Not found");
    }

    res.json(result);
} 

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId)

    if (!result) {
      throw HttpError(404, "Not found" );
    }

    res.status(200).json({ "message": 'contact deleted' })
}


const updateStatusContact = async (req, res)  => {
    const { contactId } = req.params;


    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    console.log(result)

    if (!result) { 
       throw HttpError(404, "Not found?");
    }

    res.status(200).json(result);
}

  

module.exports = {
    listAll: ctrlWrapper(listAll),
    getContact: ctrlWrapper(getContact),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
    updateStatusContact : ctrlWrapper(updateStatusContact),
}