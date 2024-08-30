import express from 'express';
import passport from '../config/googleAuth.js'; // Adjust the path as needed

const router = express.Router();

// Initiate Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google authentication callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to home page or another page.
    res.redirect('/dashboard');
  }
);

export default router;
