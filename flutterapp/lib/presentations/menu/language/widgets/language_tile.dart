import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:google_fonts/google_fonts.dart';

class LanguageTile extends StatelessWidget {
  final String flag;
  final String name;
  final bool isSelected;
  final VoidCallback onTap;

  const LanguageTile({
    super.key,
    required this.flag,
    required this.name,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(context.scale(14)),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 180),
          decoration: BoxDecoration(
            color: isSelected ? AppColors.primary.withValues(alpha: 0.18) : Colors.white.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(context.scale(14)),
            border: Border.all(
              color: isSelected ? AppColors.primary.withValues(alpha: 0.50) : Colors.white.withValues(alpha: 0.10),
              width: isSelected ? 1.2 : 0.8,
            ),
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: onTap,
              borderRadius: BorderRadius.circular(context.scale(14)),
              splashColor: Colors.white.withValues(alpha: 0.05),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: context.scale(16), vertical: context.scale(14)),
                child: Row(
                  children: [
                    Text(flag, style: TextStyle(fontSize: context.scale(22))),
                    SizedBox(width: context.scale(14)),
                    Expanded(
                      child: Text(
                        name,
                        style: GoogleFonts.inter(
                          fontSize: context.scale(14),
                          fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                          color: isSelected ? Colors.white : Colors.white70,
                        ),
                      ),
                    ),
                    AnimatedSwitcher(
                      duration: const Duration(milliseconds: 200),
                      child: isSelected
                          ? Icon(
                              Icons.check_circle_rounded,
                              key: const ValueKey('checked'),
                              color: AppColors.primary,
                              size: context.scale(20),
                            )
                          : Icon(
                              Icons.radio_button_unchecked_rounded,
                              key: const ValueKey('unchecked'),
                              color: Colors.white.withValues(alpha: 0.25),
                              size: context.scale(20),
                            ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
