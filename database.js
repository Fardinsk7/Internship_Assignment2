const sqlite = require('sqlite3');
const dbName = 'myDb.db';
require('dotenv').config();


let db = new sqlite.Database(dbName, (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Connected to the Sqlite Database");
        db.run(`CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            otp TEXT,
            expires_at DATETIME ,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`, (err) => {
            if (err) {
                console.error(err.message);
            }
        })
    }
})

module.exports = db;