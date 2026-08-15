# TestAPK - Flutter App Agent Instructions

Welcome! This document provides a detailed overview of the **TestAPK Flutter Application** (`/flutterapp`) to help you understand its architecture, state management, localization system, key services, and coding standards.

---

## 1. App Overview

The **TestAPK Flutter App** is the tester-facing mobile client. It allows registered testers to:
- Authenticate via Google Sign-In.
- View applications they are invited to.
- Accept or decline pending invitations.
- View release history and build specifications for each application.
- Download and install APKs directly on their Android devices.
- Receive push notifications when new releases are published.

---

## 2. Tech Stack & Dependencies

- **Framework**: Flutter (SDK `^3.12.2`), Dart.
- **Networking**: `dio` (v5) with `pretty_dio_logger` for API requests.
- **Authentication**: `google_sign_in` for Google OAuth.
- **Local Storage**: `flutter_secure_storage` for storing auth tokens and user preferences.
- **Push Notifications**: `firebase_messaging` and `firebase_core` for FCM.
- **Crash Reporting & Analytics**: `firebase_crashlytics` and `firebase_analytics`.
- **UI & Styling**: `google_fonts` (Inter), `shimmer` (loading states), `cached_network_image`.
- **System Integration**: `permission_handler` (storage/install permissions), `path_provider` (download paths), `url_launcher`.

---

## 3. Directory Structure & Architecture

The codebase follows a feature-first organization structure:

```
flutterapp/
├── android/                 # Native Android configuration
├── lib/
│   ├── core/                # Core utilities, API clients, and constants
│   │   ├── api_client.dart  # Dio wrapper with interceptors
│   │   ├── api_service.dart # API endpoint requests
│   │   ├── auth_service.dart# Google Sign-In & session management
│   │   ├── app_colors.dart  # Centralized color palette
│   │   ├── constants.dart   # Global string and numeric constants
│   │   ├── navigation.dart  # Global navigator key
│   │   └── storage_service.dart # Secure storage wrapper
│   ├── l10n/                # Localization ARB files and generated classes
│   ├── models/              # Data models (AppModel, ReleaseModel, UserModel)
│   ├── presentations/       # UI screens and widgets grouped by feature
│   │   ├── app_list/        # Main dashboard (apps & invites)
│   │   ├── login/           # Google Sign-In screen
│   │   ├── maintenance/     # Maintenance mode screen
│   │   ├── menu/            # Profile, support, FAQ, legal, and settings
│   │   ├── release_detail/  # Detailed release specifications
│   │   ├── release_list/    # Release history and build list
│   │   ├── splash/          # Splash screen & version check
│   │   └── update/          # Self-update screens/dialogs
│   ├── services/            # Background services (download, installation)
│   ├── widgets/             # Reusable global widgets (CustomSnackBar, Orb)
│   └── main.dart            # App entrypoint & MaterialApp configuration
└── pubspec.yaml             # Dependencies and assets
```

---

## 4. App Localization (l10n)

The application supports multi-language localization out of the box using Flutter's built-in localization framework.

### ⚙️ Configuration (`l10n.yaml`)
```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-class: AppLocalizations
```

### 🌍 Supported Locales
The app supports the following 9 languages:
- English (`en`) - Template
- Spanish (`es`)
- Portuguese (`pt`)
- Hindi (`hi`)
- French (`fr`)
- German (`de`)
- Japanese (`ja`)
- Chinese (`zh`)
- Arabic (`ar`)

### 📝 Adding or Modifying Strings
1. Edit the corresponding ARB file in `lib/l10n/` (e.g., `app_en.arb` for English).
2. Run `flutter gen-l10n` (or let the IDE build runner generate it automatically) to update `AppLocalizations`.
3. Use the localized string in your widget:
   ```dart
   AppLocalizations.of(context)!.yourStringKey
   ```

### 🔄 Dynamic Locale Switching
- The locale state is managed in `_TestApkAppState` inside `lib/main.dart`.
- To change the language dynamically:
   ```dart
   TestApkApp.setLocale(context, Locale('es'));
   ```
- The selected language code is persistently saved in secure storage via `StorageService.instance.saveLanguage(langCode)`.

---

## 5. Key Services & Workflows

### 🔐 Authentication Flow
- **Service**: `AuthService` (`lib/core/auth_service.dart`).
- **Flow**: Google Sign-In -> Send Google ID token to backend `/api/v1/auth/google` -> Receive JWT access/refresh tokens -> Save to secure storage.
- **Session Expiry**: `ApiClient` has an `onUnauthorized` callback that automatically signs the user out and redirects to the `LoginScreen` if a request returns a `401 Unauthorized` status.

### 📥 APK Download & Installation
- **Service**: `lib/services/` (handles background downloading and native package installation).
- **Permissions**: Requires `Permission.requestInstallPackages` and storage permissions to download and install APKs.
- **Flow**: Download APK to local cache directory -> Trigger native Android Package Installer via `open_filex` or custom platform channels.

### 🔔 Push Notifications (FCM)
- **Manager**: `NotificationManager` (`lib/notification_manager.dart`).
- **Flow**: Initialize Firebase Messaging -> Request notification permissions -> Retrieve FCM token -> Register FCM token with backend -> Handle foreground/background messages.

---

## 6. Coding Standards & Guidelines

- **No Hardcoded Strings**: All user-facing text must be localized using `AppLocalizations`.
- **Centralized Colors**: Use `AppColors` for all background, text, and widget colors. Do not use inline color constants.
- **Typography**: Use standard text styles or the custom `TextViewer` widget to ensure consistent font rendering.
- **State Management**: Keep UI state local to `StatefulWidget`s where appropriate. Use services (e.g., `ApiService`, `AuthService`) to manage shared state and business logic.
- **Responsive Layouts**: Use context extensions or layout builders to scale sizes and margins dynamically for different screen sizes.
- **Snackbar**: Use `CustomSnackBar` for all snackbar notifications.
