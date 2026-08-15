import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/text_viewer.dart';
import 'package:flutterapp/widgets/custom_snack_bar.dart';
import 'package:url_launcher/url_launcher.dart';

class AppUpdateCard extends StatefulWidget {
  final String downloadLink;

  const AppUpdateCard({super.key, required this.downloadLink});

  @override
  State<AppUpdateCard> createState() => _AppUpdateCardState();
}

class _AppUpdateCardState extends State<AppUpdateCard> {
  bool _isLaunching = false;

  Future<void> _launchURL() async {
    if (widget.downloadLink.isEmpty) {
      CustomSnackBar.show(context, kDownloadLinkNotConfigured, type: CustomSnackBarType.error);
      return;
    }

    setState(() {
      _isLaunching = true;
    });

    final Uri url = Uri.parse(widget.downloadLink);
    try {
      if (await canLaunchUrl(url)) {
        await launchUrl(url, mode: LaunchMode.externalApplication);
      } else {
        if (mounted) {
          CustomSnackBar.show(context, kDownloadLinkLaunchError(widget.downloadLink), type: CustomSnackBarType.error);
        }
      }
    } catch (e) {
      if (mounted) {
        CustomSnackBar.show(context, '$kErrorPrefix$e', type: CustomSnackBarType.error);
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLaunching = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
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
              color: AppColors.warning.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.system_update_rounded,
              size: context.scale(36),
              color: AppColors.warning,
            ),
          ),
          SizedBox(height: context.scale(24)),

          // Title
          TextViewer(
            kUpdateRequiredTitle,
            fontSize: context.scale(22),
            fontWeight: FontWeight.w700,
            color: Colors.white,
            letterSpacing: -0.5,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: context.scale(12)),

          // Description
          TextViewer(
            kUpdateRequiredDescription,
            fontSize: context.scale(14),
            color: Colors.white.withValues(alpha: 0.75),
            height: 1.5,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: context.scale(28)),

          // Button
          SizedBox(
            width: double.infinity,
            height: context.scale(48),
            child: ElevatedButton(
              onPressed: _isLaunching ? null : _launchURL,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.accent,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(context.scale(12)),
                ),
                elevation: 0,
              ),
              child: _isLaunching
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
                        Icon(Icons.download_rounded, size: context.scale(18)),
                        SizedBox(width: context.scale(8)),
                        TextViewer(
                          kUpdateNowBtnLabel,
                          fontSize: context.scale(15),
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                      ],
                    ),
            ),
          ),
        ],
      ),
    );
  }
}
