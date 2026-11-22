import 'package:flutter/material.dart';
import 'package:testapk/core/app_colors.dart';
import 'package:testapk/core/constants.dart';
import 'package:testapk/utils/extensions.dart';

class DeleteAccountOtherInput extends StatelessWidget {
  final bool isVisible;
  final TextEditingController controller;

  const DeleteAccountOtherInput({
    super.key,
    required this.isVisible,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedCrossFade(
      duration: const Duration(milliseconds: 250),
      crossFadeState: isVisible ? CrossFadeState.showFirst : CrossFadeState.showSecond,
      firstChild: Container(
        margin: EdgeInsets.only(top: context.scale(14)),
        decoration: BoxDecoration(
          color: Colors.black.withValues(alpha: 0.30),
          borderRadius: BorderRadius.circular(context.scale(14)),
          border: Border.all(
            color: Colors.white.withValues(alpha: 0.15),
            width: 0.8,
          ),
        ),
        child: TextField(
          controller: controller,
          maxLines: 4,
          minLines: 2,
          style: TextStyle(
            color: Colors.white,
            fontSize: context.scale(13.5),
          ),
          cursorColor: AppColors.accent,
          decoration: InputDecoration(
            hintText: kDeleteAccountOtherHint,
            hintStyle: TextStyle(
              color: Colors.white.withValues(alpha: 0.35),
              fontSize: context.scale(13),
            ),
            border: InputBorder.none,
            contentPadding: EdgeInsets.all(context.scale(14)),
          ),
        ),
      ),
      secondChild: const SizedBox.shrink(),
    );
  }
}
