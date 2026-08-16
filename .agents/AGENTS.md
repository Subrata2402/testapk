# TestAPK - Agent Instructions & Project Overview

Welcome! This document provides a comprehensive overview of the **TestAPK** project to help you understand the architecture, components, tech stack, and development workflows without needing to analyze the codebase from scratch.

---

## 1. Project Overview

**TestAPK** is an end-to-end platform designed to simplify the distribution of Android APK builds from developers to testers. The system consists of five main components:
1. **Server**: Node.js/TypeScript backend API server.
2. **Webapp**: React/Vite developer web portal.
3. **Admin**: React/Vite system administration dashboard.
4. **CLI**: Node.js command-line tool for developers to upload APKs.
5. **Flutterapp**: Flutter/Dart mobile application for testers to download and install APKs.

---

## 2. System Architecture & Component Breakdown

### 📂 Directory Structure
```
testapk/
├── .agents/             # Agent instructions (this directory)
├── server/              # Backend API Server
├── webapp/              # Developer Web Portal
├── admin/               # Admin Dashboard
├── cli/                 # Developer CLI Tool
└── flutterapp/          # Tester Mobile App
```

---

### 🖥️ 1. Server (`/server`)
The backend API server built with Node.js, TypeScript, and Express. It manages metadata in MongoDB, stores APK files securely in Google Drive, and sends push notifications via Firebase Cloud Messaging (FCM).

- **Tech Stack**: Express, Mongoose (MongoDB), Google APIs (Drive, Auth), Zod (Validation), Helmet (Security), Winston (Logging).
- **Key Directories**:
  - `src/config/`: Configuration for Google Drive, MongoDB, and Firebase.
  - `src/controllers/`: Request handlers (e.g., app, release, user, settings, ticket controllers).
  - `src/models/`: Mongoose schemas (App, Release, User, Setting, Ticket, Invitation).
  - `src/routes/`: Express route definitions.
  - `src/services/`: Business logic (Google Drive service, FCM service, mail service).
- **Key Commands**:
  - Run development server: `npm run dev`
  - Build project: `npm run build`
  - Start production server: `npm run start`
  - Lint: `npm run lint`
  - Format: `npm run format`
- **Configuration**: `.env` (copied from `.env.example`).

---

### 🌐 2. Developer Webapp (`/webapp`)
The web portal where developers register apps, manage tester invitations, configure Google Drive storage, and authorize CLI devices.

- **Tech Stack**: React (v19), Vite, Vanilla CSS (Glassmorphic UI), Lucide Icons, Axios, `@react-oauth/google`.
- **Key Directories**:
  - `src/components/`: Reusable UI components (e.g., CustomDropdown, GlassCard).
  - `src/pages/`: Page views (Dashboard, AppDetails, Profile, Login, Contact).
  - `src/services/`: API client and endpoint definitions.
  - `src/context/`: React context (e.g., LanguageContext).
- **Key Commands**:
  - Run dev server: `npm run dev`
  - Build: `npm run build`
  - Lint: `npm run lint`
- **Configuration**: `.env` (copied from `.env.example`).

---

### 🛠️ 3. Admin Dashboard (`/admin`)
The dashboard for system administrators to monitor system health, manage users and roles, view all applications, handle support tickets, and configure global settings (maintenance mode, allowed app versions, max upload size).

- **Tech Stack**: React (v19), Vite, Vanilla CSS (Glassmorphic UI), Lucide Icons, Axios.
- **Key Directories**:
  - `src/pages/`: Admin pages (Dashboard, SystemHealthPage, UsersPage, SettingsPage, TicketsPage).
  - `src/components/`: Reusable admin components.
- **Key Commands**:
  - Run dev server: `npm run dev`
  - Build: `npm run build`
  - Lint: `npm run lint`
- **Configuration**: `.env.development`, `.env.production`, `.env.staging`.

---

### 💻 4. Developer CLI (`/cli`)
A command-line interface tool that allows developers to authenticate, list applications, create applications, and upload APKs directly from their terminal or CI/CD pipelines.

- **Tech Stack**: Node.js, Commander.js, Axios, Chalk, FormData.
- **Key Directories**:
  - `src/commands/`: CLI command implementations (login, upload, apps).
  - `src/utils/`: Helper utilities (auth, api, config).
- **Key Commands**:
  - Install dependencies: `npm install`
  - Link globally: `npm link` (exposes `testapk` command globally)
  - Login: `testapk login`
  - Upload APK: `testapk upload <path-to-apk>`

---

### 📱 5. Tester Flutterapp (`/flutterapp`)
The mobile application used by testers to view available apps, accept/decline invitations, view release history, download APKs, and install them directly.

- **Tech Stack**: Flutter (SDK ^3.12.2), Dart, Google Sign-In, Dio, Firebase (Messaging, Analytics, Crashlytics), Open Filex, Permission Handler.
- **Key Directories**:
  - `lib/core/`: Constants, themes, network clients, and utilities.
  - `lib/presentations/`: UI screens and widgets grouped by feature (app_list, release_history, menu, update, login).
  - `lib/services/`: Background services (APK download, installation, FCM notification handler).
- **Key Commands**:
  - Get packages: `flutter pub get`
  - Run app: `flutter run`
- **Configuration**: `lib/core/constants.dart` (API URLs, Google Client IDs).

---

## 3. Development Guidelines & Coding Standards

### 🎨 UI & Styling (Webapp & Admin)
- **Vanilla CSS**: We use Vanilla CSS for styling to maintain maximum flexibility. **Do not use Tailwind CSS** unless explicitly requested.
- **Glassmorphic Theme**: Both Webapp and Admin dashboards use a premium glassmorphism aesthetic. Use the `.glass-panel` class and standard styling tokens defined in `index.css`.
- **Responsive Design**: Ensure all layouts are fully responsive and look great on mobile, tablet, and desktop screens.

### 📱 Flutterapp Styling
- **Centralized Colors**: Use the `AppColors` class in `lib/core/theme/` (or equivalent constants) for all colors. Avoid hardcoding color values.
- **Typography**: Use the custom `TextViewer` widget or standardized text styles to ensure consistent typography.

### 🔒 Security & Best Practices
- **Environment Variables**: Never commit secrets or `.env` files. Always use `.env.example` as a template.
- **Validation**: Validate all incoming API request payloads on the server using Zod schemas.
- **Error Handling**: Use structured try-catch blocks and centralized error-handling middleware on the server.

---

## 4. Common Workflows

### Running the Entire System Locally
1. Start MongoDB locally.
2. Start the Server: `cd server && npm run dev`
3. Start the Webapp: `cd webapp && npm run dev`
4. Start the Admin Dashboard: `cd admin && npm run dev`
5. Run the Flutter App: `cd flutterapp && flutter run`
