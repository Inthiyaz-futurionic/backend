import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
} from '../controllers/userController.js';
import { createUserSchema, updateUserSchema } from '../validation/userValidation.js';
import { validateRequest } from '../../../middleware/validateRequest.js';
import { authenticateJWT } from '../../../middleware/authMiddleware.js';

const router = express.Router();

// Public route: Login user
router.post('/login', loginUser);

// Public route: Create new user
router.post('/', validateRequest(createUserSchema), createUser);

// Protected route: Get all users
router.get('/', authenticateJWT, getUsers);

// Protected route: Get user by ID
router.get('/:id', authenticateJWT, getUserById);

// Protected route: Update user by ID
router.put('/:id', authenticateJWT, validateRequest(updateUserSchema), updateUser);

// Protected route: Delete user by ID
router.delete('/:id', authenticateJWT, deleteUser);

export default router;
