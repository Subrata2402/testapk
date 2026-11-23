import 'package:flutter/material.dart';
import 'package:testapk/core/api_service.dart';
import 'package:testapk/core/app_colors.dart';
import 'package:testapk/core/auth_service.dart';
import 'package:testapk/core/constants.dart';
import 'package:testapk/presentations/login/screens/login_screen.dart';
import 'package:testapk/presentations/menu/profile/widgets/action_confirmation_dialog.dart';
import 'package:testapk/presentations/menu/profile/widgets/delete_account_app_bar.dart';
import 'package:testapk/presentations/menu/profile/widgets/delete_account_other_input.dart';
import 'package:testapk/presentations/menu/profile/widgets/delete_account_reason_tile.dart';
import 'package:testapk/presentations/menu/profile/widgets/delete_account_submit_button.dart';
import 'package:testapk/presentations/menu/profile/widgets/delete_account_warning_card.dart';
import 'package:testapk/utils/extensions.dart';
import 'package:testapk/widgets/custom_snack_bar.dart';
import 'package:testapk/widgets/orb.dart';
import 'package:testapk/widgets/text_viewer.dart';

class _ReasonOption {
  final String id;
  final String Function() labelGetter;

  const _ReasonOption(this.id, this.labelGetter);
}

class DeleteAccountScreen extends StatefulWidget {
  const DeleteAccountScreen({super.key});

  @override
  State<DeleteAccountScreen> createState() => _DeleteAccountScreenState();
}

class _DeleteAccountScreenState extends State<DeleteAccountScreen> {
  String? _selectedReasonId;
  final TextEditingController _otherReasonController = TextEditingController();
  bool _isDeleting = false;

  final List<_ReasonOption> _reasonOptions = [
    _ReasonOption('no_longer_needed', () => kDeleteReasonNoLongerNeeded),
    _ReasonOption('alternative_found', () => kDeleteReasonAlternativeFound),
    _ReasonOption('technical_issues', () => kDeleteReasonTechnicalIssues),
    _ReasonOption('privacy_concerns', () => kDeleteReasonPrivacyConcerns),
    _ReasonOption('too_difficult', () => kDeleteReasonTooDifficult),
    _ReasonOption('other', () => kDeleteReasonOther),
  ];

  @override
  void dispose() {
    _otherReasonController.dispose();
    super.dispose();
  }

  Future<void> _handleDelete() async {
    // Show final confirmation dialog
    final confirmed = await showGeneralDialog<bool>(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      barrierColor: Colors.black.withValues(alpha: 0.5),
      transitionDuration: const Duration(milliseconds: 300),
      pageBuilder: (context, anim1, anim2) => const SizedBox.shrink(),
      transitionBuilder: (context, anim1, anim2, child) {
        final curve = CurvedAnimation(parent: anim1, curve: Curves.easeOutBack);
        return ScaleTransition(
          scale: curve,
          child: FadeTransition(
            opacity: anim1,
            child: ActionConfirmationDialog(
              title: kDeleteAccountConfirmTitle,
              message: kDeleteAccountConfirmMessage,
              confirmLabel: kDeleteLabel,
              icon: Icons.delete_forever_rounded,
            ),
          ),
        );
      },
    );

    if (confirmed != true || !mounted) return;

    setState(() {
      _isDeleting = true;
    });

    // Determine the reason string if any
    String? reason;
    if (_selectedReasonId == 'other') {
      final text = _otherReasonController.text.trim();
      reason = text.isNotEmpty ? text : kDeleteReasonOther;
    } else if (_selectedReasonId != null) {
      final opt = _reasonOptions.firstWhere((o) => o.id == _selectedReasonId);
      reason = opt.labelGetter();
    }

    try {
      final response = await ApiService.instance.deleteAccount(reason: reason);
      if (response.statusCode == 200) {
        await AuthService.instance.signOut(localOnly: true);
        if (mounted) {
          CustomSnackBar.show(context, kDeleteAccountSuccessMsg, type: CustomSnackBarType.success);
          Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (_) => const LoginScreen()),
            (_) => false,
          );
        }
      } else {
        throw Exception(kDeleteAccountErrorMsg);
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isDeleting = false;
        });
        CustomSnackBar.show(context, '$kErrorPrefix${e.toString()}', type: CustomSnackBarType.error);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bg3,
      body: Stack(
        children: [
          // Background Gradient
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

          // Bokeh Orbs
          Positioned(
            top: -context.scale(100),
            right: -context.scale(60),
            child: Orb(size: context.scale(260), color: Colors.redAccent.withValues(alpha: 0.15)),
          ),
          Positioned(
            bottom: -context.scale(80),
            left: -context.scale(60),
            child: Orb(size: context.scale(240), color: AppColors.orb1.withValues(alpha: 0.20)),
          ),

          // Main Column
          Column(
            children: [
              // Glass AppBar
              const DeleteAccountAppBar(),

              // Scrollable Content
              Expanded(
                child: SingleChildScrollView(
                  padding: EdgeInsets.symmetric(horizontal: context.scale(20), vertical: context.scale(20)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Warning Banner Card
                      const DeleteAccountWarningCard(),

                      SizedBox(height: context.scale(28)),

                      // Section Title
                      TextViewer(
                        kDeleteAccountSelectReasonTitle,
                        fontSize: context.scale(15),
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                        letterSpacing: -0.2,
                      ),
                      SizedBox(height: context.scale(14)),

                      // Reason Selection Cards
                      ListView.separated(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: _reasonOptions.length,
                        separatorBuilder: (_, _) => SizedBox(height: context.scale(10)),
                        padding: EdgeInsets.zero,
                        itemBuilder: (context, index) {
                          final option = _reasonOptions[index];
                          final isSelected = _selectedReasonId == option.id;

                          return DeleteAccountReasonTile(
                            label: option.labelGetter(),
                            isSelected: isSelected,
                            onTap: () {
                              setState(() {
                                if (_selectedReasonId == option.id) {
                                  _selectedReasonId = null; // Allow unselecting
                                } else {
                                  _selectedReasonId = option.id;
                                }
                              });
                            },
                          );
                        },
                      ),

                      // Animated "Other" Text Field
                      DeleteAccountOtherInput(
                        isVisible: _selectedReasonId == 'other',
                        controller: _otherReasonController,
                      ),

                      SizedBox(height: context.scale(32)),

                      // Delete Button
                      DeleteAccountSubmitButton(
                        isDeleting: _isDeleting,
                        onPressed: _handleDelete,
                      ),

                      SizedBox(height: context.scale(24)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
