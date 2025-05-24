const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userService = require('../services/user.service');
const { use } = require('../routes/user.routes');

exports.createUser = async (req, res) => {
    const { username, password, role_id } = req.body;
    console.log('username', username);
    console.log('username', password);
    console.log('username', role_id);
    if (!username || !password || !role_id) {
        console.log('username', username);
        console.log('username', password);
        console.log('username', role_id);

        return res.status(400).json({ message: 'All fields are required: username, password, and role_id' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userService.createUser(username, hashedPassword, role_id);

        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId,
            status: true
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error while creating user', error: error.message });
    }
};

exports.verifyUser = async (req, res) => {
    const { username, password } = req.body;
    console.log('username', username);
    console.log('password', password);
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const users = await userService.verifyUser(username);
        console.log('users', users);
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('isPasswordValid', isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role_id },
            process.env.SECRET_KEY
        );
        console.log('token', token);

        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            message: 'Login successful',
            user: userWithoutPassword,
            status: true,
            token: token,
            roleId: user.role_id
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error while verifying user', error: error.message });
    }

};
