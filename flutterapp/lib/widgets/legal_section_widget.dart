import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/legal_texts.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/text_viewer.dart';

class LegalSectionWidget extends StatelessWidget {
  final LegalSection section;

  const LegalSectionWidget({super.key, required this.section});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: context.scale(24)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextViewer(
            section.title,
            fontSize: context.scale(15),
            fontWeight: FontWeight.w600,
            color: AppColors.accentLight,
            letterSpacing: -0.2,
          ),
          SizedBox(height: context.scale(8)),
          ...section.paragraphs.map(
            (para) => Padding(
              padding: EdgeInsets.only(bottom: context.scale(8)),
              child: TextViewer(
                para,
                fontSize: context.scale(13),
                color: Colors.white.withValues(alpha: 0.75),
                height: 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
