import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:testapk/core/constants.dart';
import 'package:testapk/utils/extensions.dart';
import 'package:testapk/widgets/text_viewer.dart';

class DeleteAccountWarningCard extends StatelessWidget {
  const DeleteAccountWarningCard({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(context.scale(16)),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
        child: Container(
          width: double.infinity,
          padding: EdgeInsets.all(context.scale(18)),
          decoration: BoxDecoration(
            color: Colors.red.withValues(alpha: 0.10),
            borderRadius: BorderRadius.circular(context.scale(16)),
            border: Border.all(color: Colors.red.withValues(alpha: 0.25), width: 0.8),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: EdgeInsets.all(context.scale(10)),
                decoration: BoxDecoration(
                  color: Colors.redAccent.withValues(alpha: 0.20),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.warning_amber_rounded,
                  color: Colors.redAccent,
                  size: context.scale(24),
                ),
              ),
              SizedBox(width: context.scale(14)),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TextViewer(
                      kDeleteAccountWarningTitle,
                      fontSize: context.scale(16),
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                    SizedBox(height: context.scale(6)),
                    TextViewer(
                      kDeleteAccountWarningDesc,
                      fontSize: context.scale(12.5),
                      color: Colors.white.withValues(alpha: 0.70),
                      height: 1.45,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
