'use strict'
const express = require('express');
const api = express.Router();
const ProductoController = require('../controllers/product');

api.get('/products',ProductoController.getProducts);

api.get('/products/:productId',ProductoController.getProduct);

api.post('/products',ProductoController.insertProduct);

api.put('/products/:productId',ProductoController.updateProduct);

api.delete('/products/:productId',ProductoController.deleteProduct);

module.exports = api;