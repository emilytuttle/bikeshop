const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../validation.js')
const { isAuthenticated } = require("../middleware/authenticate")

const productController = require('../controllers/products');

router.get('/', productController.getAll);

router.get('/:id', productController.getSingle);

router.post('/', isAuthenticated, userValidationRules(), validate, productController.createProduct);
router.put('/:id', isAuthenticated, userValidationRules(), validate, productController.updateProduct);
router.delete('/:id', isAuthenticated, productController.deleteProduct);

module.exports = router;