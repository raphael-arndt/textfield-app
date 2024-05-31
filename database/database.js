const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE data (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)");
});

module.exports = db;