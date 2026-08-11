import 'package:flutter/material.dart';
import 'package:flutterapp/core/app_colors.dart';
import 'package:flutterapp/core/storage_service.dart';
import 'package:flutterapp/l10n/app_localizations.dart';
import 'package:flutterapp/main.dart';
import 'package:flutterapp/presentations/menu/language/widgets/language_selector_app_bar.dart';
import 'package:flutterapp/presentations/menu/language/widgets/language_selector_bottom_bar.dart';
import 'package:flutterapp/presentations/menu/language/widgets/language_tile.dart';
import 'package:flutterapp/utils/extensions.dart';
import 'package:flutterapp/widgets/orb.dart';

class LanguageSelectorScreen extends StatefulWidget {
  const LanguageSelectorScreen({super.key});

  static Future<void> push(BuildContext context) {
    return Navigator.of(context).push(MaterialPageRoute(builder: (_) => const LanguageSelectorScreen()));
  }

  @override
  State<LanguageSelectorScreen> createState() => _LanguageSelectorScreenState();
}

class _LanguageSelectorScreenState extends State<LanguageSelectorScreen> {
  late String _selectedCode;
  late String _initialCode;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final code = Localizations.localeOf(context).languageCode;
    _selectedCode = code;
    _initialCode = code;
  }

  bool get _hasChanged => _selectedCode != _initialCode;

  Future<void> _save() async {
    await StorageService.instance.saveLanguage(_selectedCode);
    if (mounted) {
      TestApkApp.setLocale(context, Locale(_selectedCode));
      Navigator.of(context).pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    final languages = [
      {'code': 'en', 'name': 'English', 'flag': '🇺🇸'},
      {'code': 'es', 'name': 'Español', 'flag': '🇪🇸'},
      {'code': 'pt', 'name': 'Português', 'flag': '🇵🇹'},
      {'code': 'hi', 'name': 'हिन्दी', 'flag': '🇮🇳'},
      {'code': 'fr', 'name': 'Français', 'flag': '🇫🇷'},
      {'code': 'de', 'name': 'Deutsch', 'flag': '🇩🇪'},
      {'code': 'ja', 'name': '日本語', 'flag': '🇯🇵'},
      {'code': 'zh', 'name': '简体中文', 'flag': '🇨🇳'},
      {'code': 'ar', 'name': 'العربية', 'flag': '🇸🇦'},
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
              LanguageSelectorAppBar(title: l10n.selectLanguage),

              // Language list
              Expanded(
                child: ListView.separated(
                  padding: EdgeInsets.symmetric(horizontal: context.scale(16), vertical: context.scale(16)),
                  itemCount: languages.length,
                  separatorBuilder: (_, _) => SizedBox(height: context.scale(8)),
                  itemBuilder: (context, index) {
                    final lang = languages[index];
                    final isSelected = _selectedCode == lang['code'];
                    return LanguageTile(
                      flag: lang['flag']!,
                      name: lang['name']!,
                      isSelected: isSelected,
                      onTap: () => setState(() => _selectedCode = lang['code']!),
                    );
                  },
                ),
              ),
            ],
          ),
        ],
      ),
      bottomNavigationBar: LanguageSelectorBottomBar(
        hasChanged: _hasChanged,
        onCancel: () => Navigator.of(context).pop(),
        onSave: _save,
        cancelLabel: l10n.cancel,
        saveLabel: l10n.saveLanguage,
      ),
    );
  }
}
