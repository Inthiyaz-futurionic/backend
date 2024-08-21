import bcrypt from 'bcryptjs';
import { User } from '../../../config/database.js';

export const createUser = async (username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        return newUser;
    } catch (error) {
        throw new Error('Failed to create user');
    }
};

export const comparePassword = async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
};

export const updateUser = async (id, username, password) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.username = username;
            user.password = password;
            await user.save();
            return user;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

export const getUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            return user;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};

export const getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ where: { username } });
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user by username');
    }
};


export const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return { message: 'User deleted successfully' };
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error('Failed to delete user');
    }
};
