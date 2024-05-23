const mongoose = require('mongoose');
const Product = require('../models/productModel')

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