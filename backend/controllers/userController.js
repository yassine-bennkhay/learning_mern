const asyncHandler = require("express-async-handler");
require("dotenv");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
/*
Description     Register a user
Route           POST api/users/register
Access          Public
*/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Check the inputs
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //Check if the user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});
/*
Description     Login a user
Route           POST api/users/login
Access          Public
*/
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid user credentials");
  }
});
/*
Description     Get user data
Route           GET api/users/me
Access          Public
*/

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const getMe = asyncHandler(async (req, res) => {
  const{_id,name,email}=await User.findById(req.user.id)
  res.status(200).json({
    id:_id,
    name,
    email,
  })
});
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
