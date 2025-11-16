import { Octokit } from '@octokit/rest';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function pushToGitHub() {
  try {
    console.log('🚀 Starting GitHub push process...');
    
    const accessToken = await getAccessToken();
    
    // Configure git
    console.log('📝 Configuring git...');
    execSync('git config --global user.name "Replit User"', { stdio: 'inherit' });
    execSync('git config --global user.email "user@replit.com"', { stdio: 'inherit' });
    
    // Initialize git if not already initialized
    try {
      execSync('git rev-parse --git-dir', { stdio: 'pipe' });
      console.log('✓ Git repository already initialized');
    } catch {
      console.log('Initializing git repository...');
      execSync('git init', { stdio: 'inherit' });
    }
    
    // Add all files
    console.log('📦 Adding files to git...');
    execSync('git add .', { stdio: 'inherit' });
    
    // Commit changes
    console.log('💾 Committing changes...');
    try {
      execSync('git commit -m "Initial commit: HealNexus Health Monitoring Dashboard"', { stdio: 'inherit' });
    } catch (error: any) {
      if (error.message.includes('nothing to commit')) {
        console.log('✓ No changes to commit');
      } else {
        throw error;
      }
    }
    
    // Set remote
    const repoUrl = `https://x-access-token:${accessToken}@github.com/Ashis32/Healnexus.git`;
    console.log('🔗 Setting remote repository...');
    
    try {
      execSync('git remote remove origin', { stdio: 'pipe' });
    } catch {
      // Remote doesn't exist yet
    }
    
    execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });
    
    // Push to GitHub
    console.log('⬆️  Pushing to GitHub...');
    try {
      execSync('git push -u origin main --force', { stdio: 'inherit' });
    } catch {
      // Try master branch if main doesn't work
      console.log('Trying master branch...');
      execSync('git branch -M main', { stdio: 'inherit' });
      execSync('git push -u origin main --force', { stdio: 'inherit' });
    }
    
    console.log('\n✅ Successfully pushed code to https://github.com/Ashis32/Healnexus.git');
    console.log('🎉 Your HealNexus dashboard is now on GitHub!');
    
  } catch (error) {
    console.error('❌ Error pushing to GitHub:', error);
    process.exit(1);
  }
}

pushToGitHub();
