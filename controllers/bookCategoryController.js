const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        message: 'Categories fetched successfully',
        categories: categories
    });
}

exports.getCategory = async (req, res) => {
    const getCategory = req.params.id;
    const category = await Category.findById(getCategory);
    res.status(200).json({
        message: 'Category fetched successfully',
        category: category
    });
}

exports.addCategory = async (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({
        name
    });
    await newCategory.save();

    res.status(201).json({
        message: 'Category added successfully',
        category: newCategory
    });
}

exports.updateCategory = async (req, res) => {
    const updateCategory = req.params.id;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(updateCategory, { name });
    res.status(200).json({
        message: 'Category updated successfully',
        category: category
    });
}