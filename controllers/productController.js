const Product = require("../models/Product");

// Fetch all products
const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 

  const offset = (page - 1) * limit;

  try {
    // Fetch paginated products
    const products = await Product.findAll({
      limit: parseInt(limit, 10), 
      offset: parseInt(offset, 10) 
    });

    // Fetch total count of products
    const totalProducts = await Product.count();

    res.status(200).json({
      status: "success",
      data: products,
      pagination: {
        totalItems: totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: parseInt(page, 10),
        itemsPerPage: parseInt(limit, 10)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Fetch a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Add a new product (admin only)
const addProduct = async (req, res) => {
  const { name, description, price, stockQuantity, category } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      stockQuantity,
      category,
    });
    res.status(201).json({
      status: "success",
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update an existing product by ID (admin only)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stockQuantity, category } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    await product.update({ name, description, price, stockQuantity, category });
    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete a product by ID (admin only)
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    await product.destroy();
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
