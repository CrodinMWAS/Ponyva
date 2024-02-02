const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// POST route to handle answers from the client
app.post('/answers', (req, res) => {
  const answers = req.body;
  // Process the answers as needed (e.g., store in a database, perform further actions)
  console.log('Received answers from client:', answers);
  res.json({ message: 'Answers received successfully!' });
});

// Catch-all route to serve the HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
