import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/text_viewer.dart';

class LanguageSelectorAppBar extends StatelessWidget {
  final String title;

  const LanguageSelectorAppBar({super.key, required this.title});

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
              padding: EdgeInsets.fromLTRB(context.scale(4), context.scale(8), context.scale(16), context.scale(12)),
              child: Row(
                children: [
                  IconButton(
                    icon: Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white, size: context.scale(20)),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                  Expanded(
                    child: TextViewer(
                      title,
                      fontSize: context.scale(20),
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
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
