
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET - All contacts
const getAll = async (req, res) => {
  try {
    const contacts = await mongodb
      .getDb()
      .collection('contacts')
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET - One contact
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const contactId = new ObjectId(req.params.id);

    const contact = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST - Create a contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // All fields are required
    if (Object.values(contact).some(
      value => typeof value !== 'string' || !value.trim()
    )) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(contact);

    res.status(201).json({
      id: response.insertedId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT - Update a contact
const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      });
    }

    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    if (Object.values(contact).some(
      value => typeof value !== 'string' || !value.trim()
    )) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE - Remove a contact
const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      });
    }

    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};