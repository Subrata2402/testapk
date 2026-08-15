# TestAPK Admin Dashboard

The **TestAPK Admin Dashboard** is a premium, glassmorphic web application built with React and Vite. It serves as the administrative control panel for the TestAPK platform, enabling administrators to monitor system health, manage users and applications, handle support and feedback requests, and configure global system settings.

---

## 🚀 Key Features

- **📊 Dashboard Overview**: Real-time metrics (Total Apps, Active Users, Pending Support, Feedbacks), interactive analytics charts (user trends, rating distributions, support categories), and a live activity stream.
- **👥 User & Role Management**: View registered users, manage user roles (Owner, Developer, Tester), and monitor account status.
- **📱 Application Management**: View all applications registered on the platform, including package names, owners, and release counts.
- **🩺 System Health Monitoring**: Real-time tracking of server CPU/Memory usage, database connection status, and API response times.
- **💬 Support & Feedback Center**: Manage incoming support tickets and user feedback submissions with status updates.
- **⚙️ Global System Settings**:
  - Toggle **Maintenance Mode** (restricts access for non-admin users).
  - Control **User Registration** permissions.
  - Set **Maximum APK Upload Size** limits.
  - Configure **Allowed Flutter App Versions** and configure mandatory/optional self-update behaviors.
  - Manage the **Latest Version Download Link** for the mobile app.

---

## 🛠️ Technology Stack

- **Core**: React 19, Vite 8, React Router 7
- **Styling**: Vanilla CSS (Glassmorphic UI design system)
- **API Client**: Axios
- **Icons**: Lucide React
- **Linter**: Oxlint (for ultra-fast linting)

---

## 📂 Project Structure

```
admin/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and global styles
│   ├── components/     # Reusable UI components
│   │   ├── analytics/  # Chart components (Trend, Bar, Doughnut)
│   │   ├── common/     # Shared components (Switch, ConfirmModal, Dropdown, DatePicker)
│   │   └── support/    # Support-specific widgets
│   ├── context/        # React Contexts (AuthContext, LanguageContext)
│   ├── locales/        # Translation JSON files for multi-language support
│   ├── pages/          # Page-level components & page-specific CSS
│   ├── routes/         # Route configuration (AppRoutes.jsx)
│   ├── services/       # API integration services (api.js, endpoints.js)
│   ├── App.jsx         # Root component
│   ├── index.css       # Global CSS & Design System tokens
│   └── main.jsx        # Entry point
├── .env.development    # Development environment variables
├── .env.production     # Production environment variables
├── .env.staging        # Staging environment variables
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### 1. Install Dependencies
Navigate to the `admin` directory and install the required packages:
```bash
cd admin
npm install
```

### 2. Environment Configuration
Create or modify the environment files (`.env.development`, `.env.production`, `.env.staging`) in the root of the `admin` folder:
```env
VITE_API_URL=http://localhost:3000/api/v1
```

### 3. Available Scripts

#### Run Development Server
Start the Vite dev server with Hot Module Replacement (HMR):
```bash
# Default (uses .env.development)
npm run dev

# Development Mode
npm run dev:dev

# Staging Mode
npm run dev:local

# Production Mode
npm run dev:prod
```

#### Build for Production
Compile and optimize the application for production:
```bash
# Default Build
npm run build

# Environment-specific builds
npm run build:dev
npm run build:stage
npm run build:prod
```

#### Linting
Run Oxlint to check for code quality and style issues:
```bash
npm run lint
```

#### Preview Production Build
Preview the locally built production app:
```bash
npm run preview
```
