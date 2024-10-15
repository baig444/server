// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String},
    category: { type: String},
    price: { type: Number},
    saleprice: {type: Number},
    material: { type: String },
    color: { type: String },
    work: { type: String },
    package: { type: String },
    care: { type: String },
    disclaimer: { type: String },
    stock: { type: Number }, // Added stock field
    image: { type: String},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
