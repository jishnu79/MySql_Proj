import { Router } from "express";
import { Login, SignUp } from "../Collections/UserCollection";

 
const express = require('express')
const router:Router = express.Router()

router.post('/signup',SignUp)
router.post('/login',Login)

module.exports = router; 