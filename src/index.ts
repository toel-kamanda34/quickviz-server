import 'reflect-metadata';
// Import reflect-metadata for decorators to work correctly for type ORM
import http from 'http';
import express from 'express'; // Import express to ensure it is loaded before any other imports that might use it
import cookieSession from 'cookie-session';
import cors from 'cors';
import { method } from 'lodash';
import { envConfig } from './config/env.config'; // Import your environment configuration
import { AppDataSource } from './database/config'; // Import your database configuration

// Ensure that the import statement is correct
if (!envConfig) {
  throw new Error('Environment configuration not found');
}

async function bootstrap() {
  const app = express();
  const httpServer: http.Server = new http.Server(app); // Create an HTTP server using the express app
  app.set('trust proxy', 1); // Set to have property of 1 because of the cookie server
  app.use(
    cookieSession({
      name: 'session',
      keys: ['envConfig.SECRET_KEY_ONE', 'envConfig.SECRET_KEY_TWO'], // Use your actual secret keys here
      maxAge: 24 * 6 * 3600000 // EXPIRE IN 6 DAYS
    })
  );

  const corsOptions = {
    origin: 'envConfig.REACT_URL', // Replace with your actual React app URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  };
  app.use(cors(corsOptions));

  try {
    httpServer.listen(envConfig.PORT, () => {
      console.log(`Server is running on http://localhost:${envConfig.PORT}`);
    });
  } catch (error) {
    console.log('Error starting server:', error);
  }
}

AppDataSource.initialize()
  .then(() => {
    console.log('PostgreSQL database connection established successfully');
    bootstrap().catch(console.error);
  })
  .catch((error) => {
    console.log('Error during PostgreSQL database connection:', error);
  });
