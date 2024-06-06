const express = require('express')
const { careatecategory, getcategory, getcategories ,deletecategory, updatecategory } = require('../controllers/categoryController')


const router = express.Router()

// GET all categorys
router.get('/', getcategories)


// GET a single workout
router.get('/:id', getcategory)

// POST a new category
router.post('/', careatecategory)

// DELETE a category
router.delete('/:id', deletecategory)

// UPDATE a category
router.patch('/:id', updatecategory)

module.exports = router