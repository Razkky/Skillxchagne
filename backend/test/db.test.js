const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;
const sinon_chai = require('sinon-chai');
chai.use(sinon_chai);

const logger = require('../utils/logger');
const User = require('../utils/models/user_schema');
const DBClient = require('../utils/db'); 

describe('DBClient', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const dbUrl = 'mongodb+srv://dbUser:MaryMuhammadMostafa@skillxchangedb.tffzha0.mongodb.net/?retryWrites=true&w=majority';
    process.env.DB_URL = dbUrl;
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('connect', () => {
    it('should connect to the database successfully', async () => {
      const dbUrl = 'mongodb+srv://dbUser:MaryMuhammadMostafa@skillxchangedb.tffzha0.mongodb.net/?retryWrites=true&w=majority';
      process.env.DB_URL = dbUrl;
      const mongooseConnectStub = sandbox.stub(mongoose, 'connect').resolves();
      const loggerInfoStub = sandbox.stub(logger, 'info');

      const dbClient = new DBClient();
      await dbClient.connect();

      expect(mongooseConnectStub).to.have.been.calledWith(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      expect(loggerInfoStub).to.have.been.calledWith('Connected to the database');
      expect(dbClient.db).to.equal(true);
    });

    it('should handle connection error and log it', async () => {
      process.env.DB_URL = undefined;
      const loggerErrorStub = sandbox.stub(logger, 'error');

      const dbClient = new DBClient();
      await dbClient.connect();

      expect(loggerErrorStub).to.have.been.calledWith(
        'Error connecting to the database:'
      );
      expect(dbClient.db).to.equal(false);
    });
  });

  describe('disconnect', () => {
    it('should disconnect from the database successfully', async () => {
      const mongooseDisconnectStub = sandbox.stub(mongoose, 'disconnect').resolves();
      const loggerInfoStub = sandbox.stub(logger, 'info');

      const dbClient = new DBClient();
      await dbClient.disconnect();

      expect(mongooseDisconnectStub).to.have.been.calledOnce;
      expect(loggerInfoStub).to.have.been.calledWith('Disconnected from the database');
      expect(dbClient.db).to.equal(false);
    });

    it('should handle disconnection error and log it', async () => {
      const mongooseDisconnectStub = sandbox.stub(mongoose, 'disconnect').rejects('Disconnect error');
      const loggerErrorStub = sandbox.stub(logger, 'error');

      const dbClient = new DBClient();
      await dbClient.disconnect();

      expect(mongooseDisconnectStub).to.have.been.calledOnce;
      expect(loggerErrorStub).to.have.been.calledWith('Error disconnecting from the database:');
      expect(dbClient.db).to.equal(false);
    });
  });

  describe('isAlive', () => {
    it('should return true when the database is connected', () => {
      const dbClient = new DBClient();
      dbClient.db = true;

      const result = dbClient.isAlive();

      expect(result).to.equal(true);
    });

    it('should return false when the database is not connected', () => {
      const dbClient = new DBClient();
      dbClient.db = false;

      const result = dbClient.isAlive();

      expect(result).to.equal(false);
    });

  });

  // describe('addUser', () => {
  //   it('should create and save a user successfully', async () => {
  //     const userData = {
  // 	username: "razkky",
  // 	email: "razkky@gmail.com",
  // 	password: "abdul",
  // 	profile: {
  // 	  fullName: "Raz Karmi",
  // 	}
  //     }
  //     const userInstance = new User(userData);
  //     const userSaveStub = sandbox.stub(userInstance, 'save').resolves(userInstance);
  //     console.log('logging user instance', userSaveStub);
  //     const loggerInfoStub = sandbox.stub(logger, 'info');
  //     let result;
  //     const dbClient = new DBClient();
  //     await dbClient.connect()
  // 	.then(() => console.log('connected'));
  //     result = await dbClient.addUser(userData);
  //     console.log(result);
  //     console.log('Usier instance', userInstance);

  //     // expect(userSaveStub).to.have.been.calledOnceWithExactly();
  //     // expect(loggerInfoStub).to.have.been.calledWith('Creating user:', userData);
  //     expect(result).to.deep.equal(userInstance);
  //   }, 1000000);


  //   it('should handle user creation error and log it', async () => {
  //     const userData = {
  // 	username: "razkky",
  // 	email: "razkky@gmail.com",
  // 	password: "abdul",
  // 	profile: {
  // 	  fullName: "Raz Karmi",
  // 	}
  //     }
  //     const userInstance = new User(userData);
  //     const userSaveStub = sandbox.stub(userInstance, 'save').rejects('Save error');
  //     const loggerErrorStub = sandbox.stub(logger, 'error');

  //     const dbClient = new DBClient();
  //     const result = await dbClient.addUser(userData);

  //     expect(userSaveStub).to.have.been.calledOnceWithExactly();
  //     expect(loggerErrorStub).to.have.been.calledWith('Error:', 'Save error');
  //     expect(result).to.equal(false);
  //   });
  // });

});
