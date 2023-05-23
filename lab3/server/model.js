// Методи моделі
const sqlite3 = require('sqlite3').verbose();

// Ім'я файлу бази даних
const DB_NAME = 'database.db';

// Ініціалізуємо підключення до бази даних
const db = new sqlite3.Database(DB_NAME);

const userModel = {
    dbInit: () => {
      // Ініціалізація бази даних та створення таблиць, якщо вони ще не існують
      db.run(`CREATE TABLE IF NOT EXISTS users (
        userid INTEGER PRIMARY KEY,
        password TEXT,
        name TEXT,
        email TEXT,
        dob TEXT,
        gender TEXT
      )`);
      
      db.run(`CREATE TABLE IF NOT EXISTS contacts (
        contactid INTEGER PRIMARY KEY,
        useremail TEXT,
        name TEXT,
        email TEXT,
        number TEXT,
        FOREIGN KEY (useremail) REFERENCES users(email)
      )`);
      
    },
    getUserByEmail: (email) => {
      return new Promise((resolve, reject) => {
        
        const query = 'SELECT * FROM users WHERE email = ?';
        db.get(query, [email], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    },
  
    createUser: (user) => {
      return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, email, password, gender, dob) VALUES (?, ?, ?, ?, ?)';
        db.run(query, [user.name, user.email, user.password, user.gender, user.dob], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },
  
    getContacts: (userEmail) => {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM contacts WHERE useremail = ?';
        db.all(query, [userEmail], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    },

    getContactId: (userEmail,contact) =>{
      return new Promise((resolve,reject) => {
        console.log("getcontactid:", userEmail, contact.name, contact.email, contact.number);
        const query = 'SELECT contactid FROM contacts WHERE useremail = ? AND name = ? AND email = ? AND number = ?';
        db.all(query,[userEmail,contact.name,contact.email,contact.number], (err,rows) => {
          if(err){
            reject(err);
          } else {
            const contactId = rows[0]?.contactid;
            resolve(contactId);
          }
        })
      })
    },
  
    deleteContact: (userEmail, contactId) => {
      return new Promise((resolve, reject) => {
        console.log("model deleting:",userEmail,contactId);
        const query = 'DELETE FROM contacts WHERE useremail = ? AND contactid = ?';
        db.run(query, [userEmail, contactId], (err) => {
          if (err) {
            reject(err);
          } else {
            const updatedPosts = userModel.getContacts(userEmail);
            resolve(updatedPosts);
          }
        });
      });
    },
  
    createContact: (userEmail, newPost) => {
      return new Promise((resolve, reject) => {
        const query = 'INSERT INTO contacts (useremail, name, email, number) VALUES (?, ?, ?, ?)';
        console.log("model adding:",userEmail,newPost);
        db.run(query, [userEmail, newPost.name, newPost.email, newPost.number], (err) => {
          if (err) {
            reject(err);
          } else {
            const updatedPosts = userModel.getContacts(userEmail);
            resolve(updatedPosts);
          }
        });
      });
    },
  
    editContact: (userEmail, contactId, updatedInfo) => {
      return new Promise((resolve, reject) => {
        const updateQuery = 'UPDATE contacts SET name = ?, email = ?, number = ? WHERE userEmail = ? AND contactid = ?';
        db.run(updateQuery, [updatedInfo.name, updatedInfo.email, updatedInfo.number, userEmail, contactId], (err) => {
        if (err) {
          reject(err);
        } else {
          const updatedPosts = userModel.getContacts(userEmail);
          resolve(updatedPosts);
        }
      });
    });
  }
  
};
  
module.exports = {userModel};