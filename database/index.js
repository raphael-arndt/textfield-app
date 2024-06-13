const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define API routes
app.post('/data', (req, res) => {
    const data = JSON.stringify(req.body);
    db.run("INSERT INTO data (data) VALUES (?)", [data], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send({ id: this.lastID, data: req.body.data });
    });
});

app.get('/data', (req, res) => {
    db.all("SELECT * FROM data", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        // Deserialize JSON string back to JavaScript object
        const parsedRows = rows.map(row => ({
            id: row.id,
            data: JSON.parse(row.data)
        }));
        res.status(200).send(parsedRows);
    });
});

app.delete('/data', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM data", function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send({ message: 'Record deleted', id });
    });
});

    app.post('/favorites', (req, res) => {
    // const { dataId, name } = req.body;
    const { data, name } = req.body;
    db.run("INSERT INTO favorites (data, name) VALUES (?, ?)", [data, name], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send({ id: this.lastID, data: data, name: name });
    });
});

app.get('/favorites', (req, res) => {
    db.all("SELECT * FROM favorites", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        const parsedRows = rows.map(row => ({
            id: row.id,
            data: row.data,
            name: row.name
        }));
        res.status(200).send(parsedRows);
    });
});

app.delete('/favorites', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM favorites", function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send({ message: 'Favorite deleted', id });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
