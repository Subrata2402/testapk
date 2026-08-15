import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/widgets/text_viewer.dart';
import 'package:flutterapp/widgets/custom_snack_bar.dart';
import 'package:url_launcher/url_launcher.dart';

class AppUpdateDialog extends StatefulWidget {
  final String downloadLink;

  const AppUpdateDialog({super.key, required this.downloadLink});

  @override
  State<AppUpdateDialog> createState() => _AppUpdateDialogState();
}

class _AppUpdateDialogState extends State<AppUpdateDialog> {
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
        if (mounted) {
          Navigator.of(context).pop();
        }
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
    return BackdropFilter(
      filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
      child: AlertDialog(
        backgroundColor: Colors.white.withValues(alpha: 0.1),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(color: Colors.white.withValues(alpha: 0.15), width: 0.8),
        ),
        title: Row(
          children: [
            const Icon(Icons.system_update_rounded, color: AppColors.warning),
            const SizedBox(width: 8),
            TextViewer(kUpdateAvailableTitle, fontWeight: FontWeight.bold, color: Colors.white),
          ],
        ),
        content: TextViewer(kUpdateAvailableDescription, color: Colors.white.withValues(alpha: 0.8)),
        actions: [
          TextButton(
            onPressed: _isLaunching ? null : () => Navigator.of(context).pop(),
            child: TextViewer(kLaterBtnLabel, color: Colors.white.withValues(alpha: 0.6)),
          ),
          ElevatedButton(
            onPressed: _isLaunching ? null : _launchURL,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.accent,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
            ),
            child: _isLaunching
                ? const SizedBox(
                    width: 16,
                    height: 16,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  )
                : TextViewer(kUpdateBtnLabel, fontWeight: FontWeight.bold, color: Colors.white),
          ),
        ],
      ),
    );
  }
}
