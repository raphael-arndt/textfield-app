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
    const { data } = req.body;
    db.run("INSERT INTO data (data) VALUES (?)", [data], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send({ id: this.lastID, data });
    });
});

app.get('/data', (req, res) => {
    db.all("SELECT * FROM data", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send(rows);
    });
});

app.delete('/data/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM data WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send({ message: 'Record deleted', id });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});