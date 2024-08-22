import express from 'express';
import passport from 'passport';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';
import { createUserSchema, updateUserSchema } from '../validation/userValidation.js';
import { validateRequest } from '../../../middleware/validateRequest.js';

const router = express.Router();

// Public route: Login user using Passport.js
router.post('/login', passport.authenticate('local', { session: true }), (req, res) => {
    res.json({ message: 'Logged in successfully', user: req.user });
});

// Public route: Create new user
router.post('/', validateRequest(createUserSchema), createUser);

// Protected route: Get all users
router.get('/', passport.authenticate('jwt', { session: false }), getUsers);

// Protected route: Get user by ID
router.get('/:id', passport.authenticate('jwt', { session: false }), getUserById);

// Protected route: Update user by ID
router.put('/:id', passport.authenticate('jwt', { session: false }), validateRequest(updateUserSchema), updateUser);

// Protected route: Delete user by ID
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

export default router;
