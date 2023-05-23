const express = require('express');
const router = express.Router();
const {userModel} = require('./model.js');

console.log(userModel);
// getPosts
router.get('/contacts', async (req, res, next) => {
  try {
    const userEmail = req.query.userEmail;
    const contacts = await userModel.getContacts(userEmail);
    res.json({ contacts });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

router.post('/contactid/:userEmail', async (req, res, next) => {
  console.log('/contactid started:');
  try {
    const userEmail = req.params.userEmail;
    const contactInfo = req.body; // Отримання даних з тіла запиту
    console.log(userEmail, contactInfo.name);
    const contactid = await userModel.getContactId(userEmail, contactInfo);
    res.json({ contactid });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});


router.get('/profile', async (req, res, next) => {
  console.log("/profile started on server");
  try {
    const userEmail = req.query.userEmail;
    const user = await userModel.getUserByEmail(userEmail);
    res.json({ user });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});


// login
router.post('/login', async (req, res, next) => {
  console.log("/api/login started on servern");
  try {
    const { email, password } = req.body;
    
    const user = await userModel.getUserByEmail(email);
    if (user && user.password === password) {
      return res.json({ user, status: 200 });
    }
    res.json({ message: 'User not found' });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

// register
router.post('/register', async (req, res, next) => {
  console.log("/api/register started on servern");
  try {
    const user = req.body;
    const isUser = await userModel.getUserByEmail(user.email);
    if (isUser) {
      return res.json({ message: 'User is already created' });
    }
    await userModel.createUser(user);
    res.send({ message: 'User created', status: 200 });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

// delete contact
router.delete('/delete/:userEmail/:id', async (req, res, next) => {
  console.log("/api/delete/:userEmail/:id started on servern");
  try {
    const userEmail = req.params.userEmail;
    const contactId = req.params.id;
    const deletedPosts = await userModel.deleteContact(userEmail, contactId);
    res.send({ posts: deletedPosts });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

// create contact
router.post('/create/:userEmail', async (req, res, next) => {
  console.log("/api/create/:id started on servern");
  try {
    const userEmail = req.params.userEmail;
    const newPost = req.body;
    console.log("adding:",userEmail, newPost);
    const createdPosts = await userModel.createContact(userEmail, newPost);
    res.send({ posts: createdPosts });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

// edit contact
router.post('/edit/:userEmail/:contactId', async (req, res, next) => {
  console.log("/api/edit/:userid/:id started on servern");
  try {
    const userEmail = req.params.userEmail;
    const contactId = req.params.contactId;
    const updatedPost = req.body;
    console.log("server edit info:", userEmail, contactId, updatedPost)
    const updatedPosts = await userModel.editContact(userEmail, contactId, updatedPost);
    res.send({ posts: updatedPosts });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = router;
