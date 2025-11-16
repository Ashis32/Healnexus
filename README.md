# Healnexus - Health Monitoring Application

A full-stack health monitoring application built with React, Express, and Firebase Realtime Database.

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Express.js + Node.js
- **Database**: Firebase Realtime Database
- **Styling**: TailwindCSS + Radix UI
- **State Management**: TanStack Query (React Query)

## Features

- Real-time health data monitoring
- Historical data tracking and visualization
- Firebase Realtime Database integration
- RESTful API endpoints
- Responsive UI with modern components

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project with Realtime Database

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database URL for Drizzle (if using PostgreSQL)
DATABASE_URL=your_database_url

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id

# Server Port (optional, defaults to 5000)
PORT=5000
```

## Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Healnexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with the required variables listed above.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5000`

## Building for Production

Build both the client and server:

```bash
npm run build
```

This will:
- Build the React frontend with Vite → `dist/public/`
- Bundle the Express server with esbuild → `dist/index.js`

Start the production server:

```bash
npm start
```

## Deploying to Vercel

### Step-by-Step Deployment Guide

#### 1. Prepare Your Repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

#### 2. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

#### 3. Deploy via Vercel Dashboard (Recommended)

1. **Sign up/Log in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub/GitLab/Bitbucket account

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select your repository from the list
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Select "Other" or "Vite"
   - **Root Directory**: Leave as `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave default (Vercel will use the configuration from `vercel.json`)
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click on "Environment Variables" and add:
   
   ```
   DATABASE_URL=your_postgresql_database_url
   FIREBASE_PROJECT_ID=your_firebase_project_id
   NODE_ENV=production
   ```

   **Important Notes:**
   - `DATABASE_URL`: Your PostgreSQL connection string (if using PostgreSQL with Drizzle)
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID (e.g., `healnexus-ea09f`)
   - Make sure your Firebase Realtime Database rules allow read/write access

5. **Deploy**
   - Click "Deploy"
   - Wait for the build and deployment to complete
   - Your app will be available at `https://your-project.vercel.app`

#### 4. Deploy via Vercel CLI (Alternative)

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

Follow the prompts to set up your project and configure environment variables.

### Post-Deployment Configuration

#### Set Up Environment Variables via CLI

```bash
# Set environment variables
vercel env add DATABASE_URL
vercel env add FIREBASE_PROJECT_ID

# Pull environment variables for local development
vercel env pull
```

#### Firebase Setup

1. Ensure your Firebase Realtime Database is set up:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Navigate to "Realtime Database"
   - Update rules if needed for production access

2. Example Firebase Rules (adjust based on your security needs):
   ```json
   {
     "rules": {
       "health": {
         ".read": true,
         ".write": true
       },
       "healthHistory": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```

### Vercel Configuration

The `vercel.json` file in the root directory contains the deployment configuration:

- **Builds**: Configures how Vercel should build your application
- **Routes**: Defines routing rules for API and static files
- **Environment**: Sets production environment variables

### Monitoring and Logs

After deployment:
- View logs in the Vercel dashboard under "Deployments" → Select your deployment → "Logs"
- Monitor performance and analytics in the Vercel dashboard

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Commits to your main/master branch
- **Preview**: Pull requests and other branches

### Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow the instructions to configure DNS

## API Endpoints

- `GET /api/health-check` - Health check endpoint
- `GET /api/health/current` - Get current health data from Firebase
- `GET /api/health/history` - Get historical health data (supports date range filtering)
- `GET /api/health/export` - Export health data (supports date range filtering)

## Project Structure

```
Healnexus/
├── client/              # React frontend
│   ├── src/
│   ├── index.html
│   └── public/
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── firebase.ts      # Firebase service
│   ├── vite.ts          # Vite dev/prod setup
│   └── storage.ts
├── shared/              # Shared types and schemas
│   └── schema.ts
├── dist/                # Build output (generated)
│   ├── public/          # Frontend build
│   └── index.js         # Server bundle
├── vercel.json          # Vercel configuration
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

## Troubleshooting

### Build Failures on Vercel

1. **Check Node version**: Vercel uses Node.js 18.x by default. Ensure compatibility.
2. **Review build logs**: Check the deployment logs in Vercel dashboard.
3. **Environment variables**: Verify all required environment variables are set.

### Database Connection Issues

- Ensure `DATABASE_URL` is correctly set in Vercel environment variables
- Check that your database allows connections from Vercel's IP ranges
- For PostgreSQL, you may need to use connection pooling (e.g., Neon, Supabase)

### Firebase Connection Issues

- Verify `FIREBASE_PROJECT_ID` is correct
- Check Firebase Realtime Database rules
- Ensure Firebase project is active and not in billing issues

### API Routes Not Working

- Verify `vercel.json` routing configuration
- Check that API routes start with `/api/` prefix
- Review server logs in Vercel dashboard

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes (Drizzle)

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
