import * as contactsService from './contacts.js';
import { program } from 'commander';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsService.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contact = await contactsService.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contactsService.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const deletedContact = await contactsService.removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
