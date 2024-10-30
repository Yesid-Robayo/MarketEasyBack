import express, { Express } from 'express';

import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import router from './routes/routes';
import { routerDIR } from './utils/routerDIR';

const app: Express = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use(routerDIR.main, router);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Health check route

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Server is up and running!');
}); 

export default app;