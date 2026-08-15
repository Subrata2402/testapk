# TestAPK - APK Release Manager for Testers

TestAPK is an end-to-end platform designed to simplify the distribution of Android APK builds from developers to testers. The platform provides a secure, self-hosted backend, a developer web portal, an admin dashboard, a developer CLI tool, and a mobile application for testers.

---

## System Architecture

```mermaid
graph TD
    subgraph Clients
        CLI[Developer CLI]
        Web[Developer Web Portal]
        Admin[Admin Dashboard]
        App[Tester Mobile App]
    end

    subgraph Backend
        Server[Express API Server]
        DB[(MongoDB)]
        Drive[Google Drive API]
        FCM[Firebase Cloud Messaging]
    end

    CLI -->|Uploads & Management| Server
    Web -->|Configuration & Invites| Server
    Admin -->|System Administration| Server
    App -->|Downloads & Installs| Server

    Server -->|Metadata| DB
    Server -->|APK Storage| Drive
    Server -->|Push Notifications| FCM
    FCM -->|Delivers Notifications| App
```

---

## Component Overview

The repository is organized into five main components:

### 1. [Server](./server)
The backend API server built with Node.js, TypeScript, and Express.
- **Key Features**: Google OAuth authentication, MongoDB database management, tester invitation system, and secure Google Drive integration for APK storage.
- **Technologies**: Express, Mongoose, Google APIs, Zod, Helmet.

### 2. [Webapp](./webapp)
The developer web portal built with React and Vite.
- **Key Features**: Google Sign-In, application management dashboard, Google Drive integration setup, tester invitation management, and CLI device authorization flow.
- **Technologies**: React, Vite, Vanilla CSS (Glassmorphic UI), Lucide Icons.

### 3. [Admin](./admin)
The administrator dashboard built with React and Vite.
- **Key Features**: System health monitoring, user/role management, application list, support/feedback ticket management, and global system settings (maintenance mode, allowed app versions, max upload size).
- **Technologies**: React, Vite, Vanilla CSS (Glassmorphic UI), Lucide Icons, Axios.

### 4. [CLI](./cli)
A command-line interface tool for developers to interact with the platform.
- **Key Features**: Device authorization flow (CLI login), application listing, application creation, and direct APK uploading.
- **Technologies**: Node.js, Commander.js.

### 5. [Flutterapp](./flutterapp)
The tester mobile application built with Flutter.
- **Key Features**: Google Sign-In, application list (with invitation accept/decline), release history, detailed build specifications, and direct in-app APK downloading and installation.
- **Technologies**: Flutter, Dart, Google Sign-In, Open Filex, Permission Handler.

---

## Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **Flutter SDK** (v3.12.2 or higher)
- **MongoDB** (local instance or MongoDB Atlas)
- **Google Cloud Console Project** with Google Drive API enabled and OAuth 2.0 credentials.

### Setup Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd testapk
   ```

2. **Start the Database**:
   Ensure MongoDB is running locally or have your MongoDB Atlas URI ready.

3. **Configure and Run the Server**:
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your MongoDB URI and Google OAuth credentials
   npm install
   npm run dev
   ```

4. **Configure and Run the Webapp**:
   ```bash
   cd ../webapp
   cp .env.example .env
   # Edit .env with your VITE_API_URL and VITE_GOOGLE_CLIENT_ID
   npm install
   npm run dev
   ```

5. **Configure and Run the Admin Dashboard**:
   ```bash
   cd ../admin
   # Configure your VITE_API_URL in environment files
   npm install
   npm run dev
   ```

6. **Configure and Run the Flutterapp**:
   - Open `flutterapp/lib/core/constants.dart`.
   - Update `kApiBaseUrl` to point to your server (e.g., `http://10.0.2.2:3000/api/v1` for the Android emulator).
   - Update `kGoogleClientId` with your Google OAuth Client ID.
   - Run the app:
     ```bash
     cd ../flutterapp
     flutter pub get
     flutter run
     ```

7. **Install and Use the CLI**:
   ```bash
   cd ../cli
   npm install
   npm link # Optional: links 'testapk' command globally
   node index.js login
   ```
