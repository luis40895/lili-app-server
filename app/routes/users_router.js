'use strict';

var express = require('express');
var User        = require('./../models/user');

var users_router = express.Router();

// on routes that end in /users
// ----------------------------------------------------
users_router.route('/')

// create a user (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {

        var user = new User();      // create a new instance of the User model
        user.password = req.body.password;
        user.email = req.body.email;
        user.username = req.body.username;

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json(user);
        });

    })

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

// on routes that end in /users/:user_id
// ----------------------------------------------------
users_router.route('/:user_id')

// get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        })
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.password = req.body.password;
            user.email = req.body.email;
            user.username = req.body.username;

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json(user);
            });

        });
    })

    // update the user with this id (accessed at PATCH http://localhost:8080/api/users/:user_id)
    .patch(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            for(var key in req.body) {
                if(req.body.hasOwnProperty(key)){
                    user[key] = req.body[key];
                }
            }

            if (err)
                res.send(err);

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json(user);
            });

        });
    })

    // delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err) {
            if (err)
                res.send(err);

            res.json(req.params.user_id);
        });
    });

module.exports = users_router;