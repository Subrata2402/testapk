import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/api_service.dart';
import 'package:flutterapp/core/auth_service.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/presentations/app_list/screens/app_list_screen.dart';
import 'package:flutterapp/presentations/login/screens/login_screen.dart';
import 'package:flutterapp/presentations/maintenance/screens/maintenance_screen.dart';
import 'package:flutterapp/presentations/update/screens/app_update_screen.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/orb.dart';
import 'package:flutterapp/presentations/splash/widgets/splash_logo.dart';
import 'package:flutterapp/presentations/splash/widgets/splash_progress_pill.dart';
import 'package:google_fonts/google_fonts.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _fade;
  late Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 900));
    _fade = CurvedAnimation(parent: _ctrl, curve: Curves.easeIn);
    _scale = Tween<double>(begin: 0.85, end: 1.0).animate(CurvedAnimation(parent: _ctrl, curve: Curves.easeOutBack));
    _ctrl.forward();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    final settingsFuture = ApiService.instance.getPublicSettings();
    final loginFuture = AuthService.instance.tryAutoLogin();

    await Future.delayed(const Duration(milliseconds: 1800));
    if (!mounted) return;

    bool isMaintenanceActive = false;
    bool isUpdateMandatory = false;
    bool isUpdateOptional = false;
    String latestVersionDownloadLink = '';

    try {
      final response = await settingsFuture;
      if (response.statusCode == 200 && response.data != null) {
        final settings = response.data['data']?['settings'];
        isMaintenanceActive = settings?['maintenance_mode'] ?? false;

        final List<dynamic> allowedVersions = settings?['flutter_app_versions'] ?? [];
        latestVersionDownloadLink = settings?['latest_version_download_link'] ?? '';

        // Get current app version info using MethodChannel
        const platform = MethodChannel(kMethodChannelName);
        final Map<dynamic, dynamic>? currentInfo = await platform.invokeMethod('getInstalledVersionInfo', {
          'packageName': 'com.testapk.app',
        });

        if (currentInfo != null) {
          final currentVersion = currentInfo['versionName'] as String? ?? '';
          final currentBuild = currentInfo['versionCode'] as int? ?? -1;

          debugPrint('Splash: Current Version: $currentVersion, Build: $currentBuild');
          debugPrint('Splash: Allowed Versions: $allowedVersions');

          if (currentBuild != -1 && currentVersion.isNotEmpty) {
            // Check if current version is in the allowed list
            bool isAllowed = false;
            for (final v in allowedVersions) {
              if (v is Map) {
                final vName = v['version'] as String? ?? '';
                final vBuild = v['buildNumber'] as int? ?? -1;
                if (vName == currentVersion && vBuild == currentBuild) {
                  isAllowed = true;
                  break;
                }
              }
            }

            // Find the latest version from the allowed list (highest build number)
            int latestBuild = -1;
            for (final v in allowedVersions) {
              if (v is Map) {
                final vBuild = v['buildNumber'] as int? ?? -1;
                if (vBuild > latestBuild) {
                  latestBuild = vBuild;
                }
              }
            }

            if (!isAllowed) {
              // If current version is not listed in versions, then the update is mandatory
              isUpdateMandatory = true;
            } else if (currentBuild < latestBuild) {
              // If current version is listed but is a downgrade (lower build number than latest), update is optional
              isUpdateOptional = true;
            }
          }
        }
      }
    } catch (e) {
      debugPrint('Failed to fetch public settings or check version: $e');
    }

    final user = await loginFuture;
    if (!mounted) return;

    if (isUpdateMandatory) {
      Navigator.of(
        context,
      ).pushReplacement(MaterialPageRoute(builder: (_) => AppUpdateScreen(downloadLink: latestVersionDownloadLink)));
      return;
    }

    if (isMaintenanceActive && user?.role != 'admin') {
      Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => const MaintenanceScreen()));
      return;
    }

    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (_) => user != null
            ? AppListScreen(isUpdateOptional: isUpdateOptional, latestVersionDownloadLink: latestVersionDownloadLink)
            : LoginScreen(isUpdateOptional: isUpdateOptional, latestVersionDownloadLink: latestVersionDownloadLink),
      ),
    );
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bg3,
      body: Stack(
        children: [
          // iOS wallpaper gradient
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [AppColors.bg1, AppColors.bg2, AppColors.bg3],
                stops: [0.0, 0.55, 1.0],
              ),
            ),
          ),

          // Bokeh orbs
          Positioned(
            top: -context.scale(160),
            left: -context.scale(100),
            child: Orb(size: context.scale(400), color: AppColors.orb1.withValues(alpha: 0.40)),
          ),
          Positioned(
            bottom: -context.scale(100),
            right: -context.scale(80),
            child: Orb(size: context.scale(320), color: AppColors.orb3.withValues(alpha: 0.25)),
          ),
          Positioned(
            top: context.scale(200),
            right: -context.scale(60),
            child: Orb(size: context.scale(240), color: AppColors.orb4.withValues(alpha: 0.28)),
          ),

          // Content
          Center(
            child: FadeTransition(
              opacity: _fade,
              child: ScaleTransition(
                scale: _scale,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const SplashLogo(),
                    SizedBox(height: context.scale(24)),
                    Text(
                      kAppName,
                      style: GoogleFonts.inter(
                        fontSize: context.scale(36),
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                        letterSpacing: -1.2,
                        height: 1.0,
                      ),
                    ),
                    SizedBox(height: context.scale(8)),
                    Text(
                      kSplashSubtitle,
                      style: GoogleFonts.inter(
                        fontSize: context.scale(14),
                        color: Colors.white.withValues(alpha: 0.55),
                        letterSpacing: -0.1,
                      ),
                    ),
                    SizedBox(height: context.scale(56)),
                    const SplashProgressPill(),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
