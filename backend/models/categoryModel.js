const mongoose = require('mongoose');
const Product = require('../models/productModel')



const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    answers: [{ type: String, required: true }],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    questions:[QuestionSchema]
});
const Question = mongoose.model('Question', QuestionSchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = { Category, Question };