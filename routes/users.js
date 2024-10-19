const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../validation.js')
const { isAuthenticated } = require("../middleware/authenticate")

const userController = require('../controllers/users');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', isAuthenticated, userValidationRules(), validate, userController.createUser);
router.put('/:id', isAuthenticated, userValidationRules(), validate, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;