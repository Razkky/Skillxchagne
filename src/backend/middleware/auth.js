const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const secreteKey = process.env.SECRETE_KEY || 'defaultSecretKey';

function createToken(user) {
  if (!secreteKey) {
    logger.error('Secret key is missing');
    return null;
  }
  const token = jwt.sign({ email: user.email }, secreteKey, { expiresIn: 24 * 3600 });
  return token;
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secreteKey);
  } catch (error) {
    logger.error('Invalid token', error);
    return null;
  }
}

async function authenticateUser(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }
  const token = authorizationHeader.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
  req.user = user;
  next();
}

module.exports = {
  createToken,
  verifyToken,
  authenticateUser,
};
