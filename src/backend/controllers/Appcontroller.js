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
    logger.info('User', user);
    // Fetch the user profile based on the user data
    const userProfile = await userController.findUserByEmail(user.email);
    if (userProfile) {
      logger.info('User profile', userProfile);
      // Return the user profile as JSON
      return res.status(200).json(userProfile);
    } else {
      logger.info('User profile not found');
      return res.status(404).json({ message: 'User profile not found' });
    }
  } catch (err) {
    logger.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getMatchingUsers = async (req, res) => {
  logger.info('Get matching users request in userController');
  try {
    logger.info('Get matching users request in userController');
    // User data is available in req.user due to the `authenticateUser` middleware
    logger.info('User', req.user);
    const user = req.user;
    logger.info('User', user);
    const userProfile = await userController.findUserByEmail(user.email);
    logger.info('User profile', userProfile);
    if (!userProfile) {
      logger.info('User profile not found');

      return res.status(404).json({ message: 'User profile not found' });
    }

    const {email, skillsToLearn, skillsToTeach } = userProfile;
    logger.info('Email', email);
    logger.info('Skills to learn', skillsToLearn);
    logger.info('Skills to teach', skillsToTeach);
    const matchingUsers = await userController.findMatchingUsers(email,skillsToLearn, skillsToTeach);
    const matchingUserData = matchingUsers.map(user => ({
      fullName: user.profile.fullName,skillsToLearn: user.skillsToLearn,skillsToTeach: user.skillsToTeach,
      email: user.email,
    }));
    logger.info('Matching user data', matchingUserData);

    return res.status(200).json(matchingUserData);
  } catch (err) {
    logger.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update a user profile
const updateUser = async (req, res) => {
  try {
    logger.info('Update user request in userController');
    const userEmail = req.user.email;
    logger.info('User email', userEmail);
    const user = await userController.findUserByEmail(userEmail);
    logger.info('User', user);
    if (!user) {
      logger.warn(`User not found for email: ${userEmail}`);
      return res.status(404).json({ message: 'User not found' });
    }

    const skillsToTeach = req.body.skillsToTeach || [];
    logger.info('Skills to teach', skillsToTeach);
    const skillsToLearn = req.body.skillsToLearn || [];
    logger.info('Skills to learn', skillsToLearn);
    const newUser = await userController.updateUserProfile(userEmail, skillsToTeach, skillsToLearn);
    

    return res.status(200).json({ message: 'User updated successfully', data: newUser });

  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
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
  deleteSkill,
  getMatchingUsers,


};