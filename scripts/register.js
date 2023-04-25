// Підключення модуля user.js
import { User, Users, users } from './user.js';

// Контролер реєстрації користувача
class RegisterController 
{
    constructor(view,model) 
    {
        this.user = null;
        this.nameInput = document.querySelector('#name');
        this.emailInput = document.querySelector('#email');
        this.passwordInput = document.querySelector('#password');
        this.genderInput = document.querySelector('#gender');
        this.dateInput = document.querySelector('#date-input');
        this.registrationForm = document.querySelector('#registration-form');
        this.view = view;
        users.loadUsers();
        users.users.forEach(user => console.log(user));
        this.registrationForm.addEventListener('submit', (event) => 
        {
            console.log('Register function called');
            event.preventDefault(); // Зупиняємо відправку форми
            // Отримуємо значення полів форми
            const registrationData = this.view.getFormData()
            // Перевіряємо коректність заповнення полів
            if (!registrationData.name || !registrationData.email 
              || !registrationData.password || !registrationData.gender 
              || !registrationData.birthDate) 
            {
                this.view.showRegistrationError('Please fill out all fields.');
                return;
            }
    
            // Створюємо нового користувача
            this.user = new User(registrationData.name, registrationData.email, 
              registrationData.password, registrationData.gender, 
              registrationData.birthDate);
            
            // Додаємо нового користувача до списку користувачів
            users.addUser(this.user);
            if (users.users.length === 0) 
            {
              console.log('No users registered yet.');
            } 
            else 
            {
              users.users.forEach(user => console.log(user));
            }
            users.saveUsers();
            // Переходимо на сторінку логіну
            window.location.href = 'login.html';
        });
    }
}

class RegisterView 
{
    constructor() 
    {
        this.nameInput = document.querySelector('#name');
        this.emailInput = document.querySelector('#email');
        this.passwordInput = document.querySelector('#password');
        this.genderInput = document.querySelector('#gender');
        this.dateInput = document.querySelector('#date-input');
        this.registrationForm = document.querySelector('#registration-form');
        this.registrationErrorMessage = document.querySelector('#registration-error-message');
    }

    getFormData() 
    {
        const name = this.nameInput.value.trim();
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();
        const gender = this.genderInput.value.trim();
        const birthDate = this.dateInput.value.trim();
        return { name, email, password, gender, birthDate };
    }

    showRegistrationError(message) 
    {
        this.registrationErrorMessage.style.display = 'block';
        this.registrationErrorMessage.textContent = message;
    }
}


// Ініціалізуємо контролер при завантаженні сторінки
const view = new RegisterView();
new RegisterController(view);