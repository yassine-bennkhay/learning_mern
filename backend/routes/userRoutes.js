const express=require("express")
const router=express.Router()
const {registerUser,loginUser,getMe}=require("../controllers/userController")

router.post('/',registerUser)
router.post('/',loginUser)
router.get('/',getMe)


module.exports=router