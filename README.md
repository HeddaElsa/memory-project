# Dog Memory Game

A fun, interactive memory card game built with React where players match pairs of adorable dog images.

## Features

- **User Authentication** - Register and login system with localStorage persistence
- **Three Difficulty Levels**
  - **Easy** - 4 pairs, no time limit
  - **Medium** - 6 pairs, 60-second timer
  - **Hard** - 8 pairs, 45-second timer
- **Dynamic Dog Images** - Fresh random dog images fetched from the Dog CEO API each game
- **Game Statistics** - Track your turns and match progress
- **Smooth Animations** - 3D card flip effects
- **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Dog CEO API** - Random dog image provider

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd our-react-app

# Install dependencies
npm install
```

### Running the App

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## How to Play

1. **Register** - Create an account with a username and password
2. **Login** - Enter your credentials to access the game
3. **Select Difficulty** - Choose Easy, Medium, or Hard
4. **Match Cards** - Click cards to flip them and find matching pairs
5. **Win** - Match all pairs before time runs out (on timed modes)

## Project Structure

```
our-react-app/
├── src/
│   ├── components/
│   │   ├── Registration.jsx   # Account creation
│   │   ├── Login.jsx          # User authentication
│   │   ├── Memory.jsx         # Main game logic
│   │   └── card.jsx           # Card component
│   ├── App.jsx                # App routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/
│   └── images/                # Static assets
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## API

This project uses the free [Dog CEO API](https://dog.ceo/dog-api/) to fetch random dog images.

## License

This project is open source and available under the MIT License.
