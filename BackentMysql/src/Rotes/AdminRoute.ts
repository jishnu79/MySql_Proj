import { addCatogery, addProduct, AllUser, deletePro, getByCategory, getById, getCatogery, getProduct, proStatus, updatCatogery, updatePro, UpdateUserStatus } from "../Collections/AdminCollection";
import { Router } from "express"; 
 
 
const express = require('express') 
const router:Router = express.Router() 
 
router.post('/allUsers',AllUser)
router.post('/adCatogery',addCatogery)
router.get('/getCatogery',getCatogery)
router.put('/updateCatogery',updatCatogery)
router.post('/updateUserStatus',UpdateUserStatus)
router.post('/addProduct',addProduct)
router.get('/getProduct',getProduct)
router.get('/getByCategory/:id',getByCategory)
router.get('/getById/:id',getById)
router.put('/updateProduct',updatePro)
router.delete('/deleteProduct',deletePro)
router.put('/updateProductstatus',proStatus)

module.exports = router; 