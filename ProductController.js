const Product = require('../models/Product');


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const { name, price, vendorId } = req.body;
    const newProduct = new Product({ name, price, vendorId });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
