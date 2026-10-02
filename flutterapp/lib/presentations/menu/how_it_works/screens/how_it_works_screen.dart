import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:testapk/core/app_colors.dart';
import 'package:testapk/core/constants.dart';
import 'package:testapk/l10n/generated_files/app_localizations.dart';
import 'package:testapk/utils/extensions.dart';
import 'package:testapk/widgets/custom_snack_bar.dart';
import 'package:testapk/widgets/glass_panel.dart';
import 'package:testapk/widgets/orb.dart';
import 'package:testapk/widgets/text_viewer.dart';
import 'package:url_launcher/url_launcher.dart';

class HowItWorksScreen extends StatelessWidget {
  const HowItWorksScreen({super.key});

  Future<void> _launchWebDashboard(BuildContext context) async {
    final Uri url = Uri.parse(kWebDashboardUrl);
    try {
      if (await canLaunchUrl(url)) {
        await launchUrl(url, mode: LaunchMode.externalApplication);
      } else {
        if (context.mounted) {
          CustomSnackBar.show(context, '$kErrorPrefix$kWebDashboardUrl', type: CustomSnackBarType.error);
        }
      }
    } catch (e) {
      if (context.mounted) {
        CustomSnackBar.show(context, '$kErrorPrefix$e', type: CustomSnackBarType.error);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

    final steps = [
      {
        'step': '1',
        'icon': Icons.laptop_chromebook_rounded,
        'title': l10n?.howItWorksStep1Title ?? kHowItWorksStep1Title,
        'description': l10n?.howItWorksStep1Desc ?? kHowItWorksStep1Desc,
      },
      {
        'step': '2',
        'icon': Icons.cloud_upload_outlined,
        'title': l10n?.howItWorksStep2Title ?? kHowItWorksStep2Title,
        'description': l10n?.howItWorksStep2Desc ?? kHowItWorksStep2Desc,
      },
      {
        'step': '3',
        'icon': Icons.person_add_alt_1_outlined,
        'title': l10n?.howItWorksStep3Title ?? kHowItWorksStep3Title,
        'description': l10n?.howItWorksStep3Desc ?? kHowItWorksStep3Desc,
      },
      {
        'step': '4',
        'icon': Icons.mark_email_read_outlined,
        'title': l10n?.howItWorksStep4Title ?? kHowItWorksStep4Title,
        'description': l10n?.howItWorksStep4Desc ?? kHowItWorksStep4Desc,
      },
      {
        'step': '5',
        'icon': Icons.view_list_rounded,
        'title': l10n?.howItWorksStep5Title ?? kHowItWorksStep5Title,
        'description': l10n?.howItWorksStep5Desc ?? kHowItWorksStep5Desc,
      },
      {
        'step': '6',
        'icon': Icons.system_update_rounded,
        'title': l10n?.howItWorksStep6Title ?? kHowItWorksStep6Title,
        'description': l10n?.howItWorksStep6Desc ?? kHowItWorksStep6Desc,
      },
    ];

    final titleText = l10n?.howItWorksTitle ?? kHowItWorksTitle;
    final subtitleText = l10n?.howItWorksSubtitle ?? kHowItWorksSubtitle;

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
                            TextViewer(
                              titleText,
                              fontSize: context.scale(18),
                              fontWeight: FontWeight.w700,
                              color: AppColors.textPrimary,
                              letterSpacing: -0.5,
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
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Header info card
                        GlassPanel(
                          borderRadius: 20,
                          padding: EdgeInsets.all(context.scale(20)),
                          child: Row(
                            children: [
                              Container(
                                width: context.scale(50),
                                height: context.scale(50),
                                decoration: BoxDecoration(
                                  gradient: const LinearGradient(
                                    colors: [AppColors.accent, AppColors.accentDark],
                                    begin: Alignment.topLeft,
                                    end: Alignment.bottomRight,
                                  ),
                                  borderRadius: BorderRadius.circular(context.scale(16)),
                                  boxShadow: [
                                    BoxShadow(
                                      color: AppColors.accent.withValues(alpha: 0.35),
                                      blurRadius: context.scale(16),
                                      spreadRadius: context.scale(2),
                                    ),
                                  ],
                                ),
                                child: Icon(
                                  Icons.help_outline_rounded,
                                  color: Colors.white,
                                  size: context.scale(28),
                                ),
                              ),
                              SizedBox(width: context.scale(16)),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    TextViewer(
                                      titleText,
                                      fontSize: context.scale(17),
                                      fontWeight: FontWeight.w700,
                                      color: AppColors.textPrimary,
                                      letterSpacing: -0.4,
                                    ),
                                    SizedBox(height: context.scale(4)),
                                    TextViewer(
                                      subtitleText,
                                      fontSize: context.scale(12),
                                      color: AppColors.textSecondary,
                                      height: 1.35,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),

                        SizedBox(height: context.scale(24)),

                        // Steps list
                        ...steps.map((item) {
                          final isStepOne = item['step'] == '1';
                          return GlassPanel(
                            margin: EdgeInsets.only(bottom: context.scale(14)),
                            padding: EdgeInsets.all(context.scale(16)),
                            borderRadius: 16,
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  width: context.scale(42),
                                  height: context.scale(42),
                                  decoration: BoxDecoration(
                                    color: AppColors.accent.withValues(alpha: 0.18),
                                    borderRadius: BorderRadius.circular(context.scale(12)),
                                    border: Border.all(
                                      color: AppColors.accentLight.withValues(alpha: 0.35),
                                      width: 1,
                                    ),
                                  ),
                                  child: Icon(
                                    item['icon'] as IconData,
                                    color: AppColors.accentLight,
                                    size: context.scale(22),
                                  ),
                                ),
                                SizedBox(width: context.scale(14)),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      TextViewer(
                                        item['title'] as String,
                                        fontSize: context.scale(15),
                                        fontWeight: FontWeight.w700,
                                        color: AppColors.textPrimary,
                                        letterSpacing: -0.3,
                                      ),
                                      SizedBox(height: context.scale(6)),
                                      TextViewer(
                                        item['description'] as String,
                                        fontSize: context.scale(13),
                                        color: Colors.white.withValues(alpha: 0.78),
                                        height: 1.45,
                                      ),
                                      if (isStepOne) ...[
                                        SizedBox(height: context.scale(12)),
                                        InkWell(
                                          onTap: () => _launchWebDashboard(context),
                                          borderRadius: BorderRadius.circular(context.scale(10)),
                                          child: Container(
                                            padding: EdgeInsets.symmetric(
                                              horizontal: context.scale(12),
                                              vertical: context.scale(8),
                                            ),
                                            decoration: BoxDecoration(
                                              color: AppColors.accent.withValues(alpha: 0.20),
                                              borderRadius: BorderRadius.circular(context.scale(10)),
                                              border: Border.all(
                                                color: AppColors.accentLight.withValues(alpha: 0.35),
                                                width: 1,
                                              ),
                                            ),
                                            child: Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                Icon(
                                                  Icons.open_in_new_rounded,
                                                  color: AppColors.accentLight,
                                                  size: context.scale(15),
                                                ),
                                                SizedBox(width: context.scale(6)),
                                                TextViewer(
                                                  l10n?.openWebDashboardBtn ?? kOpenWebDashboardBtn,
                                                  fontSize: context.scale(12),
                                                  fontWeight: FontWeight.w600,
                                                  color: AppColors.accentLight,
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ],
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          );
                        }),
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
