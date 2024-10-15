const express = require('express');
const app = express();
const PORT = 8000;

// Middleware to parse JSON requests
app.use(express.json());

// Example of a simple GET route
app.get('/', (req, res) => {
  res.send('Welcome to suwar Backend');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
