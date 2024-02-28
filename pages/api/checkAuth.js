import session from 'express-session';

export const config = {
  api: {
    bodyParser: false,
  },
};

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
});

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
        res.status(401).json({ authenticated: false });
      }

      resolve();
    });
  });
}