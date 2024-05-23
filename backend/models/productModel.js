const mongoose = require('mongoose')
const Category = require('../models/categoryModel')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            require: true
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)