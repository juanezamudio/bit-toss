import express from "express";
import cors from "cors";
import { AlkanesRpc } from "./rpc";

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

  app.post('/api/*', async (req, res) => {
    try {
      const method = req.path.split('/').pop();
      const result = await rpc[method](req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const port = process.env.PORT || 18888;
  const host = process.env.HOST || 'localhost';

  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
}

if (require.main === module) {
  runServer();
}
