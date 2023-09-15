// Load environment variables from .env file
require('dotenv').config();
const DBClient = require('./utils/db');
const express = require('express');
const cors = require('cors');
const dbClient = new DBClient();
const path = require('path');

const logger = require('./utils/logger');
const routes = require('./routes/index');

logger.info('Server setup started...');
// print environment variables
logger.info('Environment variables:');
logger.info('PORT:', process.env.PORT);
logger.info('DB_URL:', process.env.DB_URL);

logger.info('Initializing Express app...');
const app = express();

logger.info('CORS middleware enabled.');
//allow cross origin requests
const allowedOrigins = ['http://localhost:3000', 'https://skillxchange-128362448c46.herokuapp.com'];
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to handle cookies or authentication
}));
app.use(express.json()); // Add this line to parse JSON bodies
//serve client build files
app.use(express.static('client/build'));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

app.use(routes);
//when no routes match, serve client build files
app.get('*', (req, res) => {
  res.sendFile('/client/build/index.html');
});

const port = process.env.PORT || 5001; // Use the PORT variable from .env or default to 3000


dbClient.connect()
  .then(() => {
    app.listen(port, () => {
    logger.info(`App started. Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error('Error', error);
  })


logger.info('Server setup complete.');
