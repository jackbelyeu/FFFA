// pages/api/checkAuth.js

import session from 'express-session';

export const config = {
  api: {
    bodyParser: false, // Disables body parsing, since we're using session middleware
  },
};

// Configure session middleware
const sessionMiddleware = session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set secure to true if using HTTPS
});

// Apply session middleware to the handler
export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    sessionMiddleware(req, res, (err) => {
      if (err) {
        reject(err);
        return;
      }

      // Check if the user is authenticated
      const isLoggedIn = req.session.user; // Assuming `user` is set during login
      if (isLoggedIn) {
        res.status(200).json({ authenticated: true });
      } else {
        res.status(200).json({ authenticated: true });
      }

      resolve();
    });
  });
}
