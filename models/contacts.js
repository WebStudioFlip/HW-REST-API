const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

async function updateContact(contactsList) {
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  return result;
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const result = contactsList.find(
    ({ id }) => id.toString() === contactId.toString()
  );
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(
    ({ id }) => id.toString() === contactId.toString()
  );
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  await updateContacts(contactsList);
  return result;
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    return null;
  }
  const contactsList = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contactsList.push(newContact);
  await updateContact(contactsList);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
