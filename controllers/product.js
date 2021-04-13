'use strict'

const Product = require('../models/products');

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(500).send(
                {
                    message: `Error al realizar la petición: ${err}`
                });
        } else {
            if (!products) {
                return res.status(404).send({
                    message: `No existen productos`
                });
            } else {
                res.status(200).send({ products });
            }
        }
    });
}

function getProduct(req, res) {
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) {
            return res.status(500).send(
                {
                    message: `Error al realizar la petición: ${err}`
                });
        } else {
            if (!product) {
                return res.status(400).send(
                    {
                        message: `El producto no existe`
                    });
            } else {
                res.status(200).send(product);
            }
        }
    });
}

function insertProduct(req, resid) {
    console.log(`POST /api/product`);
    console.log(req.body);

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;
    product.save((err, productoStored) => {
        if (err) {
            res.status(500).send({ message: `Error al salver en la base de datos ${err}` })
        } else {
            res.status(200).send({ product: productoStored });
        }
    });
}

function updateProduct(req, resid) {
    let productId = req.params.productId;
    let update = req.body;

    Product.findOneAndUpdate(productId, update, (err, productUpdate) => {
        if (err) {
            res.status(500).send(
                {
                    message: `Error al actualizar el producto ${err}`
                });
        } else {
            res.status(200).send({ productUpdate });
        }
    });
}

function deleteProduct(id) {
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) {
            res.status(500).send({ message: `Error al borrar el producto ${err}` })
        } else {
            product.remove(err => {
                if (err) {
                    res.status(500).send({ message: `Error al borrar el producto ${err}` })
                } else {
                    res.status(200).send({ message: `El producto ha sido eliminado` });
                }
            });
        }
    });
}

module.exports = {
    getProducts,
    getProduct,
    insertProduct,
    updateProduct,
    deleteProduct
}