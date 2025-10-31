# FixerUp Homepage

A modern, responsive homepage for FixerUp - an AI-powered platform that connects homeowners with trusted local contractors for home repair services.

## 🚀 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **i18next** - Internationalization
- **Firebase** - Backend services
- **Supabase** - Database and authentication
- **Stripe** - Payment processing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd fixerup_homepage
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Production Build

Build the application for production:

```bash
npm run build
```

The optimized build will be created in the `out/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
fixerup_homepage/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable UI components
│   │   ├── base/        # Base components (Button, etc.)
│   │   └── feature/     # Feature components (Header, Footer)
│   ├── pages/           # Page components
│   │   └── home/        # Home page sections
│   │       └── components/  # Section components
│   ├── i18n/            # Internationalization configuration
│   ├── router/          # React Router configuration
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json         # Project dependencies and scripts
```

## 🎨 Key Features

- **Hero Section** - Eye-catching landing with call-to-action
- **Features Section** - Showcase key platform features
- **How It Works** - Step-by-step process explanation
- **Contractors Section** - Information for contractors
- **Pricing** - Clear pricing tiers
- **About Us** - Team introduction with founder profiles
- **Contact** - Contact form and information
- **Responsive Design** - Mobile-first, works on all devices
- **Modern UI** - Clean design with smooth animations
- **Internationalization** - Multi-language support ready

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🌐 Environment Setup

If you need to configure environment variables (e.g., for Firebase, Supabase, or Stripe), create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
# Add other environment variables as needed
```

## 📝 Development Tips

1. **Hot Reload**: Changes to source files will automatically refresh the browser
2. **TypeScript**: The project uses TypeScript for type safety
3. **Tailwind**: Use Tailwind utility classes for styling
4. **Components**: Keep components small and reusable
5. **Assets**: Add images to `src/assets/` directory

## 🐛 Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically try the next available port.

### Dependencies issues
Try clearing the cache and reinstalling:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
Ensure you're using a compatible Node.js version (16+):
```bash
node --version
```

## 📄 License

This project is private and proprietary.

## 👥 Team

- **Wilson Li** - CEO & Co-Founder
- **Tao Zhang** - CTO & Co-Founder
- **Leo Zhao** - COO & Co-Founder

## 📧 Contact

For questions or support, reach out to:
- Email: info@fixerup.com
- Website: [fixerup.com](https://fixerup.com)

