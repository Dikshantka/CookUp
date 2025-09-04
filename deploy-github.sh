#!/bin/bash

# 🚀 GitHub Deployment Script - Add to existing CookUp repository
# This script helps you add your Secure Notes App to your existing CookUp repository

echo "🚀 Adding Secure Notes App to CookUp repository..."
echo ""

# Get the current directory name
current_dir=$(basename "$PWD")
echo "📁 Current directory: $current_dir"
echo ""

echo "This will add your Secure Notes App to your existing CookUp repository."
echo "Repository: git@github.com:Dikshantka/CookUp.git"
echo ""

read -p "Continue? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "� Adding files to Git..."
git add .

echo ""
echo "💬 Creating commit..."
git commit -m "Add Secure Notes App: Next.js app with Auth0 authentication and MongoDB

- Complete secure authentication system with Auth0
- Personal notes management with MongoDB
- Responsive UI with TypeScript
- Production ready for Vercel deployment
- Comprehensive documentation and security features"

echo ""
echo "� Setting remote to CookUp repository..."
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:Dikshantka/CookUp.git

echo ""
echo "📥 Fetching latest changes..."
git fetch origin

echo ""
echo "🌿 Checking out main branch..."
git checkout -B main

echo ""
echo "� Merging with existing repository (if any conflicts, resolve manually)..."
git pull origin main --allow-unrelated-histories || echo "⚠️  No existing content or merge conflicts - this is normal for new additions"

echo ""
echo "🚀 Pushing to CookUp repository..."
git push -u origin main

echo ""
echo "🎉 Successfully added Secure Notes App to CookUp repository!"
echo "📝 Repository URL: https://github.com/Dikshantka/CookUp"
echo ""
echo "Next steps:"
echo "1. Go to vercel.com and connect your CookUp repository"
echo "2. Set the root directory to 'secure-app copy' (or rename this folder)"
echo "3. Add your environment variables in Vercel dashboard"
echo "4. Update your Auth0 settings with production URLs"
echo "5. Deploy to Vercel!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
