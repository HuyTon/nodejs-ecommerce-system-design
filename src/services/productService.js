const Product = require("../models/Product");

// Create a new product
async function createProduct(productData) {
  try {
    const product = new Product(productData);
    await product.save();
    console.log("Product created successfully");
    return product;
  } catch (err) {
    console.error("Error creating product:", err);
  }
}

// Get all products
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

// Get product by ID
async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    return null;
  }
}

// Update product
async function updateProduct(productId, updateData) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });
    console.log("Product updated successfully");
    return product;
  } catch (err) {
    console.error("Error updating product:", err);
    return null;
  }
}

// Delete product
async function deleteProduct(productId) {
  try {
    await Product.findByIdAndDelete(productId);
    console.log("Product deleted successfully");
  } catch (err) {
    console.error("Error deleting product:", err);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
