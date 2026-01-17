# 💪 Workout Tracker

A modern, full-stack workout tracking web application with intelligent recovery time estimation. Built with Next.js 14, TypeScript, MongoDB, and optimized for Vercel deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vedeshskhatri/workout)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-success)](https://web.dev/progressive-web-apps/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)

🚀 **[Live Demo](https://your-app-name.vercel.app)** | 📱 **[Install on Android](ANDROID_APP.md)** | 📚 **[Deployment Guide](DEPLOYMENT_READY.md)**

## ⚡ Quick Start

### Deploy to Vercel (5 minutes)
1. Click **[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vedeshskhatri/workout)**
2. Add environment variables (MongoDB URI, AUTH_SECRET)
3. Click Deploy!
4. 🎉 Your app is live!

### Install as Android App
1. Visit your deployed app on Android Chrome
2. Tap menu (⋮) → "Add to Home screen"
3. App icon appears on home screen!
4. Works like a native app 📱

Full guides: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) | [ANDROID_APP.md](ANDROID_APP.md)

## 🌟 Features

### Core Features

#### 📱 Progressive Web App (PWA)
- **Install on Android** - Works like a native app
- **Offline capable** - View workouts without internet
- **Fast & responsive** - Optimized performance
- **App shortcuts** - Quick access to main features
- **No app store needed** - Install directly from browser
- **Automatic updates** - Always latest version

#### 📅 Alternating A/B Workout Plans
- Two customizable workout plans that automatically alternate weekly
- Week-based rotation using ISO week numbers
- Automatic plan detection with manual override capability
- Full exercise customization for each plan
- **Pre-loaded 6-day split** (Monday-Saturday, 12 exercises/day)

#### 📝 Comprehensive Workout Logging
- **Auto-populated exercises** - Based on current day and week
- **One-click completion** - Check off exercises as you go
- **Progress tracking** - X/12 exercises completed
- Multiple exercises per workout session
- Detailed set tracking: reps × weight × RPE
- Overall intensity and sleep quality inputs
- Duration tracking and session notes
- Exercise presets with autocomplete

#### 📊 History & Progress Tracking
- Complete workout history with filtering (by plan, date range)
- Interactive calendar/list view
- Color-coded plans (Plan A: Green, Plan B: Orange)
- Detailed exercise progress charts using Recharts
- Weight progression and volume tracking over time

#### 🔥 **Smart Recovery Time Estimation** (Key Feature)
Our proprietary algorithm calculates optimal recovery times based on:

- **Experience Level**: Beginner (72h), Intermediate (48h), Advanced (36h base recovery)
- **RPE (Rate of Perceived Exertion)**: High RPE adds recovery time
- **Training Volume**: Total sets per muscle group
- **Overall Intensity**: Session difficulty rating
- **Sleep Quality**: Recovery speed modifier
- **Training Frequency**: Adaptive based on recent workouts

The system provides:
- Muscle group-specific recovery recommendations
- Ready-to-train indicators
- Estimated next training dates
- Visual recovery status cards on dashboard

#### 📅 Upcoming Workouts Schedule
- **7-day preview** - See next week's workouts
- **Auto-detects Week A/B** - Based on current date
- **Muscle group badges** - Quick view of what you'll train
- **Expandable details** - View all exercises with sets/reps
- **Rest day indicators** - Sunday recovery days

#### 🏠 Smart Dashboard
- Current week plan suggestion
- Recovery status for all muscle groups
- Upcoming workouts overview
- Quick stats: workouts and volume (weekly/monthly)
- One-click workout starter

### Additional Features

1. **🌓 Dark Mode** - Automatic system detection + manual toggle
2. **📱 Responsive Design** - Mobile-first approach, works perfectly on all devices
3. **🎯 Exercise Library** - 40+ preset exercises with muscle group categorization
4. **📈 Progress Visualization** - Interactive charts for strength progression
5. **🔐 Secure Authentication** - Google OAuth + email/password with NextAuth.js v5
6. **⚡ Real-time Validation** - Zod schema validation for data integrity
7. **🎨 Modern UI** - Clean, intuitive interface with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas (via Mongoose)
- **Authentication**: NextAuth.js v5 / Auth.js
- **Charts**: Recharts
- **State Management**: Zustand (lightweight)
- **Validation**: Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
workout-tracker/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   └── register/route.ts
│   │   ├── workouts/route.ts
│   │   └── plans/route.ts
│   ├── auth/
│   │   ├── signin/page.tsx
│   │   └── register/page.tsx
│   ├── workout/
│   │   └── new/page.tsx
│   ├── history/page.tsx
│   ├── progress/page.tsx
│   ├── plans/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/toaster.tsx
│   ├── DashboardStats.tsx
│   ├── Navbar.tsx
│   ├── ProgressCharts.tsx
│   ├── QuickStartCard.tsx
│   ├── RecoveryCard.tsx
│   ├── RegisterForm.tsx
│   ├── SignInForm.tsx
│   ├── ThemeProvider.tsx
│   ├── WorkoutForm.tsx
│   ├── WorkoutHistoryList.tsx
│   └── WorkoutPlansManager.tsx
├── lib/
│   ├── constants.ts
│   ├── db.ts
│   ├── recovery-estimation.ts  # Core recovery algorithm
│   ├── utils.ts
│   └── workout-plan.ts
├── models/
│   ├── BodyMeasurement.ts
│   ├── User.ts
│   ├── WorkoutPlan.ts
│   └── WorkoutSession.ts
├── types/
│   ├── index.ts
│   └── next-auth.d.ts
├── auth.ts
├── middleware.ts
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB Atlas account (free tier works great)
- Google OAuth credentials (optional, for Google sign-in)

### 1. Clone and Install

```bash
cd workout-tracker
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/workout-tracker?retryWrites=true&w=majority

# NextAuth
AUTH_SECRET=your-secret-key-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Generate AUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace `<password>` with your database password

**Get Google OAuth credentials (optional):**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Create Your First Account

1. Navigate to the registration page
2. Create an account with email/password or Google
3. Select your experience level (affects recovery calculations)
4. Start logging workouts!

## 📦 Deployment to Vercel

### Quick Deploy (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   In Vercel project settings → Environment Variables, add:
   - `MONGODB_URI`
   - `AUTH_SECRET`
   - `NEXTAUTH_URL` (your Vercel deployment URL, e.g., `https://your-app.vercel.app`)
   - `GOOGLE_CLIENT_ID` (optional)
   - `GOOGLE_CLIENT_SECRET` (optional)

4. **Update Google OAuth (if using)**
   - Add your Vercel URL to authorized redirect URIs:
     `https://your-app.vercel.app/api/auth/callback/google`

5. **Deploy!**
   - Click "Deploy"
   - Your app will be live in ~2 minutes

### Manual Deploy

```bash
npm run build
vercel --prod
```

## 🧮 Recovery Time Estimation Algorithm

The core feature of this app is the intelligent recovery estimation. Here's how it works:

### Base Recovery Times
- **Beginner**: 72 hours (3 days)
- **Intermediate**: 48 hours (2 days)
- **Advanced**: 36 hours (1.5 days)

### Adjustment Factors

1. **RPE (Rate of Perceived Exertion)**
   - RPE 9-10: +24 hours
   - RPE 8: +12 hours
   - RPE ≤5: -12 hours

2. **Training Volume**
   - 20+ sets: +12 hours
   - 15-19 sets: +6 hours
   - ≤5 sets: -6 hours

3. **Overall Intensity**
   - Very Hard: +24 hours
   - Hard: +12 hours
   - Light: -12 hours

4. **Sleep Quality**
   - Poor: +24 hours
   - Excellent: -12 hours

5. **Training Frequency**
   - 7+ days since last: -24 hours (already rested)
   - ≤2 days since last: +12 hours (frequent training)

### Result
The algorithm calculates personalized recovery windows (minimum 24h, maximum 168h) for each muscle group, displaying:
- Ready/Not Ready status
- Recommended next training date
- Contributing factors breakdown

## 🎯 Usage Guide

### Daily Workflow

1. **Check Dashboard**: View recovery status and today's suggested plan
2. **Log Workout**: Click "Start Today's Workout" or navigate to Log Workout
3. **Fill Details**: Add exercises, sets, reps, weight, and RPE
4. **Save**: Recovery recommendations appear automatically
5. **Track Progress**: View history and charts to see improvements

### Customizing Plans

1. Navigate to "Plans" in the navbar
2. Switch between Plan A and Plan B
3. Add exercises with target sets/reps
4. Save your custom plan
5. Plans automatically alternate weekly

### Viewing Progress

1. Go to "Progress" page
2. Select an exercise from dropdown
3. Toggle between max weight and total volume charts
4. Review progression statistics

## 🔧 Configuration Options

### Experience Level
Update in user profile to adjust recovery calculations:
- Beginner: Longer recovery periods
- Intermediate: Balanced recovery
- Advanced: Shorter recovery, assumes better adaptation

### Plan Override
On the dashboard, manually select Plan A or B to override automatic weekly rotation if needed.

## 📝 Data Models

### User
- email, name, password, experienceLevel
- Timestamps

### WorkoutPlan
- userId, planType (A/B), exercises array
- Each exercise: name, muscleGroup, targetSets, targetReps, notes

### WorkoutSession
- userId, planType, date, exercises array
- overallIntensity, sleepQuality, duration, notes
- Each exercise: name, muscleGroup, sets array (reps, weight, RPE)

### BodyMeasurement (optional)
- userId, date, weight, bodyFat, measurements
- For future body tracking features

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this project as a template for your own workout tracker.

## 🐛 Known Issues / Future Improvements

- [ ] Add workout templates/copy previous workout feature
- [ ] Implement body measurements tracking page
- [ ] Add CSV/JSON export functionality
- [ ] Create 1RM calculator utility
- [ ] Add workout photo upload (Vercel Blob integration)
- [ ] Implement browser notifications for workout reminders
- [ ] Add workout sharing/social features
- [ ] Create mobile app (React Native)

## 💡 Tips for Best Results

1. **Be Consistent**: Log workouts immediately after training for accuracy
2. **Use RPE Honestly**: RPE is crucial for recovery calculations
3. **Track Sleep**: Sleep quality significantly affects recovery
4. **Update Experience Level**: As you progress, update your level for better recommendations
5. **Review Progress Monthly**: Check charts to ensure progressive overload

## 📞 Support

For issues or questions:
- Check existing GitHub issues
- Create a new issue with details
- Include error messages and steps to reproduce

---

**Built with 💪 for fitness enthusiasts who love data**

Happy Training! 🏋️‍♂️
