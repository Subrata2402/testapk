import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/api_service.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/text_viewer.dart';

class MaintenanceCard extends StatefulWidget {
  final VoidCallback? onMaintenanceEnd;

  const MaintenanceCard({super.key, this.onMaintenanceEnd});

  @override
  State<MaintenanceCard> createState() => _MaintenanceCardState();
}

class _MaintenanceCardState extends State<MaintenanceCard> {
  bool _isChecking = false;
  String? _error;

  Future<void> _checkStatus() async {
    setState(() {
      _isChecking = true;
      _error = null;
    });

    try {
      final response = await ApiService.instance.getPublicSettings();
      if (response.statusCode == 200 && response.data != null) {
        final settings = response.data['data']?['settings'];
        final isMaintenanceActive = settings?['maintenance_mode'] ?? false;
        if (!isMaintenanceActive) {
          if (widget.onMaintenanceEnd != null) {
            widget.onMaintenanceEnd!();
          } else {
            if (mounted) {
              Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
            }
          }
        } else {
          setState(() {
            _error = kMaintenanceStillActive;
          });
        }
      } else {
        setState(() {
          _error = kMaintenanceCheckFailed;
        });
      }
    } catch (e) {
      setState(() {
        _error = kMaintenanceCheckFailed;
      });
    } finally {
      if (mounted) {
        setState(() {
          _isChecking = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(context.scale(32)),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.03),
        borderRadius: BorderRadius.circular(context.scale(24)),
        border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Icon
          Container(
            width: context.scale(80),
            height: context.scale(80),
            decoration: BoxDecoration(
              color: AppColors.orb2.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.build_rounded,
              size: context.scale(36),
              color: AppColors.orb2,
            ),
          ),
          SizedBox(height: context.scale(24)),

          // Title
          TextViewer(
            kMaintenanceTitle,
            fontSize: context.scale(22),
            fontWeight: FontWeight.w700,
            color: Colors.white,
            letterSpacing: -0.5,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: context.scale(12)),

          // Description
          TextViewer(
            kMaintenanceDescription,
            fontSize: context.scale(14),
            color: Colors.white.withValues(alpha: 0.7),
            height: 1.5,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: context.scale(24)),

          // Error message if any
          if (_error != null) ...[
            Container(
              padding: EdgeInsets.all(context.scale(12)),
              decoration: BoxDecoration(
                color: AppColors.error.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(context.scale(12)),
                border: Border.all(color: AppColors.error.withValues(alpha: 0.2)),
              ),
              child: TextViewer(
                _error!,
                fontSize: context.scale(13),
                color: AppColors.error,
                textAlign: TextAlign.center,
              ),
            ),
            SizedBox(height: context.scale(24)),
          ],

          // Button
          SizedBox(
            width: double.infinity,
            height: context.scale(48),
            child: ElevatedButton(
              onPressed: _isChecking ? null : _checkStatus,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(context.scale(12)),
                ),
                elevation: 0,
              ),
              child: _isChecking
                  ? SizedBox(
                      width: context.scale(20),
                      height: context.scale(20),
                      child: const CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.refresh_rounded, size: context.scale(18)),
                        SizedBox(width: context.scale(8)),
                        TextViewer(
                          kMaintenanceCheckAgain,
                          fontSize: context.scale(15),
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                      ],
                    ),
            ),
          ),
        ],
      ),
    );
  }
}
