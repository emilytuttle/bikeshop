const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator')

const getAll = async (req, res) => {
    //#swagger.tags=["Products"]
    const result = await mongodb.getDatabase().db().collection('products').find();
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    })
    .catch((err) => {
        console.log(err)
    });

};
const getSingle = async (req, res) => {
    //#swagger.tags=["Products"]
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('products').find({_id: productId});
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products[0]);
    })
    .catch((err) => {
        console.log(err)
    });
};

const createProduct = async (req, res) => {
    //#swagger.tags=["Products"]
    const product = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        role: req.body.role
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product)
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while creating product')
    }
}

const updateProduct = async (req, res) => {
    //#swagger.tags=["Products"]
    const productId = new ObjectId(req.params.id)
    const product = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        role: req.body.role
    };
    

    const response = await mongodb.getDatabase().db().collection('products').replaceOne({_id: productId}, product)
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while updating product')
    }

   
    
}

const deleteProduct = async (req, res) => {
    //#swagger.tags=["Products"]
    const productId = new ObjectId(req.params.id)

    const response = await mongodb.getDatabase().db().collection('products').deleteOne({_id: productId});
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else if (productId = null) {
        res.status(500).json(response.error || 'No productId provided')
    }
    else {
        res.status(500).json(response.error || 'Error occurred while deleting product')
    }
}

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};