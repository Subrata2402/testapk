import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/l10n/app_localizations.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/orb.dart';
import 'package:flutterapp/presentations/menu/faq/widgets/faq_tile.dart';
import 'package:flutterapp/widgets/text_viewer.dart';

class FaqScreen extends StatelessWidget {
  const FaqScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    final List<Map<String, String>> faqItems = [
      {'question': l10n.faqQuestion1, 'answer': l10n.faqAnswer1},
      {'question': l10n.faqQuestion2, 'answer': l10n.faqAnswer2},
      {'question': l10n.faqQuestion3, 'answer': l10n.faqAnswer3},
      {'question': l10n.faqQuestion4, 'answer': l10n.faqAnswer4},
      {'question': l10n.faqQuestion5, 'answer': l10n.faqAnswer5},
      {'question': l10n.faqQuestion6, 'answer': l10n.faqAnswer6},
    ];

    return Scaffold(
      backgroundColor: AppColors.bg3,
      body: Stack(
        children: [
          // Gradient background
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [AppColors.bg1, AppColors.bg2, AppColors.bg3],
                stops: [0.0, 0.55, 1.0],
              ),
            ),
          ),

          // Bokeh orbs
          Positioned(
            top: -context.scale(120),
            left: -context.scale(80),
            child: Orb(size: context.scale(300), color: AppColors.orb1.withValues(alpha: 0.30)),
          ),
          Positioned(
            bottom: -context.scale(60),
            right: -context.scale(60),
            child: Orb(size: context.scale(240), color: AppColors.orb4.withValues(alpha: 0.22)),
          ),

          // Content
          Column(
            children: [
              // Glass AppBar
              ClipRect(
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
                              icon: Icon(Icons.arrow_back_rounded, color: Colors.white, size: context.scale(22)),
                              onPressed: () => Navigator.of(context).pop(),
                            ),
                            TextViewer(
                              l10n.faqTitle,
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
              ),

              Expanded(
                child: ListView.builder(
                  padding: EdgeInsets.symmetric(horizontal: context.scale(20), vertical: context.scale(24)),
                  itemCount: faqItems.length,
                  itemBuilder: (context, index) {
                    final item = faqItems[index];
                    return Padding(
                      padding: EdgeInsets.only(bottom: context.scale(16)),
                      child: FaqTile(question: item['question']!, answer: item['answer']!),
                    );
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
