const mongoose = require('mongoose');
const logger = require('./logger'); // Assuming you have a logger module
const User = require('./models/user_schema'); // Assuming you have a User model

class DBClient {
  constructor() {
    this.db = null;
  }

  async connect() {
    try {
      const dbUrl = process.env.DB_URL;

      if (!dbUrl) {
        throw new Error('DB_URL environment variable is not defined');
      }

      await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.db = true;
      logger.info('Connected to the database');
    } catch (error) {
      logger.error('Error connecting to the database:', error);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      this.db = null;
      logger.info('Disconnected from the database');
    } catch (error) {
      logger.error('Error disconnecting from the database:', error);
    }
  }

  isAlive() {
    try {
    logger.info('Checking if DB is alive');
    return this.db;
    } catch (error) {
      logger.error('Error:', error);
      return false;
    }
  }


  addUser(data) {
    try {
    logger.info(`Creating user: ${data}`);
    const user = new User(data);
    logger.info(`User instance created: ${user}`);
    return user.save();
    logger.info(`User saved: ${user}`);
    } catch (error) {
      logger.error('Error:', error);
      return false;
    }
  }
}

module.exports = DBClient;
