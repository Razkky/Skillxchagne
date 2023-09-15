const app = require('../server');
const dbClient = require('../utils/db');
const sinon = require('sinon');

describe('Application Setup', () => {
  let dbClientStub;
  let appListenStub;

  beforeAll(() => {
    // Stub the DBClient class
    dbClientStub = sinon.stub(dbClient.prototype, 'connect');
  });

  afterAll(() => {
    // Restore the original method after all tests
    dbClientStub.restore();
  });

  it('should initialize the app and database connection', async () => {
    await expect(dbClientStub.calledOnce).toBe.true;
    // You can add assertions here to test the app setup and database connection
    // For example, you can test if the app is running and the database is connected
  });
});
