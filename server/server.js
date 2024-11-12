const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8081;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))   

  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);   
 // Exit the process if connection fails
  });

// Define a User Schema
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String
});

const User = mongoose.model('users', userSchema); // Ensure correct collection name

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST endpoint to create a new user
app.post('/create-account', async (req, res) => {
const { fname, lname, email, password } = req.body;
//encrypt user password:
// const newPassword = await bcrypt.hash(req.body.password, 15)
try {
  const user = await User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  })
  res.status(200).send("User regstered to database")
  console.log('user registered to database')
} catch (err) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});