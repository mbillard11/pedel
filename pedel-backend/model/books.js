const Sequelize = require("sequelize");
const db = require('../config/sqlite').db

const Book = db.define("book", {
    title: {
        type: Sequelize.STRING
        // allowNull: false
    },
    description: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    html: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
});


module.exports = {
    book: Book
};