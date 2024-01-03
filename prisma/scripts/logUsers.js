import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('../dev.db');

let sql = 'SELECT * FROM User ORDER BY id'

db.serialize( function() {
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        })
    })
})