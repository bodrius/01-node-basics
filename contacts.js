const fs = require("fs");
const path = require("path");
const uuid = require('uuid');
const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile("./db/contacts.json", "utf-8", function (error, content) {
    try {
      const data = JSON.parse(content);
      console.table(data);
    } catch (error) {
      console.log(error);
    }
  });
}

// listContacts()

function getContactById(contactId) {
  fs.readFile("./db/contacts.json", "utf-8", function (error, content) {
    try {
      const data = JSON.parse(content);
      const findContact = data.find((contact) => contact.id === contactId);
      console.dir(findContact);
    } catch (error) {
      console.log("error", error);
    }
  });
}

// getContactById(7);

function removeContact(contactId) {
  fs.readFile("./db/contacts.json", "utf-8", function (error, content) {
    try {
      const data = JSON.parse(content);
      const removalContact = data.filter((contact) => contact.id !== contactId);
      const newContactsList = JSON.stringify(removalContact)
            fs.writeFile(contactsPath, newContactsList, () => {
                console.log("Warning!!! The contact has been deleted!");
              });
      console.table(removalContact);
    } catch (error) {
      console.log("error", error);
    }
  });
}

// removeContact(5);

function addContact(name, email, phone) {
  fs.readFile('./db/contacts.json', 'utf-8', function (err, content) {
    try{
        const parseContent = JSON.parse(content)
        const createContact = {id: uuid.v4(), name, email, phone}
        const addContact = [createContact, ...parseContent ]
        fs.writeFile(contactsPath, JSON.stringify(addContact), () => {
            console.log("Congratulation!!! Contact was added.");
          });
          console.table(addContact);
    } catch (error){
      console.log("error", error);
    }
})
}

// addContact("Bogdan Pechenyk", "bogdanpechenyk@gmail.com", "+380950242412")

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
