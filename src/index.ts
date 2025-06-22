import 'reflect-metadata';
// Import reflect-metadata for decorators to work correctly for type ORM
import http from 'http';
import express from 'express'; // Import express to ensure it is loaded before any other imports that might use it
import cookieSession from 'cookie-session';
import cors from 'cors';
import { method } from 'lodash';

async function bootstrap() {
  const app = express();
  const httpServer: http.Server = new http.Server(app); // Create an HTTP server using the express app
  app.set('trust proxy', 1); // Set to have property of 1 because of the cookie server
  app.use(
    cookieSession({
      name: 'session',
      keys: ['HRJHEEJHFFFJ', 'JHHJHFJWJJFJEFEJ'],
      maxAge: 24 * 6 * 3600000 // EXPIRE IN 6 DAYS
    })
  );

  const corsOptions = {
    origin: 'http://localhost:4000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  };
  app.use(cors(corsOptions));

  try {
    httpServer.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  } catch (error) {
    console.log('Error starting server:', error);
  }
}

bootstrap().catch(console.error);
