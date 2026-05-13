# NekoKana 😺

Learn Japanese characters (hiragana and katakana) through interactive flashcards and quizzes.

## Features

- **Interactive Flashcards** - Tap cards to reveal romanization and memorize characters
- **Quiz Mode** - Test your knowledge with multiple-choice questions
- **Flexible Character Selection** - Choose which kana groups to practice (seion, ka, sa, ta, na, ha, ma, ya, ra, wa)
- **Dual Support** - Practice hiragana, katakana, or both simultaneously
- **Progress Tracking** - See your score and accuracy after each session
- **Smooth Animations** - Beautiful transitions powered by Framer Motion
- **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend Framework** - React 18
- **Routing** - React Router v6
- **Styling** - Tailwind CSS
- **Animations** - Framer Motion
- **Build Tool** - Vite
- **Icons** - Lucide React
- **Deployment** - Vercel

## Project Structure

```
src/
├── pages/                 # Route components
│   ├── landing/          # LandingPage
│   ├── kana/             # Character selection (Kana, KanaAccordion)
│   ├── training/         # Training mode (TrainingMode, LearnPhase, QuizPhase)
│   └── score/            # Score display (ScoreScreen)
├── components/           # Shared UI components
│   ├── Header.jsx
│   ├── ActionBar.jsx
│   ├── Card.jsx
│   └── QuizOptions.jsx
├── features/
│   └── training/components/  # Training-specific components
├── context/              # React Context
│   └── TrainingContext.jsx   # Session management
├── hooks/                # Custom hooks
│   ├── useTrainingState.js   # Session & revealed cards
│   ├── useQuizEngine.js      # Quiz logic & options
│   └── useTrainingPhase.js   # Phase transitions
├── utils/                # Helper functions
│   ├── constants.js      # Modes, groups, display names
│   ├── validation.js     # Parameter validation
│   ├── url.js           # URL encoding/decoding
│   ├── data.js          # Data operations
│   └── array.js         # Array utilities
└── data/
    └── nekoData.js      # Character dataset (hiragana & katakana)
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

## Deployment

### Vercel

The project includes `vercel.json` configuration for proper SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes are served through React Router, not as static file requests.

**Deploy steps:**
1. Push code to GitHub
2. Connect repo to Vercel
3. Vercel auto-detects config and deploys
4. View live at your Vercel domain

## How It Works

1. **Landing Page** - Click "Start Learning" to begin
2. **Select Characters** - Choose hiragana groups, katakana groups, or both
3. **Learning Phase** - Tap flashcards to reveal romanization and memorize
4. **Quiz Phase** - Answer multiple-choice questions on selected characters
5. **View Score** - See your results and retry or go back to selection

## Architecture

### State Management
- **TrainingContext** - Holds session data (characters, answers, progress)
- **Custom Hooks** - Encapsulate feature logic (training state, quiz engine, phase management)
- **Local State** - UI state like revealed cards and selected answers

### URL Parameters
Training configuration is encoded in URL query params:
```
/training?mode=hiragana&groups=seion,ka,sa
```
This allows sharing sessions and bookmarking configurations.

### Validation
All training parameters are validated before loading:
- Valid mode: hiragana, katakana, or both
- Valid groups: seion, ka, sa, ta, na, ha, ma, ya, ra, wa
- Non-empty character set for selected parameters

### Quiz Generation
Quiz options are dynamically generated with:
- 1 correct answer
- 3 random distractors from the same character type
- Shuffled order each question

## Inspiration

This project is inspired by the excellent teaching methodologies of [KanaDojo](https://kanadojo.com). Check them out for more Japanese learning resources!

## Future Improvements

- Dakuon (濁音) and Yoon (拗音) character support
- Spaced repetition algorithm
- Offline mode with service workers
- Progress analytics and learning statistics 
- Keyboard input for answers
- Dark mode support

## License

MIT
