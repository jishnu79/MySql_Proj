import { Router } from "express";
import { SignUp } from "../Collections/UserCollection";


const express = require('express')
const router:Router = express.Router()

router.post('/signup',SignUp)

module.exports = router; 