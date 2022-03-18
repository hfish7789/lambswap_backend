const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lambswap_app"
});

db.connect(function (err) {
    if (err) throw err;
});

module.exports = db;