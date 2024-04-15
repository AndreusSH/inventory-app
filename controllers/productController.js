const Product = require('../models/products.model')
const mongoose = require('mongoose')

exports.homepage = async (req, res) => {
  const messages = await req.flash('info')
  const locals = {
    title: 'Nodejs',
    description: 'Inventory Management system'
  }
  res.render('home', { messages, locals })
}

exports.newProduct = async (req, res) => {
  console.log('Current URL:', req.url)
  const locals = {
    title: 'Nodejs',
    description: 'Inventory Management system'
  }
  res.render('products/newProduct', { locals })
}

exports.postProduct = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    image: req.body.image
  })
  try {
    await Product.create(newProduct)
    await req.flash('info', 'Flash Message Added')
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

exports.getProducts = async (req, res) => {
  const products = await Product.find({})
  console.log(products)
  products.forEach(element => {
    console.log(element.name)
  });
  res.render('products', { products })
}


exports.viewProduct = async(req,res)=>{
  try {
    const product = await Product.findOne({ _id: req.params.id})
    res.render('view', {product})
  } catch (error) {
    console.log(error)
  }
}


exports.editProduct = async(req,res)=>{
  try {
    const product = await Product.findOne({ _id: req.params.id})
    res.render('edit', {product})
  } catch (error) {
    console.log(error)
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, quantity, price } = req.body;

    // Find the product by ID and update its fields
    await Product.findByIdAndUpdate(productId, { name, quantity, price });

    // Redirect to the product view page or any other desired page after successful update
    res.redirect(`/view/${productId}`);
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    res.status(500).send('Internal Server Error');
  }
};


exports.deleteProductPage = async(req,res)=>{
  console.log("trying to delete a product")
  try {
    const product = await Product.findOne({ _id: req.params.id})
    res.render('delete', {product});
    } catch (error) {
    console.log(error)
  }
}

exports.deleteProduct = async(req,res)=>{
  try {
    await Product.deleteOne({ _id: req.params.id });
    // Flash a success message
    req.flash('success', 'Product deleted successfully');
    res.redirect('/');
    } catch (error) {
    console.log(error)
  }
}

