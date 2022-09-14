const fs = require("fs/promises");
const path = require("path");
const id = require("uuid");


const contactsPath = path.resolve("./db/contacts.json");


async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(contactId) {
    try {
        const allContacts = await listContacts();
        const contact = allContacts.find(({ id }) => id === contactId);
        return contact;
    } catch (error) {
        console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const allContacts = await listContacts();
        const chengedContacts = allContacts.filter(({ id }) => id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(chengedContacts));
        listContacts();
        return  allContacts.filter(({id})=> id === contactId)
    } catch (error) {
        console.log(error.message);
    }
}

async function addContact(name, email, phone) {
  try {
      const newContact = {
          id: id.v4(),
          name: name,
          email: email,
          phone: phone,
      }
      const allContacts = await listContacts();
      const chengedContacts = [...allContacts, newContact];
      fs.writeFile(contactsPath, JSON.stringify(chengedContacts));
      listContacts();
      return newContact;
  } catch (error) {
    
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};