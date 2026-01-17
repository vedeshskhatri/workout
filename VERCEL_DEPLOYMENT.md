# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier works great!)
- MongoDB Atlas database (already set up ✅)

## Step 1: Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete workout tracker app"

# Add remote repository
git remote add origin https://github.com/vedeshskhatri/workout.git

# Push to GitHub
git push -u origin master
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `vedeshskhatri/workout`
4. Configure your project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://masuka075_db_user@cluster0.bwrnemj.mongodb.net/workout-tracker
   AUTH_SECRET=633712570e055362e15f92146bac1f7b67bf03bd4a2e0110bf217812185816e2
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

6. Click **"Deploy"** 🚀

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? N
# - What's your project's name? workout-tracker
# - In which directory is your code located? ./
# - Want to override settings? N

# Add environment variables
vercel env add MONGODB_URI
vercel env add AUTH_SECRET
vercel env add NEXTAUTH_URL

# Deploy to production
vercel --prod
```

## Step 3: Configure MongoDB Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to **Network Access**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, use Vercel's IP addresses
5. Click **"Confirm"**

## Step 4: Update Environment Variables

After deployment, update `NEXTAUTH_URL`:

```bash
# In Vercel Dashboard
vercel env add NEXTAUTH_URL production

# Enter value: https://your-app-name.vercel.app
```

Or in Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Edit `NEXTAUTH_URL` to your actual Vercel URL

## Step 5: Redeploy

```bash
vercel --prod
```

Or trigger a new deployment from Vercel Dashboard:
- Go to Deployments tab
- Click "Redeploy"

## 🎉 Your App is Live!

Access your app at: `https://your-app-name.vercel.app`

## Automatic Deployments

Every push to `master` branch will automatically deploy to production! 🔄

## Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to your custom domain

## Monitoring & Analytics

- **Analytics:** Vercel Dashboard → Analytics tab
- **Logs:** Vercel Dashboard → Deployments → View Logs
- **Performance:** Built-in Web Vitals tracking

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild locally
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working
- Ensure variables are added for **Production** environment
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### MongoDB Connection Issues
- Verify connection string in Atlas
- Check Network Access settings
- Ensure database user has correct permissions

## Updates & Redeployments

```bash
# Make changes
git add .
git commit -m "Update: description"
git push origin master

# Automatically deploys to Vercel! ✨
```

## Performance Tips

✅ **Already Optimized:**
- Next.js 14 with App Router
- Server-side rendering
- Automatic code splitting
- Image optimization
- Font optimization (Inter font)

## Security Notes

🔒 **Never commit these to Git:**
- `.env.local` file
- MongoDB credentials
- API keys

✅ **Use Vercel Environment Variables instead!**

---

Need help? Check [Vercel Documentation](https://vercel.com/docs) or [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
