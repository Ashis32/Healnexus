# Quick Vercel Deployment Guide

## Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)
- Firebase project set up with Realtime Database

## Deployment Steps

### 1. Push Your Code to Git
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy on Vercel

#### Option A: Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import your repository
4. Configure:
   - Framework: Select "Other" or "Vite"
   - Build Command: `npm run build`
   - Root Directory: `./`
5. Add Environment Variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   FIREBASE_PROJECT_ID=your_firebase_project_id
   NODE_ENV=production
   ```
6. Click "Deploy"
7. Wait for deployment to complete
8. Your app will be live at `https://your-project.vercel.app`

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 3. Set Environment Variables (CLI Method)

```bash
vercel env add DATABASE_URL
# Enter your PostgreSQL connection string when prompted

vercel env add FIREBASE_PROJECT_ID
# Enter your Firebase project ID when prompted

vercel env add NODE_ENV
# Enter: production
```

### 4. Firebase Configuration

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project
3. Navigate to "Realtime Database"
4. Update rules for production (adjust based on your security needs):
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

### 5. Verify Deployment

1. Open your Vercel app URL
2. Check the following:
   - Frontend loads correctly
   - API endpoint works: `https://your-app.vercel.app/api/health-check`
   - Health data is being fetched from Firebase

### 6. Monitor and Debug

- View logs: Vercel Dashboard → Your Project → Deployments → [Latest] → Logs
- Check Function Logs for API errors
- Monitor performance in the Vercel dashboard

## Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `healnexus-ea09f` |
| `NODE_ENV` | Environment mode | `production` |

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Review build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

### API Routes Don't Work
- Verify `vercel.json` is in the root directory
- Check that environment variables are set
- Review Function Logs in Vercel dashboard

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure database allows connections from Vercel IPs
- Consider using connection pooling (Neon, Supabase)

### Firebase Connection Issues
- Verify `FIREBASE_PROJECT_ID` is correct
- Check Firebase Realtime Database rules
- Ensure Firebase project is active

## Automatic Deployments

Once set up, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for DNS propagation (can take up to 48 hours)

## Support

For detailed documentation, see [README.md](./README.md)

For issues:
- Check Vercel Status: https://www.vercel-status.com/
- Check Firebase Status: https://status.firebase.google.com/
- Review deployment logs in Vercel dashboard
- Create an issue in the GitHub repository
