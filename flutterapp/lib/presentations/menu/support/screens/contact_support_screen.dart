import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutterapp/core/api_service.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/auth_service.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/presentations/menu/feedback/widgets/feedback_glass_text_field.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/orb.dart';
import 'package:flutterapp/widgets/text_viewer.dart';
import 'package:flutterapp/widgets/custom_snack_bar.dart';
import 'package:flutterapp/presentations/menu/support/widgets/contact_support_submit_button.dart';

class ContactSupportScreen extends StatefulWidget {
  const ContactSupportScreen({super.key});

  @override
  State<ContactSupportScreen> createState() => _ContactSupportScreenState();
}

class _ContactSupportScreenState extends State<ContactSupportScreen> {
  final _formKey = GlobalKey<FormState>();
  final _subjectController = TextEditingController();
  final _messageController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _subjectController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  Future<void> _submitSupportRequest() async {
    if (!_formKey.currentState!.validate()) return;

    final currentUser = AuthService.instance.currentUser;
    if (currentUser == null) {
      CustomSnackBar.show(context, kErrorSessionExpired, type: CustomSnackBarType.error);
      return;
    }

    setState(() => _isLoading = true);

    try {
      final response = await ApiService.instance.contactSupport(
        name: currentUser.name,
        email: currentUser.email,
        subject: _subjectController.text.trim(),
        message: _messageController.text.trim(),
      );

      if (response.statusCode == 200) {
        if (mounted) {
          CustomSnackBar.show(context, kSupportSuccessMsg, type: CustomSnackBarType.success);
          Navigator.of(context).pop();
        }
      } else {
        throw Exception(kSupportErrorMsg);
      }
    } catch (e) {
      if (mounted) {
        CustomSnackBar.show(context, '$kErrorPrefix${e.toString()}', type: CustomSnackBarType.error);
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
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
                              kSupportTitle,
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
                child: SingleChildScrollView(
                  padding: EdgeInsets.symmetric(horizontal: context.scale(20), vertical: context.scale(24)),
                  child: SafeArea(
                    top: false,
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Subject Input
                          _buildSectionHeader(kSupportSubjectLabel),
                          SizedBox(height: context.scale(10)),
                          FeedbackGlassTextField(
                            controller: _subjectController,
                            hintText: kSupportSubjectHint,
                            validator: (val) => val == null || val.trim().isEmpty ? kSupportSubjectRequired : null,
                          ),
                          SizedBox(height: context.scale(24)),

                          // Message Input
                          _buildSectionHeader(kSupportMessageLabel),
                          SizedBox(height: context.scale(10)),
                          FeedbackGlassTextField(
                            controller: _messageController,
                            hintText: kSupportMessageHint,
                            maxLines: 8,
                            validator: (val) => val == null || val.trim().isEmpty ? kSupportMessageRequired : null,
                          ),
                          SizedBox(height: context.scale(32)),

                          // Submit Button
                          ContactSupportSubmitButton(isLoading: _isLoading, onPressed: _submitSupportRequest),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 4),
      child: TextViewer(
        title,
        fontSize: 11,
        fontWeight: FontWeight.w700,
        color: Colors.white.withValues(alpha: 0.45),
        letterSpacing: 1.2,
      ),
    );
  }
}
