import { addCatogery } from "../Collections/UserCollection";
import { Router } from "express"; 
 
 
const express = require('express') 
const router:Router = express.Router()
 
router.post('/adCatogery',addCatogery)

module.exports = router; 