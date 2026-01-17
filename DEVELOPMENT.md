# Development Guide

## Project Overview

This is a Next.js 14 application using the App Router, TypeScript, MongoDB, and NextAuth.js v5.

## Development Workflow

### Starting the App

```bash
npm run dev
```

The app runs on http://localhost:3000

### Project Structure

- **`app/`** - Next.js App Router pages and API routes
- **`components/`** - React components
- **`lib/`** - Utility functions and core logic
- **`models/`** - Mongoose database models
- **`types/`** - TypeScript type definitions

### Key Files

- **`lib/recovery-estimation.ts`** - Core recovery time calculation algorithm
- **`lib/workout-plan.ts`** - Week-based plan rotation logic
- **`auth.ts`** - NextAuth.js v5 configuration
- **`middleware.ts`** - Route protection

## Database Schema

### User
- email (unique, required)
- name
- password (hashed)
- experienceLevel (beginner/intermediate/advanced)

### WorkoutPlan
- userId (ref to User)
- planType ('A' or 'B')
- exercises array

### WorkoutSession
- userId (ref to User)
- planType ('A' or 'B')
- date
- exercises array (with sets)
- overallIntensity
- sleepQuality
- duration
- notes

## Core Features Implementation

### 1. Alternating A/B Plans

The app uses ISO week numbers to determine which plan is active:
- Odd weeks (1, 3, 5...) → Plan A
- Even weeks (2, 4, 6...) → Plan B

See: `lib/workout-plan.ts`

### 2. Recovery Estimation

The recovery algorithm considers:
- User experience level
- RPE (Rate of Perceived Exertion)
- Total sets per muscle group
- Overall session intensity
- Sleep quality
- Days since last training

See: `lib/recovery-estimation.ts`

### 3. Progress Tracking

Charts display:
- Max weight progression over time
- Total volume per session
- Session frequency

Uses Recharts for visualization.

## Common Development Tasks

### Adding a New API Route

1. Create file in `app/api/[route]/route.ts`
2. Export GET, POST, PUT, DELETE handlers
3. Use `auth()` from `@/auth` to check authentication
4. Connect to DB with `connectDB()`
5. Use Mongoose models to query data

Example:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  await connectDB();
  
  // Your logic here
  
  return NextResponse.json({ data: 'response' });
}
```

### Adding a New Page

1. Create file in `app/[route]/page.tsx`
2. Make it a Server Component by default
3. Fetch data with `await` (no useEffect needed!)
4. For client interactivity, create separate client components

Example:
```typescript
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/auth/signin');
  }
  
  // Fetch data here
  
  return <div>My Page</div>;
}
```

### Adding a New Component

1. Create file in `components/MyComponent.tsx`
2. Add `'use client'` if it needs client-side features
3. Import and use in pages

### Modifying Recovery Algorithm

Edit `lib/recovery-estimation.ts`:
- Adjust base recovery times in `calculateRecoveryHours()`
- Modify factor weights
- Test with different inputs

## Environment Variables

Required:
- `MONGODB_URI` - MongoDB connection string
- `AUTH_SECRET` - Secret for JWT signing
- `NEXTAUTH_URL` - App URL

Optional:
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth

## Testing Locally

### Manual Testing Checklist

- [ ] Register new user
- [ ] Sign in
- [ ] Create Plan A with exercises
- [ ] Create Plan B with exercises
- [ ] Log a workout
- [ ] Check recovery recommendations appear
- [ ] View history page
- [ ] View progress charts
- [ ] Test dark mode toggle
- [ ] Test mobile responsive design

### Testing Recovery Algorithm

Use different combinations:
1. Beginner + High RPE + High Volume = Long recovery
2. Advanced + Low RPE + Low Volume = Short recovery
3. Poor sleep + Hard intensity = Extended recovery

## Common Issues

### MongoDB Connection Errors

- Check MONGODB_URI is correct
- Ensure IP is whitelisted in MongoDB Atlas
- Verify network connectivity

### Auth Not Working

- Clear browser cookies
- Regenerate AUTH_SECRET
- Check NEXTAUTH_URL matches your domain

### TypeScript Errors

- Run `npm run lint` to check
- Ensure all types are imported from `@/types`
- Check Mongoose model types match interfaces

## Performance Tips

1. **Use Server Components** - Default in App Router, faster initial load
2. **Lazy Load Charts** - Recharts is heavy, consider dynamic imports
3. **Index MongoDB Queries** - Add indexes to frequently queried fields
4. **Optimize Images** - Use Next.js Image component
5. **Minimize Client JS** - Only use 'use client' when necessary

## Code Style

- Use TypeScript strict mode
- Prefer async/await over promises
- Use Tailwind for styling
- Keep components small and focused
- Add comments for complex logic

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add: description of changes"

# Push to GitHub
git push origin feature/my-feature

# Create pull request (if working with team)
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment guide.

Quick deploy:
```bash
git push origin main
# Vercel auto-deploys from main branch
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## Support

For bugs or feature requests, create an issue on GitHub.

Happy coding! 🚀
