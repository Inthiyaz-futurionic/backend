import jwt from 'jsonwebtoken';
import * as userService from '../services/userService.js';
import { createUserSchema, updateUserSchema } from '../validation/userValidation.js';

export const createUser = async (req, res) => {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = value;

    try {
        const newUser = await userService.createUser(username, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Failed to create user:", error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userService.getUserByUsername(username);

        if (!user || !(await userService.comparePassword(password, user.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.json({
            accessToken,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateUser = async (req, res) => {
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;
    const { username, password } = value;

    try {
        const updatedUser = await userService.updateUser(id, username, password);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUser(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
