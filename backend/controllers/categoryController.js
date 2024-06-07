const { Category } = require('../models/categoryModel');
const Product = require('../models/productModel');

async function getcategory(req, res) {
  try {
    const category = await Category.findById(req.params.id).populate('products');
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get all categorys 
const getcategories = async (req , res) => {
    const categorys = await Category.find({}).sort({createdAt : -1}).populate('products');
   //const categorys = await category.find().populate('categories');
  
    res.status(200).json(categorys)
}

//create 
const careatecategory = async (req , res) => {
    console.log(req.body)
    const {catTitle} = req.body
  
    try {
      const category = await Category.create({name:catTitle})
      res.status(200).json(category)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}
//update  single worlout 
const updatecategory = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: 'not valid id' })
  }
  const category = await Category.findOneAndUpdate({ _id: id }, {
    ...req.body
  })
  if (!category) {
    return res.status(404).json({ error: 'No such category' })
  }
  res.status(200).json(category)
}
//delete  single worlout 
const deletecategory = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: 'not valid id' })
  }
  const category = await Category.findOneAndDelete({ _id: id })
  if (!category) {
    return res.status(404).json({ error: 'No such category' })
  }
  res.status(200).json(category)
}



module.exports = {
  getcategory,
  getcategories,
  careatecategory,
  deletecategory,
  updatecategory
}