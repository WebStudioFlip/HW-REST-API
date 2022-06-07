const Contact = require("../../models/Contacts");

const listContacts = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const result = await Contact.find({ owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
