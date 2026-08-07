import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutterapp/core/api_service.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/auth_service.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/models/user_model.dart';
import 'package:flutterapp/presentations/login/screens/login_screen.dart';
import 'package:flutterapp/presentations/menu/profile/widgets/action_confirmation_dialog.dart';
import 'package:flutterapp/presentations/menu/profile/widgets/profile_avatar.dart';
import 'package:flutterapp/presentations/menu/profile/widgets/profile_info_card.dart';
import 'package:flutterapp/presentations/menu/profile/widgets/profile_legal_card.dart';
import 'package:flutterapp/presentations/menu/profile/widgets/profile_logout_button.dart';
import 'package:flutterapp/presentations/menu/profile/widgets/profile_delete_account_button.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/orb.dart';
import 'package:flutterapp/widgets/custom_snack_bar.dart';
import 'package:google_fonts/google_fonts.dart';

class ProfileScreen extends StatelessWidget {
  final UserModel user;
  final VoidCallback? onSignedOut;

  const ProfileScreen({super.key, required this.user, this.onSignedOut});

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
            child: const ActionConfirmationDialog(
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
        Navigator.of(context).pushAndRemoveUntil(MaterialPageRoute(builder: (_) => const LoginScreen()), (_) => false);
      }
    }
  }

  Future<void> _handleDeleteAccount(BuildContext context) async {
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
            child: const ActionConfirmationDialog(
              title: kDeleteAccountConfirmTitle,
              message: kDeleteAccountConfirmMessage,
              confirmLabel: kDeleteLabel,
              icon: Icons.delete_forever_rounded,
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

      try {
        final response = await ApiService.instance.deleteAccount();
        if (response.statusCode == 200) {
          await AuthService.instance.signOut(localOnly: true);
          if (context.mounted) {
            Navigator.of(context).pop(); // Dismiss the loading dialog
            CustomSnackBar.show(context, kDeleteAccountSuccessMsg, type: CustomSnackBarType.success);
            Navigator.of(
              context,
            ).pushAndRemoveUntil(MaterialPageRoute(builder: (_) => const LoginScreen()), (_) => false);
          }
        } else {
          throw Exception(kDeleteAccountErrorMsg);
        }
      } catch (e) {
        if (context.mounted) {
          Navigator.of(context).pop(); // Dismiss the loading dialog
          CustomSnackBar.show(context, 'Error: ${e.toString()}', type: CustomSnackBarType.error);
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
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
                              kProfileTitle,
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
                  padding: EdgeInsets.symmetric(horizontal: context.scale(20), vertical: context.scale(32)),
                  child: SafeArea(
                    top: false,
                    child: Column(
                      children: [
                        // Avatar
                        ProfileAvatar(user: user),

                        SizedBox(height: context.scale(20)),

                        // Name
                        Text(
                          user.name,
                          style: GoogleFonts.inter(
                            fontSize: context.scale(22),
                            fontWeight: FontWeight.w700,
                            color: AppColors.textPrimary,
                            letterSpacing: -0.5,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        SizedBox(height: context.scale(6)),

                        // Email
                        Text(
                          user.email,
                          style: GoogleFonts.inter(fontSize: context.scale(14), color: AppColors.textSecondary),
                          textAlign: TextAlign.center,
                        ),

                        SizedBox(height: context.scale(8)),

                        // Role badge
                        Container(
                          padding: EdgeInsets.symmetric(horizontal: context.scale(12), vertical: context.scale(4)),
                          decoration: BoxDecoration(
                            color: AppColors.accent.withValues(alpha: 0.18),
                            borderRadius: BorderRadius.circular(context.scale(20)),
                            border: Border.all(color: AppColors.accent.withValues(alpha: 0.35), width: 0.8),
                          ),
                          child: Text(
                            user.role[0].toUpperCase() + user.role.substring(1),
                            style: GoogleFonts.inter(
                              fontSize: context.scale(12),
                              fontWeight: FontWeight.w600,
                              color: AppColors.accentLight,
                              letterSpacing: 0.2,
                            ),
                          ),
                        ),

                        SizedBox(height: context.scale(36)),

                        // Info card
                        ProfileInfoCard(user: user),

                        SizedBox(height: context.scale(20)),

                        // Legal card
                        const ProfileLegalCard(),

                        SizedBox(height: context.scale(32)),

                        // Delete Account button
                        ProfileDeleteAccountButton(onTap: () => _handleDeleteAccount(context)),

                        SizedBox(height: context.scale(16)),
                        
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
