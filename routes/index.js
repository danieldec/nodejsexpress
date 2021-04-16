'use strict'
const express = require('express');
const api = express.Router();
const ProductoController = require('../controllers/product');
const auth = require('../middlewares/auth')
const userCtrl = require('../controllers/user');
api.get('/products',ProductoController.getProducts);

api.get('/products/:productId',ProductoController.getProduct);

api.post('/products',auth,ProductoController.insertProduct);

api.put('/products/:productId',auth,ProductoController.updateProduct);

api.delete('/products/:productId',auth,ProductoController.deleteProduct);

api.get('/private',auth,function (req,res) {
    res.status(200).send({
        message: `Tienes Acceso`
    });
});

api.post('/signup',userCtrl.signUp);
api.post('/singin',userCtrl.signIn);

module.exports = api;