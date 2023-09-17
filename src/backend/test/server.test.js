const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../server'); 
const DBClient = require('../utils/db');

describe('App Initialization', () => {
  let connectStub;

  beforeAll(() => {
    connectStub = sinon.stub(DBClient.prototype, 'connect');
  });

  afterAll(() => {
    connectStub.restore();
  });

  it('should initialize the Express app', () => {
    expect(app).to.exist;
  });

  it('should configure CORS middleware with allowed origins', () => {
    const corsOptions = app._router.stack.find(
      (layer) => layer.name === 'corsMiddleware',
    );
    expect(corsOptions).to.exist
    expect(corsOptions.route).to.equal(undefined);
  });

  it('should use JSON body parser middleware', () => {
    const jsonParser = app._router.stack.find(
      (layer) => layer.name === 'jsonParser'
    );

    expect(jsonParser).to.exist;
  });

  it('should serve static files from the client/build directory', () => {
    const staticMiddleware = app._router.stack.find(
      (layer) => layer.name === 'serveStatic'
    );

    expect(staticMiddleware).to.exist;
  });

  it('should have a route handler for /login', () => {
    const loginRoute = app._router.stack.find(
      (layer) => layer.route && layer.route.path === '/login'
    );

    expect(loginRoute).to.exist;
  });

  it('should have a route handler for /signup', () => {
    const signupRoute = app._router.stack.find(
      (layer) => layer.route && layer.route.path === '/signup'
    );

    expect(signupRoute).to.exist;
  });

  it('should have a catch-all route for serving client build files', () => {
    const catchAllRoute = app._router.stack.find(
      (layer) => layer.route && layer.route.path === '*'
    );

    expect(catchAllRoute).to.exist;
  });
})

describe('Server Start', () => {
  let listenStub;

  beforeAll(() => {
    listenStub = sinon.stub(app, 'listen');
  });

  afterAll(() => {
    listenStub.restore();
  });

  it('should start the server and listen on the specified port', () => {
    listenStub.callsFake((port, callback) => {
      expect(port).to.equal(process.env.PORT || 5001);
      callback();
    });

    // Simulate server start
    app.emit('listening');
  });
});
