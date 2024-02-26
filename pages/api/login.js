// pages/api/login.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  // Perform authentication logic here
  if (username === 'admin' && password === 'password') {
    // If authentication succeeds, return a success message
    return res.status(200).json({ message: 'Login successful' });
  } else {
    // If authentication fails, return an error message
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}
