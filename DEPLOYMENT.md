# 🚀 Deployment Checklist

Use this checklist to ensure error-free deployment to GitHub and Vercel.

## ✅ Pre-Deployment Checklist

### 1. **Code Quality**
- [x] Build passes locally (`npm run build`)
- [x] No TypeScript errors
- [x] No ESLint warnings
- [x] All features tested locally

### 2. **Security**
- [x] `.env.local` is in `.gitignore`
- [x] No sensitive data in code
- [x] `.env.example` has placeholder values
- [x] All secrets are properly configured

### 3. **GitHub Preparation**
- [x] Code is clean and documented
- [x] README is comprehensive
- [x] `.gitignore` is properly configured

## 🔧 GitHub Deployment Steps

### Adding to existing CookUp repository:

```bash
# 1. Add files to your existing repository
git add .
git commit -m "Add Secure Notes App: Next.js app with Auth0 and MongoDB"

# 2. Push to your CookUp repository
git remote add origin git@github.com:Dikshantka/CookUp.git
git push -u origin main
```

### Alternative: Use the deployment script
```bash
# Make script executable and run
chmod +x deploy-github.sh
./deploy-github.sh
```

## 🌍 Vercel Deployment Steps

### 1. **Connect Repository**
- Go to [vercel.com](https://vercel.com)
- Connect your GitHub account
- Import your CookUp repository

### 2. **Configure Root Directory**
Since this app is in a subdirectory of CookUp:
- In Vercel project settings, set **Root Directory** to: `secure-app copy`
- Or rename this folder to something like `secure-notes-app` for cleaner paths

### 3. **Environment Variables**
Add these in Vercel Dashboard → Settings → Environment Variables:

```env
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_SECRET=your-production-secret-32-chars
AUTH0_BASE_URL=https://your-app.vercel.app
MONGODB_URI=your-mongodb-connection-string
NOTE_ENCRYPTION_KEY=your-32-byte-encryption-key
```

### 3. **Auth0 Production Settings**
Update your Auth0 application with production URLs:

**Allowed Callback URLs:**
```
https://your-cookup-app.vercel.app/api/auth/callback
```

**Allowed Logout URLs:**
```
https://your-cookup-app.vercel.app
```

**Allowed Web Origins:**
```
https://your-cookup-app.vercel.app
```

### 4. **Deploy**
- Click "Deploy" in Vercel
- Wait for build to complete
- Test your production app

## 🧪 Post-Deployment Testing

### Test these features on your live app:
- [ ] Homepage loads correctly
- [ ] Login flow works
- [ ] Notes page requires authentication
- [ ] Can create and view notes
- [ ] Logout works properly
- [ ] Profile API returns user data

## 🚨 Troubleshooting

### Common Issues:

**Build Fails:**
- Check environment variables are set
- Verify MongoDB connection string format
- Ensure Auth0 credentials are correct

**Authentication Issues:**
- Verify Auth0 callback URLs
- Check AUTH0_BASE_URL matches your domain
- Ensure Auth0 secret is 32+ characters

**Database Issues:**
- Verify MongoDB Atlas IP whitelist
- Check database user permissions
- Ensure connection string is quoted properly

## 📞 Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Auth0 Docs:** https://auth0.com/docs
- **MongoDB Docs:** https://docs.mongodb.com/

---

**You're ready for deployment! 🎉**
