const express = require('express');
const multer = require('multer');
const path = require('path');
const users = require('./db/users');
const cors = require('cors');

const bodyParser = require('body-parser');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ dest: 'uploads/', storage });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
  })
);

app.post('/profile', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.post(
  '/photos/upload',
  upload.array('photos', 12),
  function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  }
);

// Create crud routes for users using knex

// Create a route for getting all users

app.get('/users', (req, res) => {
  users.getAll().then((users) => {
    res.status(200).json(users);
  });
});

// Create a route for getting one user
app.get('/users/:id', (req, res) => {
  users.getOne(req.params.id).then((user) => {
    res.status(200).json(user);
  });
});

// Create a route for creating a user
app.post('/users', (req, res) => {
  users.create(req.body).then((user) => {
    res.status(200).json(user);
  });
});

// Create a route for updating a user
app.put('/users/:id', (req, res) => {
  users.update(req.params.id, req.body).then((user) => {
    res.status(200).json(user);
  });
});

// Create a route for deleting a user
app.delete('/users/:id', (req, res) => {
  users.delete(req.params.id).then(() => {
    res.status(200).json({
      deleted: true,
    });
  });
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
