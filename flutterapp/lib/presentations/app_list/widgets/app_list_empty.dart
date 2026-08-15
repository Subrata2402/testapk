import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/text_viewer.dart';

class AppListEmpty extends StatelessWidget {
  const AppListEmpty({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      child: Container(
        height: MediaQuery.of(context).size.height - context.scale(150),
        alignment: Alignment.center,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.lock_person_rounded, size: context.scale(56), color: Colors.white.withValues(alpha: 0.12)),
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
          ],
        ),
      ),
    );
  }
}
