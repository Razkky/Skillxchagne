const express = require('express');
const { getMatchingUsers,addUser, Login, getUser, updateUser, addSkill, getSkill, updateSkill, deleteSkill } = require('../controllers/Appcontroller');
const { authenticateUser } = require('../middleware/auth');
const { body } = require('express-validator');
const logger = require('../utils/logger');

const router = express.Router();

// User-related routes
router.post('/api/signup', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('profile.fullName').notEmpty().withMessage('Full name is required'),
], addUser);

router.post('/api/login', [
    body('email').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
], Login);

router.put('/api/user/update', authenticateUser, updateUser);
router.get('/api/user/', authenticateUser, getUser);
router.get('/api/matches', authenticateUser,getMatchingUsers);
module.exports = router;
