require('dotenv').config(); // Load environment variables
console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);
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
  // do not use brackets around type. it will not send data. DONT USE: {STRING}, DO USE: STRING
  fname: String,
  lname: String, 
  email: String,
  password: String
});

//create a compare password function
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema); // Ensure correct collection name, monogoDB will pluralize it on its own

// Middleware to parse JSON request bodies
app.use(express.json());

// POST endpoint to create a new user
app.post('/create-account', async (req, res) => {
const { fname, lname, email, password } = req.body;
//encrypt user password:
//const newPassword = await bcrypt.hash(req.body.password, 15)
try {
  const user = await User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 15),
  })
  res.status(200).json({ message: "User registered to database" });
  console.log("Response sent:", { message: "User registered to database" });
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}
});

// //create a compare password function (implemented ABOVE)
// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// login authenticaton
app.post('/login', async (req,res) => {
const {email, password} = req.body;
try {
  const user = await User.findOne({email});
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // causing current error
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1 hour'
  });
  res.json({ token });

} catch(err) {
  console.error(err);
  console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);
  res.status(500).json({ message: "Internal server error", error: err.message });
}

});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});