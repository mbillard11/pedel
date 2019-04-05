const Sequelize = require("sequelize");
const db = new Sequelize({
    dialect: "sqlite",
    storage: "./db/users.db"
});
module.exports = {
    db: db,
    sqliteConnect: () => {
        db.authenticate()
            .then(() => {
                console.log("Connection has been established successfully.");
            })
            .catch(err => {
                console.error("Unable to connect to the database:", err);
            });

  }
};

