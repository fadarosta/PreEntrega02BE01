const express = require('express');
const router = express.Router();
const productsRouter = require('./products.router.js');

router.use('/products', productsRouter);
router.use('/carts.router', cartsRouter);

module.exports = router;

