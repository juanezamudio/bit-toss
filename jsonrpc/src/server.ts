import express, { Request, Response } from "express";
import cors from "cors";
import { BaseRpc } from "../../src.ts/base-rpc";
import { AlkanesRpc } from "../../src.ts/rpc";
import { config } from 'dotenv';

config();

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
  
  // Parse JSON bodies
  app.use(express.json());
  
  // Configure CORS
  app.use(cors({
    origin: [
      'https://coinflipper-hosm38o72-juanezamudios-projects.vercel.app',
      'http://localhost:5173' // For local development
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  const rpc = new AlkanesRpc({
    url: process.env.DAEMON_RPC_ADDR || 'http://bitcoind:18443',
    username: process.env.RPCUSER || 'bitcoinrpc',
    password: process.env.RPCPASSWORD || 'bitcoinrpc'
  });

  app.post('/api/*', async (req: Request, res: Response) => {
    try {
      const method = req.path.split('/').pop();
      if (!method) {
        res.status(400).json({ error: 'Method not specified' });
        return;
      }

      const result = await rpc._call({
        method,
        input: req.body
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  const port = Number(process.env.PORT || '18888');
  const host = process.env.HOST || 'localhost';

  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
}

if (typeof require !== 'undefined' && require.main === module) {
  runServer();
}
