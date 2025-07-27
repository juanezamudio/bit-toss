# CoinFlipper - ALKANES Betting Protocol

![Tests](https://img.shields.io/github/actions/workflow/status/AssemblyScript/assemblyscript/test.yml?branch=main&label=test&logo=github)
![Publish](https://img.shields.io/github/actions/workflow/status/AssemblyScript/assemblyscript/publish.yml?branch=main&label=publish&logo=github)

A decentralized betting platform built on the ALKANES metaprotocol, enabling peer-to-peer coin flipping games on Bitcoin. This repository contains both the backend protocol implementation and the frontend user interface.

**The ALKANES specification is hosted at** 👉🏻👉🏼👉🏽👉🏾👉🏿 [https://github.com/kungfuflex/alkanes/wiki](https://github.com/kungfuflex/alkanes/wiki)

#### NOTE: ALKANES does not have a network token

Protocol fees are accepted in terms of Bitcoin and compute is metered with the wasmi fuel implementation, for protection against DoS.

## Installation

Install docker-ce with docker-compose. On Debian-based systems, a proper installation of docker-ce will include a docker-compose binary at /usr/libexec/docker/cli-plugins/docker-compose.

A complete environment for alkanes development against a live web application can be initialized in one command, invoked at the root of the project:

```sh
docker-compose up -d
```

This will launch a Bitcoin regtest instance, a keydb backend for a database, a metashrew process, and a metashrew-view process, preloaded with the `alkanes.wasm` binary produced from the Rust crate hosted at [https://github.com/kunguflex/alkanes-rs](https://github.com/kungfuflex/alkane-rs).

## Project Structure

```
├── frontend/          # React frontend application
│   ├── src/          # Frontend source code
│   │   ├── components/  # React components
│   │   ├── services/   # API services
│   │   └── utils/      # Utility functions
├── jsonrpc/          # JSON-RPC server implementation
├── docker/           # Docker configuration files
├── integration/      # Integration tests
└── src.ts/          # Core TypeScript implementation
```

## Features

- Decentralized peer-to-peer betting
- Provably fair coin flips using Bitcoin's blockchain
- Real-time game updates
- Secure bet execution using ALKANES protocol
- Responsive web interface
- Testnet and Mainnet support

## Prerequisites

- Node.js >= 18
- Docker and Docker Compose
- Git

## Local Development Setup

1. Clone the repository:
```sh
git clone https://github.com/juanezamudio/coin-flipper.git
cd coin-flipper
```

2. Install dependencies:
```sh
npm install
cd frontend && npm install
```

3. Start the development environment:
```sh
# Start backend services
docker compose up -d

# Start frontend development server
cd frontend
npm run dev
```

4. Run integration tests:
```sh
ts-node integration/scripts/init.ts
ts-node integration/genesis.spec.ts
```

## Configuration

### Environment Variables

Backend (`.env`):
```env
HOST=0.0.0.0
PORT=18888
NODE_ENV=development
```

Frontend (`.env`):
```env
VITE_API_URL=http://localhost:18888
```

### Docker Services

- `bitcoind`: Bitcoin Core node (Regtest mode)
- `metashrew`: ALKANES indexer
- `memshrew`: P2P network service
- `jsonrpc`: API server
- `ord`: Ordinals server
- `esplora`: Block explorer

## API Endpoints

- `POST /api/createBet`: Create a new bet
- `POST /api/joinBet`: Join an existing bet
- `GET /api/getBet/:id`: Get bet details
- `GET /api/getResults/:id`: Get bet results

## Deployment

1. Build the frontend:
```sh
cd frontend
npm run build
```

2. Deploy the backend:
```sh
docker compose -f docker-compose.prod.yaml up -d
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run unit tests:
```sh
npm test
```

Run integration tests:
```sh
npm run test:integration
```

## Security

This project is still in beta. Use at your own risk and never bet more than you can afford to lose.

## License

MIT License - see the [LICENSE](LICENSE) file for details

Made with ❤️ by BitToss Team @ Pleb.fi Miami Hackathon 2025
