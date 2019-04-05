const Sequelize = require("sequelize");
const db = require('../config/sqlite').db
const bcrypt = require('bcrypt')

const User = db.define("user", {
    username: {
        type: Sequelize.STRING
        // allowNull: false
    },
    email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    password: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    type: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    favourite_book: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    favourite_genre: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    num_books_read: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    read_time: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
});



module.exports = {
    user: User
};