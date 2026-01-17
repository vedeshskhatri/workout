# Quick Start Guide

## First Time Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your MongoDB URI
   - Generate AUTH_SECRET: `openssl rand -base64 32`

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Go to http://localhost:3000
   - Create an account
   - Start logging workouts!

## MongoDB Atlas Setup (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (Free M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string to `.env.local`

## Deploy to Vercel (5 minutes)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables
5. Deploy!

That's it! 🚀
