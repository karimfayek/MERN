const mongoose = require('mongoose');
const Product = require('../models/productModel')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    products: [
        { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Product' 
        }
    ],
    children: [
        { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Category' , 
             featured: {
                type: Boolean,
            },
        }
    ]
  });
  
  module.exports = mongoose.model('Category', categorySchema);