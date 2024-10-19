const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator')

const getAll = async (req, res) => {
    //#swagger.tags=["Users"]
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
    .catch((err) => {
        console.log(err)
    });

};
const getSingle = async (req, res) => {
    //#swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
    .catch((err) => {
        console.log(err)
    });
};

const createUser = async (req, res) => {
    //#swagger.tags=["Users"]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        role: req.body.role
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user)
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while creating user')
    }
}

const updateUser = async (req, res) => {
    //#swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id)
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        role: req.body.role
    };
    

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user)
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while updating user')
    }

   
    
}

const deleteUser = async (req, res) => {
    //#swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id)

    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else if (userId = null) {
        res.status(500).json(response.error || 'No userId provided')
    }
    else {
        res.status(500).json(response.error || 'Error occurred while deleting user')
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};