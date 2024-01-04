import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('../dev.db');

let sql = 'SELECT name FROM sqlite_master WHERE type="table"'

db.serialize(function () {
    db.all(sql, function (err, table) {
        console.log(table)
    })
})

