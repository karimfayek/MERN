const mongoose = require('mongoose');
const Product = require('../models/productModel')



const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    answers: [{ type: String, required: true }],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    products: [
        { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Product' 
        }
    ]
  });
  
  module.exports = mongoose.model('Category', categorySchema);