# 🚀 Bit-Toss Frontend

Welcome to **Bit-Toss**! This is a fun, interactive demo dApp where you can play an Odd/Even prediction game on live Bitcoin block data. 🎲✨

---

## 🕹️ Features

- 🔮 **Odd/Even Prediction Game** – Guess if the last bit of the next block hash will be odd or even!
- ⛓️ **Live Block Data** – Pulls real Bitcoin block data from Sandshrew.
- 🏆 **Win/Lose Feedback** – See if your guess was right, plus a random BTC loss (just for fun).
- 📊 **Block Explorer** – View recent blocks and their details.
- 💻 **Modern UI** – Built with React + Vite for a smooth experience.

---

## 📦 Tech Stack

- React (TypeScript)
- Vite
- React Router
- CSS Modules
- Vercel (deployment)

---

## 🚦 How to Run Locally

### 1. Prerequisites
- Node.js (v16+ recommended)
- npm (v7+)

### 2. Clone the Repo
```bash
git clone https://github.com/juanezamudio/bit-toss.git
cd bit-toss
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Dev Server
```bash
npm run dev
```

Open your browser and go to: [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Building & Previewing Production

1. Build the app:
   ```bash
   npm run build
   ```
2. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 🎮 How to Play the Odd/Even Game
1. Click **Odd** or **Even** to lock in your guess for the next block.
2. When a new block arrives, the app checks the last bit of the block hash:
    - If your guess matches, you win! 🎉
    - If not, you lose (and see a random BTC loss for demo fun).
3. Try again on the next block!

---

## 📁 Project Structure

- `src/`
  - `pages/` – Main pages (Home, Explorer)
  - `components/` – Reusable UI components
  - `services/` – API client for block data
  - `App.tsx` – App entry point & routing
- `public/` – Static assets

---

## 🌐 Live Demo

Check it out live: [bit-toss-7634g8ipf-juanezamudios-projects.vercel.app](https://bit-toss-7634g8ipf-juanezamudios-projects.vercel.app)

---

## 🤝 Contributing
PRs welcome! Have fun and toss some blocks! 🚀

---

## 📝 License
MIT


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
