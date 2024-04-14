const Product = require('../models/products.model');
const mongoose = require('mongoose');


exports.homepage = async (req, res) => {
  const messages = await req.flash('info')
  const locals = {
    title: 'Nodejs',
    description: 'Inventory Management system'
  };
  res.render('home', { messages, locals });
};


exports.newProduct = async (req, res) => {
  console.log('Current URL:', req.url);
  const locals = {
    title: 'Nodejs',
    description: 'Inventory Management system'
  }
  res.render('products/newProduct', { locals })
}

exports.postProduct = async (req, res) => {
  const newProduct = new Product({
    name : req.body.name,
    quantity: req.body.quantity,
    price: req.body.price
  });
  try {
    await Product.create(newProduct);
    await req.flash('info', 'Flash Message Added');
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }

}
