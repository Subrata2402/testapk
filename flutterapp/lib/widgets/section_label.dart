import 'package:flutter/material.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/text_viewer.dart';

class SectionLabel extends StatelessWidget {
  final String label;
  final Color? color;

  const SectionLabel({super.key, required this.label, this.color});

  @override
  Widget build(BuildContext context) => TextViewer(
    label,
    fontSize: context.scale(11),
    fontWeight: FontWeight.w600,
    color: color ?? Colors.white.withValues(alpha: 0.40),
    letterSpacing: 0.8,
  );
}
