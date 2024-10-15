// routes/productRoutes.js
const express = require('express');
const Product = require('../Models/Product');
const router = express.Router();

// POST: Add a new product
const addProduct = async (req, res) => {

    const { name, description, category, price, material, color, stock, image,care,disclaimer,work, package,saleprice } = req.body;

    const newProduct = new Product({
        name,
        description,
        category,
        price,
        saleprice,
        material,
        color,
        stock,
        image,
        care,
        disclaimer,
        work,
        package
    });

    try {   
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


const updateproduct = async (req, res) => {
    const { id } = req.params;
  const updatedProduct = req.body;

  try {
    // Assuming you have a MongoDB or similar setup
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// GET: Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
  addProduct,
  getProducts,
  updateproduct
};