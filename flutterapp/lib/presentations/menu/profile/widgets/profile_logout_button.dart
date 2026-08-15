import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/widgets/text_viewer.dart';
import 'package:flutterapp/utils/extensions.dart';

class ProfileLogoutButton extends StatelessWidget {
  final VoidCallback onTap;

  const ProfileLogoutButton({super.key, required this.onTap});

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
              width: double.infinity,
              padding: EdgeInsets.all(context.scale(16)),
              decoration: BoxDecoration(
                color: Colors.red.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(context.scale(14)),
                border: Border.all(color: Colors.red.withValues(alpha: 0.30), width: 0.8),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.logout_rounded, color: Colors.redAccent, size: context.scale(18)),
                  SizedBox(width: context.scale(10)),
                  Expanded(
                    child: TextViewer(
                      kSignOutLabel,
                      fontSize: context.scale(15),
                      fontWeight: FontWeight.w600,
                      color: Colors.redAccent,
                    ),
                  ),
                  SizedBox(width: context.scale(10)),
                  Icon(Icons.chevron_right_rounded, color: Colors.redAccent, size: context.scale(18)),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
