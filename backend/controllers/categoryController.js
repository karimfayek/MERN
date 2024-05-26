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
const getcategories = async (req, res) => {
  try {
    const categories = await Category.find({ parentId: null })
      .populate({
        path: 'questions'
      })
      .populate({
        path: 'children',
        populate: { path: 'questions' }
      })
      .populate('parentId');

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

//create 
const careatecategory = async (req, res) => {
  const { name, parentId, questions } = req.body;

  try {
    const newCategory = new Category({ name, parentId, questions });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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