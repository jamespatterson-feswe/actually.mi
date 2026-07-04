import { authenticationLimiter, minimalLimiter } from './lib/rate-limiter';
import { env } from './lib/env';
import { swaggerSpec } from './lib/swagger';

import authRoutes from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

/** collection of middleware methods that set security related HTTP headers on every response, browser security
    helps protect against XSS attacks, blocks clickjacking attacks, prevents MIME sniffing attacks, use HTTPS only, controls broswer DNS prefetching */
app.use(helmet());

/** setup and configure swagger to be used */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const testEnv = () => {
  app.use(authRoutes);
};

const nonTestEnv = () => {
  app.use(authenticationLimiter, authRoutes);
  app.use(minimalLimiter);
};

if (env.nodeEnv === 'test') {
  testEnv();
} else {
  nonTestEnv();
}

/** Health check for testing purposes */
app.get('/health', (req, res) => {
  res.json({
    status: 200,
    statusDesc: 'Server is healthy and running correctly.',
  });
});

/** For any routes that might not exist: ex => .../blah/blah */
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    statusDesc: 'Route was not found',
  });
});

export default app;
