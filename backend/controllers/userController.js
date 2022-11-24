const asyncHandler=require("express-async-handler")
const User= require("../models/userModel")

/*
Description     register user
Route           POST api/register
*/

const registerUser=(req,res)=>{
    res.status(200).json({message:"User Registered Successfully"})

}
module.exports={
    registerUser
}