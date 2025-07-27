import express, { Request, Response } from "express";
import cors from "cors";
import { AlkanesRpc } from "./rpc";
import { config } from 'dotenv';

interface Environment {
  PORT: string | number;
  HOST: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
}

export function runServer() {
  const app = express();
  
  // Configure CORS
  app.use(cors({
    origin: [
      'https://coinflipper-hosm38o72-juanezamudios-projects.vercel.app',
      'http://localhost:5173' // For local development
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  const rpc = new AlkanesRpc();

  app.post('/api/*', async (req: Request, res: Response) => {
    try {
      const method = req.path.split('/').pop();
      if (method && typeof rpc[method as keyof AlkanesRpc] === 'function') {
        const result = await rpc[method as keyof AlkanesRpc](req.body);
        res.json(result);
      } else {
        res.status(404).json({ error: 'Method not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  const port = Number(process.env.PORT) || 18888;
  const host = process.env.HOST || 'localhost';

  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
}

if (typeof require !== 'undefined' && require.main === module) {
  runServer();
}
