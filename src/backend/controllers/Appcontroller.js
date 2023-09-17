const { validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const skillController = require('../controllers/SkillController');
const logger = require('../utils/logger');

const auth = require('../middleware/auth'); // Import auth.js
//TODO: [AP-101] SkillController
const addUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await userController.createUser(req.body);
    if (result.status === 201) {
      return res.status(201).json(result);
    } else {
      return res.status(result.status).json(result);
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};

const Login = async (req, res) => {
  try {
    logger.info('Login request in userController');
    logger.info('request body', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await userController.login(req.body.email, req.body.password);
    logger.info('Login result');
    logger.info('Result', result);

    if (result.status === 200) {
      logger.info('Login success');
      logger.info('result', result);
      logger.info('result data', result.data);
      logger.info('Creating token');
      const token = auth.createToken(result.data);
      logger.info('Token created');
      logger.info(token);
      return res.status(200).json({ ...result, token });
    } else {
      logger.info('Login failed');
      logger.info(result);
      return res.status(result.status).json(result);
    }
  } catch (err) {
    logger.error('Login error');
    logger.error(err);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  try {
    // User data is available in req.user due to the `authenticateUser` middleware
    const user = req.user;
    // Fetch the user profile based on the user data
    const userProfile = await userController.findUserByEmail(user.email);
    if (userProfile) {
      // Return the user profile as JSON
      return res.status(200).json(userProfile);
    } else {
      return res.status(404).json({ message: 'User profile not found' });
    }
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a user profile
const updateUser = async (req, res) => {
  try {
    userEmail = req.user.email;
    user = await userController.findUserByEmail(userEmail);
    // logger.info('Old user', user);
    newUser = await userController.updateUserProfile(userEmail, req.body)
    // logger.info('new User', newUser);
    return res.status(200).json(newUser);
  } catch(error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
const addSkill = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await skillController.createSkill(req.body);
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};

const getSkill = async (req, res) => {
  try {
    const result = await skillController.getSkill(req.params.id);
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};

const updateSkill = async (req, res) => {
  try {
    const result = await skillController.updateSkill(req.params.id, req.body);
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const result = await skillController.deleteSkill(req.params.id);
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};

module.exports = {
  addUser,
  Login,
  getUser,
  updateUser,
  addSkill,
  getSkill,
  updateSkill,
  deleteSkill
};