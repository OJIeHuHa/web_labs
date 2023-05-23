const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');
const usersRouter = require('./server/controller.js');
const {userModel} = require('./server/model.js');

userModel.dbInit();
app.use(cors());
app.use(express.json());

// Додайте цей код для обслуговування статичних файлів з папки "dist"
app.use(express.static(path.join(__dirname, "dist")));

app.use('/api', usersRouter);

// Змініть шлях до файлу index.html на новий шлях у папці "dist"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log("Server running on port:", HTTP_PORT);
});
