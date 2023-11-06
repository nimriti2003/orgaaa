const { product } = require('../models/productModel');

/*
module.exports.addProduct = async (req, res) => {
  const product = await Product.findOne({
    productid: req.body.productid
  });
  if (product) return res.status(400).send("Product already exists!");
  const result = await product.save();
  
  
  return res.status(200).send("Product Saved successfully!");
}
*/

// Function to add a product to the database
const addProduct = async (req, res) => {
  try {
    const newProductData = req.body; // Assuming the product data is in the request body

    const existingProduct = await product.findOne({ productid: newProductData.productid });

    if (existingProduct) {
      return res.status(400).json({ success: false, message: 'Product with the same productID already exists.' });
    }

    const createdProduct = await product.create(newProductData);

    return res.status(201).json({ success: true, message: 'Product added successfully', data: createdProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'An error occurred while adding the product.', error });
  }
};

const getallProduct = async (req, res) => {
  try {
    const allProducts = await product.find();

    return res.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'An error occurred while fetching products.', error });
  }
};

//product ID to be passed as a route parameter (e.g., /products/:id)
// Function to get a product by its ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter

    const foundProduct = await product.findOne({ productid: productId });

    if (foundProduct) {
      return res.status(200).json({ success: true, data: foundProduct });
    } else {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'An error occurred while fetching the product.', error });
  }
};

// Function to update a product by its ID
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter
    const updatedProductData = req.body; // Assuming the updated product data is sent in the request body

    const updatedProduct = await product.findOneAndUpdate({ productid: productId }, updatedProductData, { new: true });

    if (updatedProduct) {
      return res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } else {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'An error occurred while updating the product.', error });
  }
};



module.exports = {
  addProduct, getallProduct,getProductById, updateProduct
};