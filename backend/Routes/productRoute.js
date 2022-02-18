const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct } = require('../Controllers/productControllers');
const {isAuthUser, authRoles} = require('../Middleware/auth');
const router = express.Router();
router.route('/products').get(getAllProducts);
router.route('/product/new').post(isAuthUser,authRoles("admin"), createProduct);
router.route('/product/:id').put(isAuthUser,authRoles("admin"), updateProduct).delete(isAuthUser,authRoles("admin"), deleteProduct).get(getProduct);


module.exports = router;