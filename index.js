'use strict'


const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded());

app.get('/api/products',(req,res)=>{
    res.send(200,{products:[]});
});

app.get('/api/products/:productId',(req,res)=>{
    let productId = req.params.productId;
    Product.findById(productId,(err,product)=>{
        if (err) {
            return res.status(500).send({message: `Error al realizar la petición: ${err}`});
        }else{
            if (!product) {
                return res.status(400).send({message: `El producto no existe`});
            }else{
                res.status(200).send(product);
            }
        }
    });
});

app.post('/api/products',(req,res)=>{
    console.log(`POST /api/product`);
    console.log(req.body);

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;
    product.save((err,productoStored)=>{
        if (err) {
            res.status(500).send({message: `Error al salver en la base de datos ${err}`})
        }else{
            res.status(200).send({product:productoStored});
        }
    });
});


app.put('/api/products/:productId',(req,res)=>{
    
});

app.delete('/api/products/:productId',(req,res)=>{
    
});

mongoose.connect('mongodb://localhost:27017/shop',(err,res)=>{
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`);
    }else{
        console.log('conexión a la base de datos establecida');
    }
    app.listen(port,()=>{
        console.log(`API REST corriendo en http://localhost:${port}`);
    });
});