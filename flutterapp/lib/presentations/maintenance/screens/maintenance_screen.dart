import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/api_service.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/orb.dart';
import 'package:google_fonts/google_fonts.dart';

class MaintenanceScreen extends StatefulWidget {
  final VoidCallback? onMaintenanceEnd;

  const MaintenanceScreen({super.key, this.onMaintenanceEnd});

  @override
  State<MaintenanceScreen> createState() => _MaintenanceScreenState();
}

class _MaintenanceScreenState extends State<MaintenanceScreen> with SingleTickerProviderStateMixin {
  bool _isChecking = false;
  String? _error;
  late AnimationController _ctrl;
  late Animation<double> _fade;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 800));
    _fade = CurvedAnimation(parent: _ctrl, curve: Curves.easeIn);
    _ctrl.forward();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  Future<void> _checkStatus() async {
    setState(() {
      _isChecking = true;
      _error = null;
    });

    try {
      final response = await ApiService.instance.getPublicSettings();
      if (response.statusCode == 200 && response.data != null) {
        final settings = response.data['data']?['settings'];
        final isMaintenanceActive = settings?['maintenance_mode'] ?? false;
        if (!isMaintenanceActive) {
          if (widget.onMaintenanceEnd != null) {
            widget.onMaintenanceEnd!();
          } else {
            // Restart/reload app navigation
            if (mounted) {
              Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
            }
          }
        } else {
          setState(() {
            _error = kMaintenanceStillActive;
          });
        }
      } else {
        setState(() {
          _error = kMaintenanceCheckFailed;
        });
      }
    } catch (e) {
      setState(() {
        _error = kMaintenanceCheckFailed;
      });
    } finally {
      if (mounted) {
        setState(() {
          _isChecking = false;
        });
      }
    }
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

          // Content
          Center(
            child: FadeTransition(
              opacity: _fade,
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: context.scale(24)),
                child: Container(
                  padding: EdgeInsets.all(context.scale(32)),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.03),
                    borderRadius: BorderRadius.circular(context.scale(24)),
                    border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Icon
                      Container(
                        width: context.scale(80),
                        height: context.scale(80),
                        decoration: BoxDecoration(
                          color: AppColors.orb2.withValues(alpha: 0.15),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          Icons.build_rounded,
                          size: context.scale(36),
                          color: AppColors.orb2,
                        ),
                      ),
                      SizedBox(height: context.scale(24)),

                      // Title
                      Text(
                        kMaintenanceTitle,
                        style: GoogleFonts.inter(
                          fontSize: context.scale(22),
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                          letterSpacing: -0.5,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: context.scale(12)),

                      // Description
                      Text(
                        kMaintenanceDescription,
                        style: GoogleFonts.inter(
                          fontSize: context.scale(14),
                          color: Colors.white.withValues(alpha: 0.7),
                          height: 1.5,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: context.scale(24)),

                      // Error message if any
                      if (_error != null) ...[
                        Container(
                          padding: EdgeInsets.all(context.scale(12)),
                          decoration: BoxDecoration(
                            color: AppColors.error.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(context.scale(12)),
                            border: Border.all(color: AppColors.error.withValues(alpha: 0.2)),
                          ),
                          child: Text(
                            _error!,
                            style: GoogleFonts.inter(
                              fontSize: context.scale(13),
                              color: AppColors.error,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                        SizedBox(height: context.scale(24)),
                      ],

                      // Button
                      SizedBox(
                        width: double.infinity,
                        height: context.scale(48),
                        child: ElevatedButton(
                          onPressed: _isChecking ? null : _checkStatus,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primary,
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(context.scale(12)),
                            ),
                            elevation: 0,
                          ),
                          child: _isChecking
                              ? SizedBox(
                                  width: context.scale(20),
                                  height: context.scale(20),
                                  child: const CircularProgressIndicator(
                                    strokeWidth: 2,
                                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                  ),
                                )
                              : Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(Icons.refresh_rounded, size: context.scale(18)),
                                    SizedBox(width: context.scale(8)),
                                    Text(
                                      kMaintenanceCheckAgain,
                                      style: GoogleFonts.inter(
                                        fontSize: context.scale(15),
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
