const fs = require('fs/promises');
const { randomUUID } = require('crypto');
const contactsPath = require('./contactsPath');
const updateContacts = require('./updateContacts');

const readContent = async () => {
    try {
        const content = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(content);
    }
    catch (error) {
        return error.message;
    }
}

async function listContacts() {
    try {
        return await readContent();
    }
    catch (error) {
        return error.message;
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await readContent();
        const contact = contacts.find(el => el.id === contactId);
        return contact;
    }
    catch (error) {
        return error.message;
    }
}

async function removeContact(contactId) {
    try {
         const contacts = await readContent();
         const contactDelete = await getContactById(contactId);
         const filteredContacts = contacts.filter(
             contact => contact.id !== contactId);
         
         updateContacts(filteredContacts);
         return contactDelete;

    }
    catch (error) {
         return error.message;
    } 
}

async function addContact(name, email, phone) {
    try {
        let contacts = await readContent();
        const newContact = { id: randomUUID(), name, email, phone };
        contacts.push(newContact);
        updateContacts(contacts);
        return newContact;
    }
    catch (error) {
        return error.message;
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact }