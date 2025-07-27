# ALKANES Protocol Frontend

This is the frontend application for the ALKANES Protocol, a metaprotocol on the Bitcoin blockchain.

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/frontend
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components
│   ├── App.tsx       # Root component
│   └── main.tsx      # Entry point
├── package.json
└── vite.config.ts
```

## Features

- React 18 with TypeScript
- Vite for fast development
- React Router for navigation
- Integration with ALKANES Protocol
- Transaction explorer
- Modern, responsive UI

## Development

The development server will start at `http://localhost:5173` by default.

## Production

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.
