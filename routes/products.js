const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')



router.get('/', productController.homepage);
router.get('/new', productController.newProduct);
router.post('/new', productController.postProduct);



module.exports = router;