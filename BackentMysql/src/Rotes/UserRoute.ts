import { Router } from "express"; 
import { AllUser, ChangePass, Login, SignUp, UpdateUserStatus } from "../Collections/UserCollection";
 
 
const express = require('express') 
const router:Router = express.Router()
 
router.post('/signup',SignUp)
router.post('/login',Login)
router.post('/allUsers',AllUser)
router.post('/updateUserStatus',UpdateUserStatus)
router.post('/ChangePassword',ChangePass)

module.exports = router; 