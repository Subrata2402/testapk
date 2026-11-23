import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:testapk/core/app_colors.dart';
import 'package:testapk/utils/extensions.dart';
import 'package:testapk/widgets/text_viewer.dart';

class DeleteAccountReasonTile extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const DeleteAccountReasonTile({
    super.key,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(context.scale(14)),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(context.scale(14)),
            child: Container(
              padding: EdgeInsets.symmetric(
                horizontal: context.scale(16),
                vertical: context.scale(14),
              ),
              decoration: BoxDecoration(
                color: isSelected
                    ? Colors.redAccent.withValues(alpha: 0.15)
                    : Colors.white.withValues(alpha: 0.05),
                borderRadius: BorderRadius.circular(context.scale(14)),
                border: Border.all(
                  color: isSelected
                      ? Colors.redAccent.withValues(alpha: 0.50)
                      : Colors.white.withValues(alpha: 0.10),
                  width: isSelected ? 1.2 : 0.8,
                ),
              ),
              child: Row(
                children: [
                  Icon(
                    isSelected
                        ? Icons.radio_button_checked_rounded
                        : Icons.radio_button_unchecked_rounded,
                    color: isSelected
                        ? Colors.redAccent
                        : Colors.white.withValues(alpha: 0.40),
                    size: context.scale(20),
                  ),
                  SizedBox(width: context.scale(12)),
                  Expanded(
                    child: TextViewer(
                      label,
                      fontSize: context.scale(14),
                      fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                      color: isSelected ? Colors.white : AppColors.textPrimary,
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
