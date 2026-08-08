import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:firebase_analytics/firebase_analytics.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutterapp/l10n/app_localizations.dart';
import 'package:flutterapp/configs.dart';
import 'package:flutterapp/core/api_client.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/auth_service.dart';
import 'package:flutterapp/core/navigation.dart';
import 'package:flutterapp/core/storage_service.dart';
import 'package:flutterapp/firebase_options.dart';
import 'package:flutterapp/notification_manager.dart';
import 'package:flutterapp/presentations/login/screens/login_screen.dart';
import 'package:flutterapp/presentations/splash/screens/splash_screen.dart';
import 'package:google_fonts/google_fonts.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(statusBarColor: Colors.transparent, statusBarIconBrightness: Brightness.light),
  );

  await ConfigService.getBaseUrl();

  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  // Pass all uncaught Flutter errors to Crashlytics
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;

  // Pass all uncaught asynchronous errors that aren't handled by the Flutter framework to Crashlytics
  PlatformDispatcher.instance.onError = (error, stack) {
    FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
    return true;
  };

  await NotificationManager.initialize();

  // Set up unauthorized callback for API client
  ApiClient.instance.onUnauthorized = () async {
    await AuthService.instance.signOut(localOnly: true);
    navigatorKey.currentState?.pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => const LoginScreen()),
      (route) => false,
    );
  };

  runApp(const TestApkApp());
}

class TestApkApp extends StatefulWidget {
  const TestApkApp({super.key});

  static void setLocale(BuildContext context, Locale newLocale) {
    _TestApkAppState? state = context.findAncestorStateOfType<_TestApkAppState>();
    state?.setLocale(newLocale);
  }

  @override
  State<TestApkApp> createState() => _TestApkAppState();
}

class _TestApkAppState extends State<TestApkApp> {
  Locale? _locale;

  @override
  void initState() {
    super.initState();
    _loadLocale();
  }

  Future<void> _loadLocale() async {
    final langCode = await StorageService.instance.getLanguage();
    if (langCode != null) {
      setState(() {
        _locale = Locale(langCode);
      });
    }
  }

  void setLocale(Locale locale) {
    setState(() {
      _locale = locale;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: navigatorKey,
      title: 'TestAPK',
      debugShowCheckedModeBanner: false,
      navigatorObservers: [FirebaseAnalyticsObserver(analytics: FirebaseAnalytics.instance)],
      locale: _locale,
      localizationsDelegates: [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('en'),
        Locale('es'),
        Locale('pt'),
        Locale('hi'),
        Locale('fr'),
        Locale('de'),
        Locale('ja'),
        Locale('zh'),
        Locale('ar'),
      ],
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorScheme: const ColorScheme.dark(
          primary: AppColors.primary,
          secondary: AppColors.primaryDark,
          surface: AppColors.surface,
          error: AppColors.error,
        ),
        scaffoldBackgroundColor: AppColors.background,
        textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          systemOverlayStyle: SystemUiOverlayStyle.light,
        ),
      ),
      home: const SplashScreen(),
    );
  }
}
