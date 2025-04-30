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
├── components/
├── lib/
│   └── supabase.ts
├── pages/
├── styles/
└── App.tsx
```

---

## 📌 Roadmap

- [x] Create Vite + TypeScript project
- [x] Push to GitHub
- [ ] Rebuild AllStretches component in TS
- [ ] Replace Teachable Machine with MoveNet
- [ ] Create model training or keypoint matcher
- [ ] Migrate existing user/stretch/routine data to Supabase
- [ ] Add unit testing (Vitest or Jest)
- [ ] Polish SCSS and accessibility
- [ ] Final deployment with optimized build

---

## 📄 License

This project is for personal and educational purposes only. Future licensing TBD.
