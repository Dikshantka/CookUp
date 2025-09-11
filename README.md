# CookUp - Social Authentication App

A modern Next.js application with beautiful, modular social authentication and a clean, production-ready structure.

---

## 🚀 Features

- **Custom Registration** with email/password validation
- **7 Social Login Providers**: Google, Facebook, GitHub, Twitter/X, LinkedIn, Apple, Microsoft
- **Auth0 Integration** (OAuth2)
- **MongoDB Database** for user storage
- **Modular, Reusable Components**
- **Centralized Styling System**
- **TypeScript Type Safety**
- **Production-Ready File Structure**

---

## 📦 Project Structure

```
CookUp/
├── app/                     # Next.js App Router pages
├── src/                     # Modular components, styles, types, utils
├── config/                  # All configuration files (symlinked to root)
├── docs/                    # Documentation
├── lib/                     # Database connections
├── public/                  # Static assets
├── scripts/                 # Automation scripts
├── PORTABLE-SOCIAL-LOGIN/   # Standalone social login package
├── middleware.ts            # Next.js middleware
├── package.json             # Project dependencies
└── README.md                # This documentation
```

---

## 🧩 Portable Social Login

A complete, standalone package for social authentication you can use in any Next.js project:

- **Location:** `PORTABLE-SOCIAL-LOGIN/`
- **How to use:**
  1. Copy the folder to your new project
  2. Import and use `<SocialLoginPanel />` or `<SocialLoginButton />`
  3. Customize styles and providers as needed
- **See `PORTABLE-SOCIAL-LOGIN/README.md` for full details**

---

## ⚙️ Setup & Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```
4. **Environment variables:**
   - All config files are in `config/` and symlinked to root
   - Edit `.env.local` in `config/env/` for secrets

---

## 🎨 Social Login Example

```tsx
import { SocialLoginPanel } from './src/components/auth/SocialLoginPanel';

<SocialLoginPanel mode="register" />
```

---

## 📚 Documentation

- All extra documentation is in the `docs/` folder
- See `PORTABLE-SOCIAL-LOGIN/README.md` for portable social login usage

---

## 🏆 Status

- **Production-ready**
- **All pages and features working perfectly**
- **Clean, maintainable, scalable structure**
- **Ready for team development and future growth**

---

**Made with ❤️ using Next.js, React, TypeScript, and Auth0**
