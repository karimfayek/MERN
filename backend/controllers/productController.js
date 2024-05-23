const Product = require('../models/productModel')
const Category = require('../models/categoryModel');
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');
//get single worlout 
const getproduct = async (req , res) =>{
    
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'not valid id'})
    }
    const product = await Product.findById(id)
    if(!product){
        return res.status(404).json({error: 'No such product'})
    }else{
        
        res.status(200).json(product)
    }
}

// get all products 
const getproducts = async (req , res) =>{
    const products = await Product.find({}).sort({createdAt : -1}).populate('categories')
   //const products = await Product.find().populate('categories');
    res.status(200).json(products)
}

//create 
const careateproduct = async (req , res) => {
    
    const {title, price, description  , categories } = req.body
    console.log(categories)
    const categoryIds = categories.map(categoryId => new mongoose.Types.ObjectId(categoryId)); 
    try {
        let imageUrl = '';
    if (req.file) {
      imageUrl = `http://localhost:3000/${req.file.path}`;
    }

    const product = await Product.create({ title, price, description, images: [imageUrl], categories: categoryIds });

      for (const categoryId of categoryIds) {
        await Category.findByIdAndUpdate(categoryId, { $push: { products: product._id } });
      }
      res.status(200).json(product)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}
//update  single worlout 
const updateproduct = async (req , res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'not valid id'})
    }
    const product = await Product.findOneAndUpdate({_id: id } , {
        ...req.body
    })
    if(!product){
        return res.status(404).json({error: 'No such product'})
    }
    res.status(200).json(product)
}
//delete  single worlout 
const deleteproduct = async (req , res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: 'not valid id'})
    }
    const product = await Product.findOneAndDelete({_id: id})
    if(!product){
        return res.status(404).json({error: 'No such product'})
    }
    res.status(200).json(product)
}



module.exports ={
    getproduct,
    getproducts,
    careateproduct,
    deleteproduct,
    updateproduct
}