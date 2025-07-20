const express = require('express');
const path = require('path');
const cors = require('cors'); // <-- Import cors

const app = express();
const PORT = 3000;

// Enable CORS for all incoming requests
app.use(cors());

// Parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Default route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
