# Workout Tracker - Vercel Deployment Checklist

## Pre-Deployment

- [ ] Code pushed to GitHub repository
- [ ] MongoDB Atlas cluster created and connection string ready
- [ ] AUTH_SECRET generated (use: `openssl rand -base64 32`)
- [ ] Google OAuth credentials created (if using Google sign-in)

## Vercel Setup

1. **Import Project**
   - [ ] Go to vercel.com and sign in
   - [ ] Click "Add New" → "Project"
   - [ ] Import your GitHub repository
   - [ ] Vercel auto-detects Next.js (no configuration needed)

2. **Environment Variables** (Settings → Environment Variables)
   - [ ] `MONGODB_URI` = `mongodb+srv://...`
   - [ ] `AUTH_SECRET` = `[your-generated-secret]`
   - [ ] `NEXTAUTH_URL` = `https://your-app.vercel.app`
   - [ ] `GOOGLE_CLIENT_ID` = `[your-google-id]` (optional)
   - [ ] `GOOGLE_CLIENT_SECRET` = `[your-google-secret]` (optional)

3. **Deploy**
   - [ ] Click "Deploy"
   - [ ] Wait 1-2 minutes for build to complete

## Post-Deployment

- [ ] Test registration and login
- [ ] Create a test workout
- [ ] Verify recovery calculations appear
- [ ] Test on mobile device
- [ ] Check dark mode works

## Update Google OAuth (if using)

- [ ] Go to Google Cloud Console
- [ ] Add authorized redirect URI: `https://your-app.vercel.app/api/auth/callback/google`
- [ ] Save changes

## MongoDB Atlas Network Access

- [ ] In MongoDB Atlas, go to Network Access
- [ ] Add IP address `0.0.0.0/0` (allow from anywhere)
  - This is needed for Vercel's dynamic IPs
  - Safe because you're using authentication

## Custom Domain (Optional)

- [ ] In Vercel project → Settings → Domains
- [ ] Add your custom domain
- [ ] Follow DNS configuration instructions
- [ ] Update `NEXTAUTH_URL` to your custom domain

## Troubleshooting

**Can't connect to database:**
- Check MongoDB network access allows 0.0.0.0/0
- Verify MONGODB_URI is correct
- Ensure IP whitelist includes Vercel

**Auth not working:**
- Verify AUTH_SECRET is set
- Check NEXTAUTH_URL matches deployment URL
- For Google: verify redirect URI is correct

**Build fails:**
- Check for TypeScript errors locally first
- Review Vercel build logs
- Ensure all dependencies are in package.json

## Success! 🎉

Your workout tracker is now live and ready to use!

Visit: https://your-app.vercel.app
