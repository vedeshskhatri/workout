# Workout Tracker - Quick Setup Guide

## ✅ Current Status
Your app is successfully running on **http://localhost:3002** with no errors!

## 🎯 Your 6-Day Workout Split Integration

I've integrated your detailed workout plan into the app:

### Files Created:
1. **`lib/preset-workout-plans.ts`** - Contains all 12 workout templates (Monday-Saturday, Week A & B)
2. **`lib/exercise-database.ts`** - Comprehensive exercise library (~150 exercises)
3. **`scripts/seed-workout-plans.ts`** - Script to load your plans into the database

### Weekly Schedule:
- **Monday**: Chest + Triceps (12 exercises)
- **Tuesday**: Back + Biceps (12 exercises)
- **Wednesday**: Legs + Abs (12 exercises)
- **Thursday**: Shoulders + Triceps (12 exercises)
- **Friday**: Back + Forearms (12 exercises)
- **Saturday**: Chest + Abs (12 exercises)
- **Sunday**: Rest

**Plan rotation**: Odd weeks → Plan A, Even weeks → Plan B (automatically handled)

## 📋 Next Steps

### 1. Set Up MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free cluster
3. Get your connection string
4. Update `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/workout-tracker?retryWrites=true&w=majority
   ```

### 2. Generate Auth Secret

Run this command in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add it to `.env.local`:
```env
AUTH_SECRET=your_generated_secret_here
```

### 3. (Optional) Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

### 4. Restart the Server

After updating `.env.local`:
```powershell
npm run dev
```

### 5. Create Your Account

1. Visit http://localhost:3002
2. Click "Sign Up"
3. Create an account with email/password

### 6. Load Your Workout Plans

After creating your account, run this command:
```powershell
npx tsx scripts/seed-workout-plans.ts your@email.com
```

This will populate both Plan A and Plan B with all 72 exercises (6 days × 12 exercises each).

## 🎮 Using the App

### Dashboard
- View recovery status for each muscle group
- See which plan (A or B) is active this week
- Quick stats on recent workouts

### Log a Workout
1. Go to "New Workout"
2. Select date and plan type (auto-suggested based on current week)
3. Exercises from your plan are pre-loaded
4. Log sets, reps, weight, and RPE for each exercise
5. Rate workout intensity and sleep quality
6. Submit to save

### View History
- See all past workouts
- Filter by date range or muscle group
- View detailed exercise breakdowns

### Track Progress
- Interactive charts showing:
  - Volume trends (sets × reps × weight)
  - Strength progression by exercise
  - Recovery patterns
  - Training consistency

### Manage Plans
- Edit Plan A and Plan B templates
- Add/remove exercises
- Adjust target sets and reps

## 🔥 Key Features

### Recovery Estimation
The app calculates recovery time based on:
- RPE (Rate of Perceived Exertion)
- Training volume (total sets)
- Workout intensity
- Sleep quality
- Training frequency
- Your experience level

### Automatic Plan Rotation
- Week 1, 3, 5, 7, etc. → Plan A
- Week 2, 4, 6, 8, etc. → Plan B
- No manual switching needed!

### Progress Tracking
- Volume over time
- Strength gains per exercise
- Body measurements (optional)
- Personal records

## 📝 Example Workout Flow

1. **Monday (Week 1 - Plan A)**
   - App suggests "Chest + Triceps - Plan A"
   - Pre-loaded with 12 exercises:
     - Flat DB Press (4 sets)
     - Incline DB Press (4 sets)
     - Plate-Loaded Chest Press (3 sets)
     - ... (9 more exercises)

2. **Log Each Exercise**
   - Set 1: 40kg × 10 reps @ RPE 7
   - Set 2: 40kg × 9 reps @ RPE 8
   - Set 3: 35kg × 10 reps @ RPE 8
   - Set 4: 35kg × 8 reps @ RPE 9

3. **Complete Workout**
   - Rate intensity: "Hard"
   - Last night's sleep: "Good" (7-8 hours)
   - Submit

4. **View Recovery**
   - Dashboard shows estimated recovery time for chest/triceps
   - Tracks when you'll be ready to train again

## 🚀 Deployment (When Ready)

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to deploy to Vercel. Make sure to add your environment variables in the Vercel dashboard.

## 💡 Tips

1. **Log workouts consistently** for accurate recovery estimates
2. **Be honest with RPE** ratings - they're crucial for recovery calculations
3. **Track sleep quality** - it significantly affects recovery time
4. **Review progress weekly** to see strength and volume trends
5. **Adjust plans as needed** - the app is flexible and customizable

## 🐛 Troubleshooting

### App won't connect to MongoDB
- Check your connection string in `.env.local`
- Make sure your IP is whitelisted in MongoDB Atlas
- Verify username/password are URL-encoded

### Can't sign in
- Make sure AUTH_SECRET is set in `.env.local`
- Clear browser cache and cookies
- Try a different browser

### Plans not showing up
- Run the seed script: `npx tsx scripts/seed-workout-plans.ts your@email.com`
- Check MongoDB Atlas to verify data was inserted
- Refresh the browser

## 📞 Need Help?

Check the other documentation files:
- `README.md` - Full technical documentation
- `FEATURES.md` - Detailed feature explanations
- `API.md` - API endpoint reference
- `DEVELOPMENT.md` - Development guide

---

**Enjoy tracking your workouts! 💪🏋️‍♂️**
