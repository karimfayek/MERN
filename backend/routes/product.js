const express = require('express')
const { careateproduct, getproduct, getproducts ,deleteproduct, updateproduct } = require('../controllers/productController')


const router = express.Router()

// GET all Products
router.get('/', getproducts)

// GET a single workout
router.get('/:id', getproduct)

// POST a new product
router.post('/', careateproduct)

// DELETE a product
router.delete('/:id', deleteproduct)

// UPDATE a product
router.patch('/:id', updateproduct)

module.exports = router