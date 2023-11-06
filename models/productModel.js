const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});


module.exports.product = model('Product', productSchema);