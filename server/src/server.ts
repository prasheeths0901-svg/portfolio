import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './services/seed.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

// Rate limiting (permissive for dev)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Swagger Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api', routes);

// 404 handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'Developer Portfolio REST API',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/api/health',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server after connecting to database
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}/api`);
      console.log(`Swagger Docs: http://localhost:${PORT}/api/docs`);
      console.log(`Health Check: http://localhost:${PORT}/api/health`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
