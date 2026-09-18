# GitHub Deployment Guide for Silence AI Website

## Step 1: Add Your GitHub Repository as Remote

Since you already have a git repository initialized and a GitHub repo created, you need to add the remote:

```bash
# Add your GitHub repository as the origin
git remote add origin git@github.com:Zeinullahh/pecehnka.git

# Verify the remote was added
git remote -v
```

## Step 2: Stage and Commit Your Changes

First, let's clean up the git status by removing deleted files and adding new ones:

```bash
# Remove deleted files from git tracking
git add -u

# Add all new files
git add .

# Check the status to see what will be committed
git status

# Commit your changes with a descriptive message
git commit -m "feat: Complete Silence AI website with policies pages, animations, and modal functionality

- Added modal popup for header buttons across all policy pages
- Enhanced PolicySidebar with Framer Motion animations
- Improved table of contents navigation with active section highlighting
- Fixed Terms of Use page modal integration
- Added smooth scrolling and visual feedback"
```

## Step 3: Push to GitHub

```bash
# Push to the main branch (you might need to set upstream first)
git push -u origin main
```

If you get an error about the branch not existing, try:
```bash
git push origin main
```

## Step 4: Set Up GitHub Pages for Deployment

### Option A: Deploy to GitHub Pages (Static Site)

Since this is a Next.js project, you can deploy it as a static site:

1. **Update your `next.config.mjs`** to enable static export:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

2. **Add deployment scripts to `package.json`**:
```json
{
  "scripts": {
    "build": "next build",
    "export": "next export",
    "deploy": "npm run build && npm run export"
  }
}
```

3. **Create `.github/workflows/deploy.yml`** for GitHub Actions:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build and export
      run: npm run deploy
    
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v1
      with:
        path: ./out

  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v1
```

### Option B: Deploy to Vercel (Recommended for Next.js)

Vercel is the optimal platform for Next.js applications:

1. **Go to [vercel.com](https://vercel.com)** and sign up with your GitHub account
2. **Import your GitHub repository** from the Vercel dashboard
3. **Configure deployment settings**:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)

4. **Vercel will automatically deploy** on every push to main

## Step 5: Environment Variables (If Needed)

If you have any environment variables (API keys, etc.), create a `.env.local` file (but don't commit it):

```bash
# Add to .gitignore
echo ".env.local" >> .gitignore
```

For Vercel, add environment variables in the project settings dashboard.

## Step 6: Custom Domain (Optional)

If you want to use your custom domain `silenceai.net`:

1. **In Vercel**: Go to Project Settings → Domains
2. **Add your domain**: `silenceai.net`
3. **Update DNS records** at your domain registrar to point to Vercel's nameservers

## Step 7: Pulling from Another Host

To pull your project on another machine:

```bash
# Clone the repository
git clone git@github.com:Zeinullahh/pecehnka.git

# Navigate to the project
cd pecehnka

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Important Files to Check Before Deployment

Make sure these files are properly configured:

1. **`package.json`** - Contains all dependencies and scripts
2. **`next.config.mjs`** - Next.js configuration
3. **`jsconfig.json`** - Path aliases for imports
4. **`.gitignore`** - Excludes node_modules, .env files, etc.

## Troubleshooting

### If you get authentication errors:
```bash
# Set up SSH key for GitHub
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add the public key to GitHub Settings → SSH and GPG keys
```

### If you get merge conflicts:
```bash
# Pull latest changes and resolve conflicts
git pull origin main
# Resolve conflicts, then commit and push
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

## Deployment URLs

After deployment, your site will be available at:
- **GitHub Pages**: `https://zeinullahh.github.io/pecehnka`
- **Vercel**: `https://pecehnka.vercel.app` (or your custom domain)

## Next Steps

1. Run the commands in Step 1-3 to push to GitHub
2. Choose either Option A (GitHub Pages) or Option B (Vercel) for deployment
3. Test the deployed website thoroughly
4. Set up your custom domain if needed

Your Silence AI cybersecurity website is ready for deployment! 🚀
