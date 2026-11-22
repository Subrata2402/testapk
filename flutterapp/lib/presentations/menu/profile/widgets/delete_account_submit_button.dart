import 'package:flutter/material.dart';
import 'package:testapk/core/constants.dart';
import 'package:testapk/utils/extensions.dart';
import 'package:testapk/widgets/text_viewer.dart';

class DeleteAccountSubmitButton extends StatelessWidget {
  final bool isDeleting;
  final VoidCallback onPressed;

  const DeleteAccountSubmitButton({
    super.key,
    required this.isDeleting,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: context.scale(50),
      child: ElevatedButton(
        onPressed: isDeleting ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.redAccent,
          foregroundColor: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(context.scale(14)),
          ),
        ),
        child: isDeleting
            ? SizedBox(
                width: context.scale(22),
                height: context.scale(22),
                child: const CircularProgressIndicator(
                  strokeWidth: 2.2,
                  color: Colors.white,
                ),
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.delete_forever_rounded,
                    size: context.scale(20),
                    color: Colors.white,
                  ),
                  SizedBox(width: context.scale(8)),
                  TextViewer(
                    kDeleteAccountButton,
                    fontSize: context.scale(15),
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ],
              ),
      ),
    );
  }
}
