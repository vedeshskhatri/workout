# API Documentation

## Authentication

All API routes (except `/api/auth/*`) require authentication via NextAuth.js session.

### POST `/api/auth/register`

Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "experienceLevel": "intermediate"
}
```

**Response:**
```json
{
  "success": true
}
```

---

## Workouts

### POST `/api/workouts`

Create a new workout session.

**Request Body:**
```json
{
  "planType": "A",
  "date": "2026-01-17T00:00:00.000Z",
  "exercises": [
    {
      "exerciseName": "Bench Press",
      "muscleGroup": "chest",
      "sets": [
        { "reps": 10, "weight": 80, "rpe": 8 },
        { "reps": 8, "weight": 85, "rpe": 9 }
      ],
      "notes": "Felt strong today"
    }
  ],
  "overallIntensity": "hard",
  "sleepQuality": "good",
  "duration": 60,
  "notes": "Great workout!"
}
```

**Response:**
```json
{
  "success": true,
  "workout": { /* workout object */ },
  "recoveryEstimates": [
    {
      "muscleGroup": "chest",
      "lastTrainedDate": "2026-01-17T00:00:00.000Z",
      "recommendedNextTraining": "2026-01-19T12:00:00.000Z",
      "recoveryHours": 60,
      "factors": {
        "rpe": 8.5,
        "totalSets": 2,
        "intensity": "hard",
        "sleepQuality": "good",
        "daysSinceLastTraining": 3
      }
    }
  ]
}
```

### GET `/api/workouts`

Retrieve workout sessions.

**Query Parameters:**
- `limit` (optional): Number of workouts to return (default: 50)
- `planType` (optional): Filter by plan ('A' or 'B')
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string

**Example:**
```
GET /api/workouts?limit=20&planType=A&startDate=2026-01-01
```

**Response:**
```json
{
  "workouts": [
    {
      "_id": "...",
      "userId": "...",
      "planType": "A",
      "date": "2026-01-17T00:00:00.000Z",
      "exercises": [ /* ... */ ],
      "overallIntensity": "hard",
      "sleepQuality": "good",
      "duration": 60,
      "notes": "Great workout!",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

## Workout Plans

### GET `/api/plans`

Get a specific workout plan.

**Query Parameters:**
- `planType` (required): 'A' or 'B'

**Example:**
```
GET /api/plans?planType=A
```

**Response:**
```json
{
  "plan": {
    "_id": "...",
    "userId": "...",
    "planType": "A",
    "exercises": [
      {
        "id": "...",
        "name": "Bench Press",
        "muscleGroup": "chest",
        "targetSets": 4,
        "targetReps": "8-10",
        "notes": "Focus on form"
      }
    ],
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### POST `/api/plans`

Create or update a workout plan.

**Request Body:**
```json
{
  "planType": "A",
  "exercises": [
    {
      "id": "1",
      "name": "Bench Press",
      "muscleGroup": "chest",
      "targetSets": 4,
      "targetReps": "8-10",
      "notes": "Focus on form"
    },
    {
      "id": "2",
      "name": "Squats",
      "muscleGroup": "legs",
      "targetSets": 4,
      "targetReps": "10-12",
      "notes": ""
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "plan": { /* updated plan object */ }
}
```

---

## Error Responses

All endpoints may return these error responses:

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": [ /* zod validation errors */ ]
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider adding rate limiting middleware for security.

---

## Data Types

### PlanType
```typescript
type PlanType = 'A' | 'B';
```

### MuscleGroup
```typescript
type MuscleGroup = 
  | 'chest' | 'back' | 'shoulders'
  | 'biceps' | 'triceps' | 'legs'
  | 'quads' | 'hamstrings' | 'glutes'
  | 'calves' | 'abs' | 'core' | 'full-body';
```

### ExperienceLevel
```typescript
type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
```

### Intensity
```typescript
type Intensity = 'light' | 'moderate' | 'hard' | 'very-hard';
```

### SleepQuality
```typescript
type SleepQuality = 'poor' | 'good' | 'excellent';
```

---

## Authentication Flow

1. **Register**: POST to `/api/auth/register`
2. **Sign In**: Use NextAuth's built-in sign-in page or API
3. **Session**: Automatically handled by NextAuth.js
4. **Authenticated Requests**: Include session cookie in all requests

NextAuth.js handles session management automatically when using the provided hooks and middleware.
