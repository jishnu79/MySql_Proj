import { Router } from "express"; 
import {  ChangePass, Login, SignUp } from "../Collections/UserCollection";
 
 
const express = require('express') 
const router:Router = express.Router()
 
router.post('/signup',SignUp)
router.post('/login',Login)
router.post('/ChangePassword',ChangePass)

module.exports = router; 