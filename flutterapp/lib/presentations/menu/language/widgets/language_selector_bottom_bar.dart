import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:google_fonts/google_fonts.dart';

class LanguageSelectorBottomBar extends StatelessWidget {
  final bool hasChanged;
  final VoidCallback onCancel;
  final VoidCallback? onSave;
  final String cancelLabel;
  final String saveLabel;

  const LanguageSelectorBottomBar({
    super.key,
    required this.hasChanged,
    required this.onCancel,
    required this.onSave,
    required this.cancelLabel,
    required this.saveLabel,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.07),
            border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.10), width: 0.8)),
          ),
          child: SafeArea(
            top: false,
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: context.scale(16), vertical: context.scale(12)),
              child: Row(
                children: [
                  // Cancel button
                  Expanded(
                    child: OutlinedButton(
                      onPressed: onCancel,
                      style: OutlinedButton.styleFrom(
                        padding: EdgeInsets.symmetric(vertical: context.scale(14)),
                        side: BorderSide(color: Colors.white.withValues(alpha: 0.25), width: 0.8),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(context.scale(12))),
                      ),
                      child: Text(
                        cancelLabel,
                        style: GoogleFonts.inter(
                          color: Colors.white70,
                          fontWeight: FontWeight.w600,
                          fontSize: context.scale(14),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(width: context.scale(12)),
                  // Save button
                  Expanded(
                    child: AnimatedOpacity(
                      opacity: hasChanged ? 1.0 : 0.4,
                      duration: const Duration(milliseconds: 200),
                      child: FilledButton(
                        onPressed: hasChanged ? onSave : null,
                        style: FilledButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          disabledBackgroundColor: AppColors.primary,
                          padding: EdgeInsets.symmetric(vertical: context.scale(14)),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(context.scale(12))),
                        ),
                        child: Text(
                          saveLabel,
                          style: GoogleFonts.inter(
                            color: Colors.white,
                            fontWeight: FontWeight.w700,
                            fontSize: context.scale(14),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
