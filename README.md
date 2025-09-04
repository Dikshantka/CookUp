# 🔐 Secure Notes App

A modern, secure note-taking application built with Next.js 15, Auth0 authentication, and MongoDB. Features end-to-end security, server-side rendering, and a beautiful user interface.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Auth0](https://img.shields.io/badge/Auth0-4.9.0-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-6.19.0-green)

## ✨ Features

- 🔐 **Secure Authentication** - OAuth2 flow with Auth0
- 📝 **Personal Notes** - Create, view, and manage private notes
- 🛡️ **Security First** - HTTP-only cookies, CSRF protection, encrypted sessions
- 🚀 **Modern Stack** - Next.js 15 with App Router, TypeScript, Server Components
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast & Scalable** - Optimized for Vercel deployment
- 🗄️ **MongoDB Integration** - Reliable data persistence
- 🔒 **Encryption Ready** - Built-in crypto utilities for data encryption

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Authentication**: Auth0 (OAuth2)
- **Database**: MongoDB Atlas
- **Deployment**: Vercel
- **Styling**: CSS-in-JS (inline styles)
- **Security**: HTTP-only cookies, encrypted sessions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Auth0 account
- Git

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd secure-notes-app
npm install
```

### 2. Environment Setup

Create `.env.local` in the root directory:

```env
# Auth0 Configuration
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_SECRET=your-long-random-secret-32-chars-minimum
AUTH0_BASE_URL=http://localhost:3000

# MongoDB Configuration  
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"

# Encryption Key (32 bytes, hex or base64)
NOTE_ENCRYPTION_KEY=your-32-byte-encryption-key-in-hex
```

### 3. Auth0 Setup

1. **Create Auth0 Application**:
   - Go to [Auth0 Dashboard](https://manage.auth0.com/)
   - Create a new "Regular Web Application"
   - Note your Domain, Client ID, and Client Secret

2. **Configure Application URLs**:
   ```
   Allowed Callback URLs: http://localhost:3000/api/auth/callback
   Allowed Logout URLs: http://localhost:3000
   Allowed Web Origins: http://localhost:3000
   ```

3. **Generate Auth0 Secret**:
   ```bash
   openssl rand -hex 32
   ```

### 4. MongoDB Setup

1. **Create MongoDB Atlas Cluster**:
   - Sign up at [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster
   - Get your connection string

2. **Configure Database Access**:
   - Create a database user
   - Whitelist your IP address
   - Update the connection string in `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app! 🎉

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/           # Auth0 OAuth2 handlers
│   │   │   ├── login/      # Initiate login
│   │   │   ├── logout/     # Handle logout  
│   │   │   ├── callback/   # OAuth2 callback
│   │   │   └── profile/    # User profile API
│   │   └── notes/          # Notes CRUD API
│   ├── notes/              # Notes page & client
│   ├── lib/                # MongoDB connection
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── lib/                    # Utility libraries
│   ├── auth0.ts           # Auth0 configuration
│   ├── crypto.ts          # Encryption utilities
│   └── mongodb.ts         # Database connection
├── middleware.ts           # Next.js middleware
└── vercel.json            # Vercel deployment config
```

## 🔐 Security Features

- **OAuth2 Authentication** - Industry-standard security
- **HTTP-Only Cookies** - Prevents XSS attacks
- **CSRF Protection** - SameSite cookie policy
- **Secure Headers** - Security-first middleware
- **Input Validation** - Server-side data validation
- **Encryption Ready** - AES-256-GCM for sensitive data

## 🌐 API Routes

| Route | Method | Description | Auth Required |
|-------|--------|-------------|---------------|
| `/api/auth/login` | GET | Initiate Auth0 login | No |
| `/api/auth/logout` | GET | Logout and clear session | No |
| `/api/auth/callback` | GET | Handle Auth0 callback | No |
| `/api/auth/profile` | GET | Get user profile | Yes |
| `/api/notes` | GET | Get user's notes | Yes |
| `/api/notes` | POST | Create new note | Yes |

## 🚀 Deploy to Vercel

### 1. Prepare for Deployment

```bash
# Test production build locally
npm run build
npm start
```

### 2. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fsecure-notes-app)

**Or manually:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 3. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```env
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id  
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_SECRET=your-production-secret
AUTH0_BASE_URL=https://your-app.vercel.app
MONGODB_URI=your-mongodb-connection-string
NOTE_ENCRYPTION_KEY=your-encryption-key
```

### 4. Update Auth0 Settings

Add your production URLs to Auth0:

```
Allowed Callback URLs: 
https://your-app.vercel.app/api/auth/callback

Allowed Logout URLs:
https://your-app.vercel.app

Allowed Web Origins:
https://your-app.vercel.app
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 📝 Usage

1. **Authentication**:
   - Visit the home page
   - Click "Log In" to authenticate with Auth0
   - Complete the OAuth2 flow

2. **Managing Notes**:
   - Navigate to `/notes` after login
   - Create new notes with the text area
   - View all your personal notes
   - Notes are automatically saved and secured

3. **Profile Access**:
   - Visit `/api/auth/profile` to see your user data
   - Logout using the "Log Out" button

## 🔧 Customization

### Adding Encryption

To encrypt notes before storing in MongoDB:

```typescript
// In /api/notes/route.ts
import { encryptText, decryptText } from '@/lib/crypto';

// Encrypt before saving
const encryptedText = encryptText(body.text);

// Decrypt when retrieving
const decryptedText = decryptText(note.encryptedData);
```

### Styling Customization

- Update `app/globals.css` for global styles
- Modify inline styles in components
- Add a CSS framework like Tailwind CSS

### Database Schema

The app uses these MongoDB collections:

```javascript
// notes collection
{
  _id: ObjectId,
  userId: string,    // Auth0 user ID
  text: string,      // Note content
  createdAt: Date    // Creation timestamp
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/secure-notes-app/issues)
- **Auth0 Docs**: [Auth0 Documentation](https://auth0.com/docs)
- **Next.js Docs**: [Next.js Documentation](https://nextjs.org/docs)
- **MongoDB Docs**: [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Auth0](https://auth0.com/) - Identity platform for developers
- [MongoDB](https://mongodb.com/) - The database for modern applications
- [Vercel](https://vercel.com/) - The platform for frontend frameworks

---

**Built with ❤️ using Next.js, Auth0, and MongoDB**
