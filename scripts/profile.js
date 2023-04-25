import { User } from './user.js';

class ProfileModel
{
  loadUserData() 
  {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return JSON.parse(loggedInUser)
  }
}

class ProfileController 
{
  constructor(model,view) 
  {
    this.model = model;
    this.view = view;
    
  }
  init()
  {
    const userData = this.model.loadUserData();
    console.log(userData);
    this.view.setUser(userData);
  }
}

class ProfileView
{
  constructor()
  {
    this.nameElement = document.querySelector('#name');
    this.emailElement = document.querySelector('#email');
    this.dobElement = document.querySelector('#dob');
    this.genderElement = document.querySelector('#gender');
  }

  setUser(user) 
  {
    this.nameElement.textContent = user.name;
    this.emailElement.textContent = user.email;
    this.dobElement.textContent = user.birthDate;
    this.genderElement.textContent = user.gender;
  }
}
const model = new ProfileModel();
const view = new ProfileView();
const controller = new ProfileController(model, view);
controller.init();
