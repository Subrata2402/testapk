import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/auth_service.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/l10n/app_localizations.dart';
import 'package:flutterapp/models/user_model.dart';
import 'package:flutterapp/presentations/login/screens/login_screen.dart';
import 'package:flutterapp/presentations/menu/profile/screens/profile_screen.dart';
import 'package:flutterapp/presentations/menu/profile/widgets/action_confirmation_dialog.dart';
import 'package:flutterapp/presentations/menu/profile/widgets/profile_legal_card.dart';
import 'package:flutterapp/presentations/menu/profile/widgets/profile_logout_button.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/orb.dart';
import 'package:flutterapp/widgets/glass_panel.dart';
import 'package:google_fonts/google_fonts.dart';

class MenuScreen extends StatelessWidget {
  final UserModel user;

  const MenuScreen({super.key, required this.user});

  Future<void> _handleSignOut(BuildContext context) async {
    final confirmed = await showGeneralDialog<bool>(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      barrierColor: Colors.black.withValues(alpha: 0.5),
      transitionDuration: const Duration(milliseconds: 300),
      pageBuilder: (context, anim1, anim2) => const SizedBox.shrink(),
      transitionBuilder: (context, anim1, anim2, child) {
        final curve = CurvedAnimation(parent: anim1, curve: Curves.easeOutBack);
        return ScaleTransition(
          scale: curve,
          child: FadeTransition(
            opacity: anim1,
            child: ActionConfirmationDialog(
              title: kSignOutConfirmTitle,
              message: kSignOutConfirmMessage,
              confirmLabel: kSignOutLabel,
              icon: Icons.logout_rounded,
            ),
          ),
        );
      },
    );

    if (confirmed == true) {
      if (!context.mounted) return;
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (ctx) => const Center(child: CircularProgressIndicator(color: AppColors.accent)),
      );
      await AuthService.instance.signOut();
      if (context.mounted) {
        Navigator.of(context).pop(); // Dismiss the dialog
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (_) => const LoginScreen()),
          (_) => false,
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    AppLocalizations.of(context);
    return Scaffold(
      backgroundColor: AppColors.bg3,
      body: Stack(
        children: [
          // Gradient background
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
            top: -context.scale(120),
            left: -context.scale(80),
            child: Orb(size: context.scale(300), color: AppColors.orb1.withValues(alpha: 0.30)),
          ),
          Positioned(
            bottom: -context.scale(60),
            right: -context.scale(60),
            child: Orb(size: context.scale(240), color: AppColors.orb4.withValues(alpha: 0.22)),
          ),

          // Content
          Column(
            children: [
              // Glass AppBar
              ClipRect(
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                  child: Container(
                    color: Colors.white.withValues(alpha: 0.07),
                    child: SafeArea(
                      bottom: false,
                      child: Padding(
                        padding: EdgeInsets.fromLTRB(
                          context.scale(4),
                          context.scale(8),
                          context.scale(16),
                          context.scale(12),
                        ),
                        child: Row(
                          children: [
                            IconButton(
                              icon: Icon(Icons.arrow_back_rounded, color: Colors.white, size: context.scale(22)),
                              onPressed: () => Navigator.of(context).pop(),
                            ),
                            Text(
                              'Menu',
                              style: GoogleFonts.inter(
                                fontSize: context.scale(18),
                                fontWeight: FontWeight.w700,
                                color: AppColors.textPrimary,
                                letterSpacing: -0.5,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),

              Expanded(
                child: SingleChildScrollView(
                  padding: EdgeInsets.symmetric(horizontal: context.scale(20), vertical: context.scale(24)),
                  child: SafeArea(
                    top: false,
                    child: Column(
                      children: [
                        // Tappable Profile Card
                        GlassPanel(
                          borderRadius: 16,
                          padding: EdgeInsets.zero,
                          child: InkWell(
                            onTap: () {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (_) => ProfileScreen(user: user),
                                ),
                              );
                            },
                            borderRadius: BorderRadius.circular(context.scale(16)),
                            child: Padding(
                              padding: EdgeInsets.all(context.scale(16)),
                              child: Row(
                                children: [
                                  // Avatar
                                  Container(
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      border: Border.all(color: Colors.white.withValues(alpha: 0.20), width: 1),
                                    ),
                                    child: user.picture != null
                                        ? CircleAvatar(
                                            radius: context.scale(24),
                                            backgroundImage: NetworkImage(user.picture!),
                                            backgroundColor: Colors.transparent,
                                          )
                                        : CircleAvatar(
                                            radius: context.scale(24),
                                            backgroundColor: AppColors.accent.withValues(alpha: 0.25),
                                            child: Text(
                                              user.initials,
                                              style: GoogleFonts.inter(
                                                fontSize: context.scale(16),
                                                fontWeight: FontWeight.w600,
                                                color: AppColors.accentLight,
                                              ),
                                            ),
                                          ),
                                  ),
                                  SizedBox(width: context.scale(16)),
                                  // Name and Email
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          user.name,
                                          style: GoogleFonts.inter(
                                            fontSize: context.scale(16),
                                            fontWeight: FontWeight.w700,
                                            color: AppColors.textPrimary,
                                            letterSpacing: -0.3,
                                          ),
                                        ),
                                        SizedBox(height: context.scale(2)),
                                        Text(
                                          user.email,
                                          style: GoogleFonts.inter(
                                            fontSize: context.scale(12),
                                            color: AppColors.textSecondary,
                                          ),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ],
                                    ),
                                  ),
                                  Icon(
                                    Icons.arrow_forward_ios_rounded,
                                    color: Colors.white.withValues(alpha: 0.4),
                                    size: context.scale(16),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),

                        SizedBox(height: context.scale(20)),

                        // Legal card (Terms, Privacy, About, Language)
                        const ProfileLegalCard(),

                        SizedBox(height: context.scale(24)),

                        // Logout button
                        ProfileLogoutButton(onTap: () => _handleSignOut(context)),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
