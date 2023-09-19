const express = require('express');
const { addUser, Login, getUser, updateUser, addSkill, getSkill, updateSkill, deleteSkill } = require('../controllers/Appcontroller');
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
logger.info('User-related routes registered');
router.get('/api/user/', authenticateUser, getUser);
logger.info('User-related routes registered');

// // Skill-related routes
// router.post('/api/skill/add', authenticateUser, [
//     body('name').notEmpty().withMessage('Skill name is required'),
//     body('category').notEmpty().withMessage('Category is required'),
// ], addSkill);

// router.get('/api/skill/:id', authenticateUser, getSkill);
// router.put('/api/skill/:id/update', authenticateUser, updateSkill);
// router.delete('/api/skill/:id/delete', authenticateUser, deleteSkill);

module.exports = router;
