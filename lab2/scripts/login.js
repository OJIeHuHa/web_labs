import { User, Users, users } from './user.js';

class LoginController 
{
  constructor(view) 
  {
    this.loginForm = document.querySelector('#login-form');
    this.emailInput = document.querySelector('#email');
    this.passwordInput = document.querySelector('#password');
    this.errorMessage = document.createElement('p');
    this.errorMessage.classList.add('error-message');
    this.errorMessage.textContent = 'Wrong email or password';
    this.view = view
    users.loadUsers();
    if (users.users.length === 0) 
    {
        console.log('No users registered yet.');
    } 
    else 
    {
        users.users.forEach(user => console.log(user));
    }
    this.loginForm.addEventListener('submit', (event) => 
    {
      
      event.preventDefault();
      const logindata = this.view.getFormData();

      const user = users.checkUser(logindata.email, logindata.password);
      if (user) 
      {
        users.saveUsers();
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.navigateToWorkPage();
      } 
      else 
      {
        this.view.showErrorMessage();
      }
    });
  }

  navigateToWorkPage() 
  {
    window.location.href = 'workpage.html';
  }

  showErrorMessage() 
  {
    this.loginForm.appendChild(this.errorMessage);
  }
}

class LoginView 
{
    constructor() 
    {
      this.loginForm = document.querySelector('#login-form');
      this.emailInput = document.querySelector('#email');
      this.passwordInput = document.querySelector('#password');
      this.errorMessage = document.createElement('p');
      this.errorMessage.classList.add('error-message');
    }

    getFormData() 
    {
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();

        return { email, password};
    }

    showRegistrationError(message) 
    {
        this.registrationErrorMessage.style.display = 'block';
        this.registrationErrorMessage.textContent = message;
    }
}
const view = new LoginView();
new LoginController(view);


