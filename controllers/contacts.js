const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all contacts//
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .find();

    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one contact by ID//
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Week 2 Assignment //
// POST - Create a contact
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb.getDatabase().collection("contacts").insertOne(contact);

  res.status(201).json({ id: response.insertedId });
};

// PUT - Update a contact
const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  await mongodb.getDatabase().collection("contacts").replaceOne({ _id: contactId }, contact);

  res.status(204).send();
};

// DELETE - Remove a contact
const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  await mongodb.getDatabase().collection("contacts").deleteOne({ _id: contactId });

  res.status(204).send();
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};