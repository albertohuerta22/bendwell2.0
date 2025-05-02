# 🚧 Bendwell2.0 – Under Construction

Bendwell2.0 is a full rebuild of the original Bendwell app https://bendwell2025.netlify.app/— a web-based fitness assistant that helps users stretch and track their routines using pose detection technology. This version upgrades the stack to modern tooling with performance, accuracy, and scalability in mind.

---

## 🧠 Project Overview

Bendwell2.0 aims to:

- Improve performance by migrating from JavaScript to TypeScript
- Replace legacy Teachable Machine pose models with TensorFlow's MoveNet or BlazePose
- Maintain Supabase as the backend for user routines and stretch data
- Create a fast, responsive frontend using Vite + React + SCSS
- Lay the foundation for future AI-powered pose feedback

---

## 🛠️ Tech Stack

### Frontend

- [React](https://react.dev/) (with Vite)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [@tensorflow-models/pose-detection](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection) _(planned)_

### Backend

- [Supabase](https://supabase.io/) (PostgreSQL, Auth, Realtime)
- Will research best backend technologies designed best for TS

### Deployment

- Netlify (Frontend)
- Supabase (Backend API & DB)

---

## 🚀 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/albertohuerta22/bendwell2.0.git
cd bendwell2.0

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

### 🔐 Environment Variables

Create a `.env` file at the root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🧭 Folder Structure (WIP)

```
src/
├── components/           # Reusable UI components (e.g., Navbar, Footer, Buttons)
│   ├── Navbar/
│   ├── Footer/
│   └── StretchCard/      # (new) Single card view for a stretch, reusable
│
├── pages/                # Route-level components/screens
│   ├── Home/
│   ├── Account/
│   ├── Stretches/        # Includes AllStretches, SingleStretch
│   ├── Routines/         # Includes AllRoutines, SingleRoutine
│   ├── Auth/             # Login, Signup
│   └── PoseTrainer/      # New replacement for Teachable
│
├── store/                # Redux logic (slices, thunks, etc.)
│   ├── cameraSlice.ts
│   ├── routineSlice.ts
│   ├── stretchSlice.ts
│   └── index.ts
│
├── styles/               # Global SCSS variables and resets
│   ├── _variables.scss
│   ├── _reset.scss
│   └── main.scss
│
├── utils/                # Helper functions (e.g., pose score checker)
│   └── poseUtils.ts
│
├── lib/                  # External integrations and clients
│   └── supabase.ts
│
├── routes/               # Optional: central route config or route guards
│   └── index.tsx
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts

## ML Integration File Overview

bendwell2.0/
├── public/
│   ├── knn-data/                         # ✅ Stores exported .json files here for each stretch
│   │   ├── neck-stretch-l.json
│   │   ├── neck-stretch-r.json
│   │   ├── calf-stretch-l.json
│   │   └── oblique-reach-r.json
│   └── index.html
│
├── src/
│   ├── lib/
│   │   ├── classifier/
│   │   │   └── knnStretchClassifier.ts   # ✅ Shared KNN logic for adding/predicting/loading
│   │   └── pose/
│   │       └── poseEstimator.ts          # MoveNet detector wrapper
│
│   ├── pages/
│   │   ├── StretchWindow/
│   │   │   └── StretchWindow.tsx         # ✅ Loads a per-stretch .json and runs prediction
│   │   ├── TrainingWindow/
│   │   │   └── TrainingWindow.tsx        # ✅ Used to collect and export labeled examples
│   │   └── Stretches/
│   │       └── SingleStretch.tsx        # Entry point to StretchWindow or TrainingWindow
│
│   ├── routes/
│   │   └── index.tsx                     # Routing config
│
│   ├── styles/                           # Global + scoped SCSS styles
│   └── App.tsx
│
├── .env
├── package.json
└── README.md


```

---

## 📌 Roadmap

- [x] Create Vite + TypeScript project
- [x] Push to GitHub
- [x] Rebuild AllStretches component in TS
- [x] Replace Posenet with MoveNet
- [ ] Create model training or keypoint matcher
- [ ] Migrate existing user/stretch/routine data to Supabase
- [ ] Improve UI for Bendwell
- [ ] Add unit testing (Vitest or Jest)
- [ ] Polish SCSS and accessibility
- [ ] Final deployment with optimized build

## Stretch Goals

- [ ] Research alternatives to KNN algo
- [ ] Research other TF models for additional stretches
- [ ] Integrate metrics for calculating daily stretches
- [ ] Integrate AI chatbot for help on improving stretching

---

## 📄 License

This project is for personal and educational purposes only. Future licensing TBD.
