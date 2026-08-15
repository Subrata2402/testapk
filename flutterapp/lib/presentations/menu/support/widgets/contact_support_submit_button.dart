import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/text_viewer.dart';

class ContactSupportSubmitButton extends StatelessWidget {
  final bool isLoading;
  final VoidCallback? onPressed;

  const ContactSupportSubmitButton({super.key, required this.isLoading, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: context.scale(50),
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.accent,
          foregroundColor: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(context.scale(14))),
          disabledBackgroundColor: AppColors.accent.withValues(alpha: 0.50),
        ),
        child: isLoading
            ? SizedBox(
                width: context.scale(20),
                height: context.scale(20),
                child: const CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
              )
            : TextViewer(
                kSupportSubmitButton,
                fontSize: context.scale(15),
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
      ),
    );
  }
}
