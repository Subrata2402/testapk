import 'package:flutter/material.dart';
import 'package:testapk/core/app_colors.dart';
import 'package:testapk/core/constants.dart';
import 'package:testapk/utils/extensions.dart';
import 'package:testapk/widgets/custom_snack_bar.dart';
import 'package:testapk/widgets/glass_panel.dart';
import 'package:testapk/widgets/text_viewer.dart';
import 'package:url_launcher/url_launcher.dart';

class AppListEmpty extends StatelessWidget {
  const AppListEmpty({super.key});

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
    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      child: Container(
        constraints: BoxConstraints(
          minHeight: MediaQuery.of(context).size.height - context.scale(150),
        ),
        alignment: Alignment.center,
        padding: EdgeInsets.symmetric(horizontal: context.scale(24), vertical: context.scale(32)),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.lock_person_rounded,
              size: context.scale(56),
              color: Colors.white.withValues(alpha: 0.12),
            ),
            SizedBox(height: context.scale(16)),
            TextViewer(
              kAppListEmptyTitle,
              textAlign: TextAlign.center,
              color: AppColors.textSecondary,
              fontSize: context.scale(15),
              letterSpacing: -0.2,
            ),
            SizedBox(height: context.scale(8)),
            TextViewer(
              kAppListEmptySubtitle,
              textAlign: TextAlign.center,
              color: AppColors.textTertiary,
              fontSize: context.scale(13),
            ),
            SizedBox(height: context.scale(32)),

            // Developer registration & app onboarding info card
            Semantics(
              container: true,
              label: '$kAppListEmptyDeveloperNoticeTitle $kAppListEmptyDeveloperNotice',
              child: GlassPanel(
                borderRadius: 16,
                padding: EdgeInsets.all(context.scale(20)),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.code_rounded,
                          size: context.scale(20),
                          color: AppColors.accentLight,
                        ),
                        SizedBox(width: context.scale(8)),
                        TextViewer(
                          kAppListEmptyDeveloperNoticeTitle,
                          fontSize: context.scale(14),
                          fontWeight: FontWeight.w600,
                          color: AppColors.accentLight,
                        ),
                      ],
                    ),
                    SizedBox(height: context.scale(8)),
                    TextViewer(
                      kAppListEmptyDeveloperNotice,
                      textAlign: TextAlign.center,
                      color: AppColors.textSecondary,
                      fontSize: context.scale(12),
                      height: 1.4,
                    ),
                    SizedBox(height: context.scale(16)),
                    OutlinedButton.icon(
                      onPressed: () => _launchWebDashboard(context),
                      icon: Icon(
                        Icons.open_in_new_rounded,
                        size: context.scale(16),
                        color: AppColors.accentLight,
                      ),
                      label: TextViewer(
                        kOpenWebDashboardBtn,
                        fontSize: context.scale(12),
                        fontWeight: FontWeight.w600,
                        color: AppColors.accentLight,
                      ),
                      style: OutlinedButton.styleFrom(
                        side: BorderSide(
                          color: AppColors.accentLight.withValues(alpha: 0.35),
                        ),
                        minimumSize: Size(context.scale(140), context.scale(44)),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(context.scale(10)),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
