import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:testapk/core/app_colors.dart';
import 'package:testapk/core/constants.dart';
import 'package:testapk/utils/extensions.dart';
import 'package:testapk/widgets/text_viewer.dart';

class DeleteAccountAppBar extends StatelessWidget {
  const DeleteAccountAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipRect(
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
                    icon: Icon(
                      Icons.arrow_back_rounded,
                      color: Colors.white,
                      size: context.scale(22),
                    ),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  TextViewer(
                    kDeleteAccountLabel,
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
    );
  }
}
