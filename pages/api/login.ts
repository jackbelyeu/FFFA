// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Backend route for handling login
app.post('/api/login', (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;
  
  // Hardcoded username and password (replace with your own)
  const hardcodedUsername = 'exampleUser';
  const hardcodedPassword = 'examplePassword';
  
  // Check if provided credentials match hardcoded values
  if (username === hardcodedUsername && password === hardcodedPassword) {
    // Generate authentication token or session (e.g., JWT)
    const authToken = generateAuthToken(username);
    
    // Send the authentication token as response
    res.status(200).json({ authToken });
  } else {
    // If credentials don't match, return authentication error
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Function to generate authentication token (dummy implementation)
function generateAuthToken(username) {
  return `dummyToken_${username}`;
}

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
