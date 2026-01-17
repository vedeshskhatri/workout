# 📱 Android App Installation Guide

Your Workout Tracker is a **Progressive Web App (PWA)** that can be installed on Android devices just like a native app!

## What is a PWA?

A Progressive Web App provides an app-like experience:
- ✅ Works offline
- ✅ Install on home screen
- ✅ Full-screen experience
- ✅ No app store required
- ✅ Automatic updates
- ✅ Fast loading
- ✅ Push notifications (future)

## Installation Methods

### Method 1: Chrome Browser (Recommended)

1. **Open your app** in Chrome:
   - Go to: `https://your-app-name.vercel.app`

2. **Install the app:**
   - Tap the **3-dot menu** (⋮) in Chrome
   - Select **"Add to Home screen"** or **"Install app"**
   - Tap **"Install"** in the popup
   - Choose a name (default: "Workout Tracker")
   - Tap **"Add"**

3. **Launch the app:**
   - Find the **Workout Tracker** icon on your home screen
   - Tap to open in full-screen mode!

### Method 2: Install Banner

When you visit the app, Chrome may automatically show an install banner:

1. **Look for the banner** at the bottom of the screen
2. Tap **"Install"**
3. App icon appears on home screen automatically!

### Method 3: Samsung Internet

1. Open the app in Samsung Internet browser
2. Tap the **Menu** button
3. Select **"Add page to"** → **"Home screen"**
4. Confirm installation

### Method 4: Firefox

1. Open the app in Firefox browser
2. Tap the **Home icon** with a **+** sign in the address bar
3. Select **"Add to Home screen"**
4. Tap **"Add"**

## Features Available on Android

### ✅ Already Working:
- **Full-screen app** - No browser UI
- **Home screen icon** - Custom gradient dumbbell icon
- **Offline viewing** - View cached workouts
- **Fast loading** - Optimized performance
- **App shortcuts** - Long-press icon for quick actions:
  - 🏋️ Start Workout
  - 📊 View History
  - 📈 Track Progress

### 🔄 Coming Soon:
- **Offline workout logging**
- **Background sync**
- **Push notifications** for recovery reminders
- **Workout reminders**

## Updating the App

PWA updates happen automatically! 

When a new version is deployed:
1. Close the app completely
2. Open it again
3. New version loads automatically ✨

Or force update:
1. Long-press app icon
2. Select **"App info"**
3. Tap **"Storage"**
4. Tap **"Clear cache"**
5. Reopen app

## Uninstalling

### From Home Screen:
1. Long-press the Workout Tracker icon
2. Drag to **"Uninstall"** or select **"Remove"**

### From Settings:
1. Go to **Settings** → **Apps**
2. Find **"Workout Tracker"**
3. Tap **"Uninstall"**

## Permissions

The app may request:
- **Storage:** Save workout data locally
- **Notifications:** (Future) Workout reminders

All data is encrypted and stored securely!

## Troubleshooting

### "Add to Home screen" not showing?

**Solutions:**
1. Make sure you're using **Chrome** or **Samsung Internet**
2. Visit the app **at least 2 times**
3. Wait **5 minutes** between visits
4. Ensure you have **stable internet connection**
5. Clear browser cache and try again

### App icon not showing?

**Solutions:**
1. Restart your device
2. Check **Home screen** and **App drawer**
3. Try reinstalling from browser menu

### App not opening?

**Solutions:**
1. Clear app data:
   - Settings → Apps → Workout Tracker → Storage → Clear data
2. Uninstall and reinstall
3. Check internet connection

### App looks like a website?

**Make sure:**
- Installed via Chrome's "Add to Home screen"
- Not opening in browser by mistake
- Using the icon from home screen, not a bookmark

## Requirements

- **Android:** 5.0 (Lollipop) or higher
- **Browser:** Chrome 80+, Samsung Internet 12+, Firefox 85+
- **Storage:** ~10 MB for app + cache
- **Internet:** Required for initial load and sync

## Benefits vs Native App

| Feature | PWA ✅ | Native App |
|---------|--------|------------|
| Install size | ~10 MB | ~50-100 MB |
| Updates | Automatic | Manual via Play Store |
| Installation | No store needed | Play Store required |
| Development cost | Free | $25+ fees |
| Works offline | ✅ Yes | ✅ Yes |
| Full-screen | ✅ Yes | ✅ Yes |
| Push notifications | 🔄 Coming | ✅ Yes |
| Storage access | ✅ Yes | ✅ Yes |

## Testing PWA Features

### Check if installed correctly:
1. Open app from home screen
2. Should see **NO browser UI** (no address bar)
3. **Status bar color** should be blue (#3b82f6)
4. **Full screen** with rounded corners

### Test app shortcuts:
1. **Long-press** the app icon
2. Should see 3 shortcuts:
   - Start Workout
   - View History  
   - Track Progress
3. Tap any shortcut to test

## For Developers

### PWA Configuration Files:
- ✅ `/public/manifest.json` - App metadata
- ✅ `/app/layout.tsx` - PWA meta tags
- ✅ `/public/icon-*.png` - App icons (192px, 512px)

### PWA Audit:
```bash
# Run Lighthouse audit
npx lighthouse https://your-app-name.vercel.app --view

# Check PWA score (should be 90+)
```

### Service Worker (Future):
Coming soon for offline support!

---

## Need Help?

- **PWA not installing?** Try Chrome browser
- **App broken?** Clear cache and reinstall
- **Feature request?** Contact developer

Enjoy your native-like workout tracking experience! 💪📱
