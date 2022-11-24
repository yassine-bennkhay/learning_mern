const asyncHandler=require("express-async-handler")
const User= require("../models/userModel")

/*
Description     Register a user
Route           POST api/users/register
Access          Public
*/
const registerUser=(req,res)=>{
    res.status(200).json({message:"User Registered Successfully"})

}
/*
Description     Login a user
Route           POST api/users/login
Access          Public
*/
const loginUser=(req,res)=>{
    res.status(200).json({message:"User logged in Successfully"})

}
/*
Description     Get user data
Route           GET api/users/me
Access          Public
*/
const getMe=(req,res)=>{
    res.status(200).json({message:"User data"})

}
module.exports={
    registerUser,
    loginUser,
    getMe
}