const bcrypt = require('bcrypt');
const User = require('../utils/models/user_schema');
const DBClient = require('../utils/db');
const logger = require('../utils/logger');
const dbClient = new DBClient();

class UserController {
    // 1. Find User by Username
    static async findUserByUsername(username) {
        try {
            const user = await User.findOne({ username });
            return user;
        } catch (error) {
            throw new Error(`Error finding user by username: ${error}`);
        }
    }
  // Find user by Email
    static async findUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            throw new Error(`Error finding user by Email: ${error}`);
        }
    }

    static async findMatchingUsers(currentUserEmail, skillsToLearn, skillsToTeach) {
        try {
          logger.info(`Finding matching users in userController`);
          logger.info(`Skills to learn: ${skillsToLearn}`);
          logger.info(`Skills to teach: ${skillsToTeach}`);
      
          const matchingUsers = await User.find({
            $and: [
              { email: { $ne: currentUserEmail } }, // Exclude the current user
              {
                $or: [
                  {
                    $and: [
                      { skillsToLearn: { $elemMatch: { $in: skillsToTeach } } },
                      { skillsToTeach: { $elemMatch: { $in: skillsToLearn } } },
                    ],
                  },
                  { skillsToLearn: { $in: skillsToTeach } },
                  { skillsToTeach: { $in: skillsToLearn } },
                ],
              },
            ],
          });
      
          return matchingUsers;
        } catch (error) {
          throw new Error(`Error finding matching users: ${error}`);
        }
      }
      
      


    // 2. Check Password
    static async checkPassword(email, inputPassword) {
        try {
            const user = await UserController.findUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(inputPassword, user.password);
            return isMatch;
        } catch (error) {
            throw new Error(`Error checking password: ${error}`);
        }
    }

    // 3. Find Connected Google ID
    static async findConnectedGoogleId(username) {
        try {
            const user = await UserController.findUserByUsername(username);
            if (!user || !user.authProvider?.google?.id) {
                throw new Error('User or Google auth not found');
            }
            return user.authProvider.google.id;
        } catch (error) {
            throw new Error(`Error finding connected Google ID: ${error}`);
        }
    }

    // 4. Hash Password
    static async hashPassword(password) {
        try {
            logger.info(`Hashing password: ${password}`)
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            logger.info(`password Hashed Succesfully : ${hashedPassword}`);
            return hashedPassword;
        } catch (error) {
            throw new Error(`Error hashing password: ${error}`);
        }
    }

    // 5. Create User
    static async createUser(userData) {
        try {
            const existingUser = await User.findOne({ $or: [{ username: userData.username }, { email: userData.email }] });
            if (existingUser) {
                // User already exists, return a 409 Conflict status code.
                return { status: 409, message: 'Username or email already exists' };
            }
    
            const hashedPassword = await UserController.hashPassword(userData.password);
    
            const user = new User({
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
                profile: {
                    fullName: userData.profile.fullName,
                },
                authProvider: userData.authProvider,
            });
    
            await user.save();
    
            // User creation was successful, return a 201 Created status code.
            return { status: 201, message: 'User created successfully', data: user };
        } catch (error) {
            // Handle errors and return appropriate status codes and messages.
            return { status: 500, message: 'Internal server error', error: error.message };
        }
    }
    

    static async login(email, password) {
        try {
            logger.info(`User Controller Login Method`);
            logger.info(`Login with email: ${email} and password: ${password}`);
            const user = await UserController.findUserByEmail(email);
            if (!user) {
                logger.info(`User not found`);
                // User not found, return a 401 Unauthorized status code.
                return { status: 401, message: 'Incorrect Email or Password' };
            }
            
            const isMatch = await UserController.checkPassword(email, password);
            if (!isMatch) {
                logger.info(`Password doesn't match`);  
                // Password doesn't match, return a 401 Unauthorized status code.
                return { status: 401, message: 'Incorrect UserName or Password' };
            }       
            logger.info(`Login Successful`);
            // If login is successful, return a 200 OK status code and user data.
            return { status: 200, message: 'Login successful', data: user };
        } catch (error) {
            logger.info(`Error logging in: ${error}`);
            // Handle other errors and return a 500 Internal Server Error status code.
            return { status: 500, message: 'Internal server error', error: error.message };
        }
    }
    
    // static async fetchUserProfile(email) {
    //     try {
    //       // Query your database or data source to fetch the user profile
    //       const userProfile = await UserController.findUserByEmail(email);
    //       return userProfile;
    //     } catch (error) {
    //       throw new Error(`Error fetching user profile: ${error}`);
    //     }
    //   }
      

    // 6. Update User Profile
 // 6. Update User Profile - Update skills lists
 static async updateUserProfile(email, skillsToTeach, skillsToLearn) {
    try {
        logger.info(`Updating user profile for user with email: ${email}`);
        const existingUser = await User.findOne({ email });
        logger.info(`Existing user: ${existingUser}`);
        if (!existingUser) {
            logger.info(`User not found`);
            throw new Error('User not found');
        }
        logger.info(`Existing user profile: ${existingUser.profile}`);
        logger.info(`Existing user skillsToTeach: ${existingUser.skillsToTeach}`);
        logger.info(`Existing user skillsToLearn: ${existingUser.skillsToLearn}`);
        // Helper function to update skills
     
        
        const updateSkills = (existingSkills, newSkills) => {
            logger.info(`Updating skills in updateSkills function`);
            logger.info(`Existing skills: ${existingSkills}`);
            logger.info(`New skills: ${newSkills}`);
            const filteredSkills = existingSkills.filter(skill => newSkills.includes(skill)); // Retain skills still selected
           const addedSkills = newSkills.filter(skill => !existingSkills.includes(skill));  // Find new skills to add
            return [...filteredSkills, ...addedSkills];                                      // Combine both
        };
        logger.info(`Calling updateSkills function for skil to teach`);
       existingUser.skillsToTeach = updateSkills(existingUser.skillsToTeach, skillsToTeach);
        logger.info(`Calling updateSkills function for skil to learn`);
       existingUser.skillsToLearn = updateSkills(existingUser.skillsToLearn, skillsToLearn);

        // Save the updated user's profile
        const updatedUser = await existingUser.save();

        return updatedUser;
    } catch (error) {
        throw new Error(`Error updating user profile: ${error}`);
    }
}




    // 7. Add Review Reference to User
    static async addReviewToUser(username, reviewId) {
        try {
            const user = await User.findOneAndUpdate(
                { username },
                { $push: { 'reviews': reviewId } },
                { new: true }
            );
            return user;
        } catch (error) {
            throw new Error(`Error adding review to user: ${error}`);
        }
    }

    // 8. Add Chat Reference to User
    static async addChatToUser(username, chatId) {
        try {
            const user = await User.findOneAndUpdate(
                { username },
                { $push: { 'chats': chatId } },
                { new: true }
            );
            return user;
        } catch (error) {
            throw new Error(`Error adding chat to user: ${error}`);
        }
    }

    static async isAlive() {
        return dbClient.isAlive();
    }
}

module.exports = UserController;
