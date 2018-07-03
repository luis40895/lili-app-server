'use strict';

var User        = require('./app/models/user');

function createUsers(db) {
    User.find(function (err,user) {
        if(user.length == 0){
            console.log("DB collection Users empty");
            var user = new User({"_id":"58e9ead759c07c4b0b1bae88","username" : "Luis", "email":"luis@gmail.com","password":"password"});
            user.save();
            console.log("DB collection Users Create");
        }
    })

}


module.exports = {
    createUsers: createUsers,
};