# Bit-Toss Frontend

A modern React-based frontend for the Bit-Toss application, allowing users to interact with blockchain blocks through an intuitive interface.

## Features

- 🎲 Interactive block prediction game
- 🔄 Real-time blockchain block monitoring
- 📊 Block history visualization
- 🎯 Even/Odd block number prediction
- 💫 Modern, responsive UI with animations

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: CSS Modules
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/juanezamudio/coin-flipper.git
cd coin-flipper/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

1. Create a production build:
```bash
npm run build
```

2. Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── Navbar.tsx
│   │   └── Explorer.tsx
│   ├── pages/        # Page components
│   │   ├── Home.tsx
│   │   └── Explorer.tsx
│   ├── services/     # API and service layer
│   │   └── api.ts
│   └── App.tsx       # Root component
├── public/           # Static assets
└── index.html        # Entry HTML file
```

## Main Components

### Home Page
- Features two interactive circular buttons for even/odd predictions
- Displays current block information
- Shows prediction history

### Explorer
- Lists recent blocks and transactions
- Provides detailed block information
- Real-time updates for new blocks

## Deployment

### Deploy to Vercel

1. Push your changes to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. Connect your repository to Vercel
3. Configure the following environment variables:
   - `VITE_API_URL`: Your API endpoint URL

The application is currently deployed at: https://bit-toss-nine.vercel.app/

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:18888  # Local development
```

For production, update the URL in `.env.production`:

```env
VITE_API_URL=https://your-api-url.com
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Styling

The application uses CSS modules for styling with a dark theme. Key features:
- Responsive design
- Modern UI elements with rounded corners
- Smooth transitions and animations
- Consistent dark color scheme
- Interactive buttons with visual feedback

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this code for your own projects.
