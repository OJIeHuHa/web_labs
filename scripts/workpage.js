import { User, Users, users} from './user.js';

class WorkpageModel 
{
  constructor() {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    this.contacts = this.loggedInUser.contacts || [];
  }

  addContact(name, email, phone) 
  {
    const newContact = { name, email, phone };
    this.contacts.push(newContact);
    console.log("addContact",this.contacts)
    this.updateUserContacts();
  }

  deleteContact(contact) 
  {
    const index = this.contacts.findIndex((c) => c.name === contact.name && c.email === contact.email && c.phone === contact.phone);
    this.contacts.splice(index, 1);
    this.updateUserContacts();
  }

  searchContacts(searchString) 
  {
    const filteredContacts = this.contacts.filter((contact) => 
    {
      const searchRegex = new RegExp(searchString, 'gi');
      return (
        contact.name.match(searchRegex) ||
        contact.email.match(searchRegex) ||
        contact.phone.match(searchRegex)
      );
    });
    return filteredContacts;
  }

  sortContacts(sortOption) 
  {
    const [key, direction] = sortOption.split('-');
    const sortedContacts = this.contacts.sort((a, b) => 
    {
      if (direction === 'asc') {
        return a[key].localeCompare(b[key]);
      } else {
        return b[key].localeCompare(a[key]);
      }
    });
    return sortedContacts;
  }

  updateUserContacts() 
  {
    const users = JSON.parse(localStorage.getItem('users'));
    this.loggedInUser.contacts = this.contacts
    const index = users.findIndex((user) => user.email === this.loggedInUser.email);
    users.splice(index, 1, this.loggedInUser);
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser))
    localStorage.setItem('users', JSON.stringify(users));
  }
}

  class WorkpageView 
  {
    constructor() 
    {
      console.log("view constructor")
      this.contactsTable = document.querySelector("#contacts-table");
    }

    renderTable(contacts, editContact = null) {
      // очистити попередні дані таблиці
      this.clearTable();
     
      // перевірити, чи є контакти
      if (!contacts) 
      {
        return;
      }
    
      // вивести дані про контакти в таблицю
      contacts.forEach((contact) => {
        const row = document.createElement("tr");
        if (editContact && editContact.name === contact.name && editContact.email === contact.email && editContact.phone === contact.phone) 
        {
          row.innerHTML = `
            <td><input type="text" id="name-input" value="${contact.name}"></td>
            <td><input type="email" id="email-input" value="${contact.email}"></td>
            <td><input type="tel" id="phone-input" value="${contact.phone}"></td>
            <td><button class="btn btn-primary" data-contact='${JSON.stringify(contact)}'">Save</button></td>
            <td><button class="btn btn-cancell btn-danger" data-contact='${JSON.stringify(contact)}'">Cancel</button></td>
          `;
        } 
        else 
        {
          row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td><button class="btn btn-danger" data-contact='${JSON.stringify(contact)}'">Delete</button></td>
            <td><button class="btn btn-success" data-contact='${JSON.stringify(contact)}'">Edit</button></td>
          `;
        }
        this.contactsTable.querySelector("tbody").appendChild(row);
      });

    }
  
    clearTable() 
    {
      // очистити таблицю від попередніх контактів
      const tbody = this.contactsTable.querySelector("tbody");
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
    }
  }


  class WorkpageController 
  {
    constructor(model, view) 
    {
      console.log("controller constructor")
      this.model = model;
      this.view = view;
    }
  
    init() 
    {
        console.log("init")
        
        // отримуємо дані про користувача з локального сховища
        const loggedInUser = this.model.loggedInUser;
    
        // отримуємо список контактів користувача з моделі
        const contacts = this.model.contacts;
        console.log(contacts)
        // відображаємо таблицю контактів на сторінці
        this.view.renderTable(contacts);
        this.updateEventListeners();
    
        // додаємо обробник події на кнопку "Create New Contact"
        const addButton = document.querySelector('#add-button');
        addButton.addEventListener('click', (event) => 
        {
          console.log("Add-button clicked")
          event.preventDefault();
          this.handleAddContact();
        });
    
        // додаємо обробник події на поле пошуку
        const searchField = document.querySelector('#search');
        searchField.addEventListener('input', () => 
        {
          console.log("Search-button clicked")
          this.handleSearch();
        });
    
        // додаємо обробник події на вибір сортування
        const sortSelect = document.querySelector('#sort');
        sortSelect.addEventListener('change', () => 
        {
          console.log("Sort-button clicked")
          this.handleSort();
        });
    }
    
    updateEventListeners()
    {
      const editButtons = document.querySelectorAll('.btn-success');
      editButtons.forEach(button => 
      {
          const oldListener = button.onclick;
          button.removeEventListener('click', oldListener);
        
          button.addEventListener('click', (event) => 
        {
          const contact = JSON.parse(event.target.getAttribute('data-contact'));
          console.log("Edit-button clicked", this.model.contacts);
          this.handleEdit(contact);
        });
      });
      const deleteButtons = document.querySelectorAll('.btn-danger');
      deleteButtons.forEach(button => 
      {
        const oldListener = button.onclick;
        button.removeEventListener('click', oldListener);

        button.addEventListener('click', (event) => 
        {
          console.log("Delete-button clicked");
          const contact = JSON.parse(event.target.getAttribute('data-contact'));
          this.handleDelete(contact);
        });
      });
    }

    handleAddContact() 
    {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
      
        const newContact = this.model.addContact(name, email, phone);
        this.view.renderTable(this.model.contacts);
      
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
    }
  
    handleSearch() 
    {
      const searchValue = document.getElementById('search').value;
      const filteredContacts = this.model.searchContacts(searchValue);
      this.view.renderTable(filteredContacts);
      this.updateEventListeners();
    } 
  
    handleSort() 
    {
        const sortSelect = document.getElementById("sort");
        const sortOrder = sortSelect.value;
        const sortedContacts = this.model.sortContacts(sortOrder);
        this.view.renderTable(sortedContacts);
        this.updateEventListeners();
    }

    handleEdit(contact) 
    {
      
      this.view.renderTable(this.model.contacts, contact);
      console.log("handle-edit", this.model.contacts)

      const saveButton = document.querySelector('.btn-primary');
      const cancelButton = document.querySelector('.btn-cancell');

      saveButton.addEventListener('click', () => 
      {
          this.handleSave(contact);
      });

      cancelButton.addEventListener('click', () => 
      {
        console.log("cancell clicked");
          this.view.renderTable(this.model.contacts);
          this.updateEventListeners();
      });
    }

    handleSave(contact) {
      const index = this.model.contacts.findIndex((c) => c.name === contact.name && c.email === contact.email && c.phone === contact.phone);

      const name = document.getElementById('name-input').value;
      const email = document.getElementById('email-input').value;
      const phone = document.getElementById('phone-input').value;

      this.model.contacts.splice(index, 1, {name, email, phone});

      this.model.updateUserContacts();
      this.view.renderTable(this.model.contacts);

      this.updateEventListeners();
    }

    handleDelete(contact)
    {
      this.model.deleteContact(contact);
      this.view.renderTable(this.model.contacts);
    }
    
  }
const model = new WorkpageModel();
const view = new WorkpageView();
const controller = new WorkpageController(model,view);
controller.init()