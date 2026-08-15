import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/orb.dart';
import 'package:flutterapp/presentations/update/widgets/app_update_card.dart';

class AppUpdateScreen extends StatefulWidget {
  final String downloadLink;

  const AppUpdateScreen({super.key, required this.downloadLink});

  @override
  State<AppUpdateScreen> createState() => _AppUpdateScreenState();
}

class _AppUpdateScreenState extends State<AppUpdateScreen> with SingleTickerProviderStateMixin {
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

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false, // Prevent back button from dismissing this screen
      child: Scaffold(
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
                  child: AppUpdateCard(downloadLink: widget.downloadLink),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
