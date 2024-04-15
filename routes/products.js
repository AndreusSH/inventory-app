const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')



router.get('/', productController.homepage);
router.get('/new', productController.newProduct);
router.post('/new', productController.postProduct);
router.get('/products', productController.getProducts);
router.get('/view/:id', productController.viewProduct);
router.get('/edit/:id', productController.editProduct);
router.post('/edit/:id', productController.updateProduct);
router.get('/delete/:id', productController.deleteProductPage);
router.post('/delete/:id', productController.deleteProduct);








module.exports = router;