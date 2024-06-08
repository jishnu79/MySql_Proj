import { addCatogery, getCatogery, updatCatogery } from "../Collections/UserCollection";
import { Router } from "express"; 
 
 
const express = require('express') 
const router:Router = express.Router() 
 
router.post('/adCatogery',addCatogery)
router.get('/getCatogery',getCatogery)
router.put('/updateCatogery',updatCatogery)

module.exports = router; 