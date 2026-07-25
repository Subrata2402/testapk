import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/core/legal_texts.dart';
import 'package:flutterapp/presentations/profile/screens/about_screen.dart';
import 'package:flutterapp/presentations/profile/screens/feedback_screen.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/legal_document_viewer.dart';
import 'package:flutterapp/widgets/text_viewer.dart';

class ProfileLegalCard extends StatelessWidget {
  const ProfileLegalCard({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(context.scale(16)),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
        child: Container(
          width: double.infinity,
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.07),
            borderRadius: BorderRadius.circular(context.scale(16)),
            border: Border.all(color: Colors.white.withValues(alpha: 0.12), width: 0.8),
          ),
          child: Column(
            children: [
              _legalRow(
                context,
                icon: Icons.feedback_outlined,
                label: kLabelSendFeedback,
                onTap: () {
                  Navigator.of(context).push(MaterialPageRoute(builder: (_) => const FeedbackScreen()));
                },
              ),
              Divider(color: Colors.white.withValues(alpha: 0.08), height: 0.8, thickness: 0.8),
              _legalRow(
                context,
                icon: Icons.description_outlined,
                label: kLabelTermsOfService,
                onTap: () {
                  LegalDocumentViewer.pushScreen(
                    context,
                    title: kLabelTermsOfService,
                    lastUpdated: LegalTexts.termsOfServiceLastUpdated,
                    sections: LegalTexts.termsOfService,
                  );
                },
              ),
              Divider(color: Colors.white.withValues(alpha: 0.08), height: 0.8, thickness: 0.8),
              _legalRow(
                context,
                icon: Icons.privacy_tip_outlined,
                label: kLabelPrivacyPolicy,
                onTap: () {
                  LegalDocumentViewer.pushScreen(
                    context,
                    title: kLabelPrivacyPolicy,
                    lastUpdated: LegalTexts.privacyPolicyLastUpdated,
                    sections: LegalTexts.privacyPolicy,
                  );
                },
              ),
              Divider(color: Colors.white.withValues(alpha: 0.08), height: 0.8, thickness: 0.8),
              _legalRow(
                context,
                icon: Icons.info_outline_rounded,
                label: kLabelAboutTestApk,
                onTap: () {
                  Navigator.of(context).push(MaterialPageRoute(builder: (_) => const AboutScreen()));
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _legalRow(BuildContext context, {required IconData icon, required String label, required VoidCallback onTap}) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: context.scale(18), vertical: context.scale(16)),
          child: Row(
            children: [
              Icon(icon, color: AppColors.accentLight.withValues(alpha: 0.70), size: context.scale(18)),
              SizedBox(width: context.scale(14)),
              Expanded(
                child: TextViewer(label, fontSize: context.scale(14), color: Colors.white, fontWeight: FontWeight.w500),
              ),
              Icon(Icons.chevron_right_rounded, color: Colors.white.withValues(alpha: 0.40), size: context.scale(20)),
            ],
          ),
        ),
      ),
    );
  }
}
