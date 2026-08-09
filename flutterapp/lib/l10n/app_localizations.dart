import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_ar.dart';
import 'app_localizations_de.dart';
import 'app_localizations_en.dart';
import 'app_localizations_es.dart';
import 'app_localizations_fr.dart';
import 'app_localizations_hi.dart';
import 'app_localizations_ja.dart';
import 'app_localizations_pt.dart';
import 'app_localizations_zh.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('ar'),
    Locale('de'),
    Locale('en'),
    Locale('es'),
    Locale('fr'),
    Locale('hi'),
    Locale('ja'),
    Locale('pt'),
    Locale('zh'),
  ];

  /// No description provided for @loginErrorMsg.
  ///
  /// In en, this message translates to:
  /// **'Sign-in failed. Please ensure you are a registered tester.'**
  String get loginErrorMsg;

  /// No description provided for @appName.
  ///
  /// In en, this message translates to:
  /// **'TestAPK'**
  String get appName;

  /// No description provided for @loginSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Your gateway to beta releases'**
  String get loginSubtitle;

  /// No description provided for @featureBetaTesting.
  ///
  /// In en, this message translates to:
  /// **'Beta Testing'**
  String get featureBetaTesting;

  /// No description provided for @featureApkDownloads.
  ///
  /// In en, this message translates to:
  /// **'APK Downloads'**
  String get featureApkDownloads;

  /// No description provided for @featureReleaseNotes.
  ///
  /// In en, this message translates to:
  /// **'Release Notes'**
  String get featureReleaseNotes;

  /// No description provided for @featureVerifiedBuilds.
  ///
  /// In en, this message translates to:
  /// **'Verified Builds'**
  String get featureVerifiedBuilds;

  /// No description provided for @featureSha256.
  ///
  /// In en, this message translates to:
  /// **'SHA-256 Verified'**
  String get featureSha256;

  /// No description provided for @infoTitleTesterAccess.
  ///
  /// In en, this message translates to:
  /// **'Tester Access Only'**
  String get infoTitleTesterAccess;

  /// No description provided for @infoSubtitleTesterAccess.
  ///
  /// In en, this message translates to:
  /// **'Only invited testers can access app releases.'**
  String get infoSubtitleTesterAccess;

  /// No description provided for @infoTitleSecureStorage.
  ///
  /// In en, this message translates to:
  /// **'Secure Cloud Storage'**
  String get infoTitleSecureStorage;

  /// No description provided for @infoSubtitleSecureStorage.
  ///
  /// In en, this message translates to:
  /// **'APKs stored on Google Drive, delivered securely.'**
  String get infoSubtitleSecureStorage;

  /// No description provided for @infoTitleAlwaysUpToDate.
  ///
  /// In en, this message translates to:
  /// **'Always Up-to-Date'**
  String get infoTitleAlwaysUpToDate;

  /// No description provided for @infoSubtitleAlwaysUpToDate.
  ///
  /// In en, this message translates to:
  /// **'Instant access to the latest builds.'**
  String get infoSubtitleAlwaysUpToDate;

  /// No description provided for @loginSigningIn.
  ///
  /// In en, this message translates to:
  /// **'Signing in…'**
  String get loginSigningIn;

  /// No description provided for @loginContinueWithGoogle.
  ///
  /// In en, this message translates to:
  /// **'Continue with Google'**
  String get loginContinueWithGoogle;

  /// No description provided for @loginConfirmation.
  ///
  /// In en, this message translates to:
  /// **'By signing in, you confirm you are an authorized tester.'**
  String get loginConfirmation;

  /// No description provided for @splashSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Release Manager for Testers'**
  String get splashSubtitle;

  /// No description provided for @appListErrorFailedToLoad.
  ///
  /// In en, this message translates to:
  /// **'Failed to load data'**
  String get appListErrorFailedToLoad;

  /// No description provided for @appListErrorConnection.
  ///
  /// In en, this message translates to:
  /// **'Connection error: '**
  String get appListErrorConnection;

  /// No description provided for @inviteAcceptedMsg.
  ///
  /// In en, this message translates to:
  /// **'Invitation accepted!'**
  String get inviteAcceptedMsg;

  /// No description provided for @inviteAcceptFailedMsg.
  ///
  /// In en, this message translates to:
  /// **'Failed to accept invitation'**
  String get inviteAcceptFailedMsg;

  /// No description provided for @inviteRejectedMsg.
  ///
  /// In en, this message translates to:
  /// **'Invitation rejected'**
  String get inviteRejectedMsg;

  /// No description provided for @inviteRejectFailedMsg.
  ///
  /// In en, this message translates to:
  /// **'Failed to reject invitation'**
  String get inviteRejectFailedMsg;

  /// No description provided for @errorPrefix.
  ///
  /// In en, this message translates to:
  /// **'Error: '**
  String get errorPrefix;

  /// No description provided for @appListEmptyTitle.
  ///
  /// In en, this message translates to:
  /// **'You haven\'t been added\nto any app yet.'**
  String get appListEmptyTitle;

  /// No description provided for @appListEmptySubtitle.
  ///
  /// In en, this message translates to:
  /// **'Ask a developer to invite you as a Tester.'**
  String get appListEmptySubtitle;

  /// No description provided for @signOutTooltip.
  ///
  /// In en, this message translates to:
  /// **'Sign out'**
  String get signOutTooltip;

  /// No description provided for @labelLatestVersion.
  ///
  /// In en, this message translates to:
  /// **'Latest Version'**
  String get labelLatestVersion;

  /// No description provided for @none.
  ///
  /// In en, this message translates to:
  /// **'None'**
  String get none;

  /// No description provided for @tabReleases.
  ///
  /// In en, this message translates to:
  /// **'Releases'**
  String get tabReleases;

  /// No description provided for @tabMembers.
  ///
  /// In en, this message translates to:
  /// **'Members'**
  String get tabMembers;

  /// No description provided for @noReleasesMsg.
  ///
  /// In en, this message translates to:
  /// **'No releases yet'**
  String get noReleasesMsg;

  /// No description provided for @teamMembersTitle.
  ///
  /// In en, this message translates to:
  /// **'Team Members'**
  String get teamMembersTitle;

  /// No description provided for @teamMembersSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Collaborators invited to this application.'**
  String get teamMembersSubtitle;

  /// No description provided for @noMembersMsg.
  ///
  /// In en, this message translates to:
  /// **'No members yet'**
  String get noMembersMsg;

  /// No description provided for @buildPrefix.
  ///
  /// In en, this message translates to:
  /// **'Build #'**
  String get buildPrefix;

  /// No description provided for @releaseDetailsTitle.
  ///
  /// In en, this message translates to:
  /// **'Release Details'**
  String get releaseDetailsTitle;

  /// No description provided for @sectionDetails.
  ///
  /// In en, this message translates to:
  /// **'DETAILS'**
  String get sectionDetails;

  /// No description provided for @sectionUploadedBy.
  ///
  /// In en, this message translates to:
  /// **'UPLOADED BY'**
  String get sectionUploadedBy;

  /// No description provided for @sectionReleaseNotes.
  ///
  /// In en, this message translates to:
  /// **'RELEASE NOTES'**
  String get sectionReleaseNotes;

  /// No description provided for @sectionPermissionsPrefix.
  ///
  /// In en, this message translates to:
  /// **'PERMISSIONS ('**
  String get sectionPermissionsPrefix;

  /// No description provided for @unknownDate.
  ///
  /// In en, this message translates to:
  /// **'Unknown date'**
  String get unknownDate;

  /// No description provided for @labelBuildNumber.
  ///
  /// In en, this message translates to:
  /// **'Build Number'**
  String get labelBuildNumber;

  /// No description provided for @labelMinSdk.
  ///
  /// In en, this message translates to:
  /// **'Min SDK'**
  String get labelMinSdk;

  /// No description provided for @apiPrefix.
  ///
  /// In en, this message translates to:
  /// **'API '**
  String get apiPrefix;

  /// No description provided for @labelTargetSdk.
  ///
  /// In en, this message translates to:
  /// **'Target SDK'**
  String get labelTargetSdk;

  /// No description provided for @labelSize.
  ///
  /// In en, this message translates to:
  /// **'Size'**
  String get labelSize;

  /// No description provided for @downloadFailedMsg.
  ///
  /// In en, this message translates to:
  /// **'Download failed ('**
  String get downloadFailedMsg;

  /// No description provided for @downloadedMsg.
  ///
  /// In en, this message translates to:
  /// **'Downloaded: '**
  String get downloadedMsg;

  /// No description provided for @launchFailedMsg.
  ///
  /// In en, this message translates to:
  /// **'Failed to launch application'**
  String get launchFailedMsg;

  /// No description provided for @launchErrorMsg.
  ///
  /// In en, this message translates to:
  /// **'Error launching app: '**
  String get launchErrorMsg;

  /// No description provided for @downloadingMsg.
  ///
  /// In en, this message translates to:
  /// **'Downloading… '**
  String get downloadingMsg;

  /// No description provided for @installUpdateBtnLabel.
  ///
  /// In en, this message translates to:
  /// **'Install Update'**
  String get installUpdateBtnLabel;

  /// No description provided for @updateBtnLabel.
  ///
  /// In en, this message translates to:
  /// **'Update'**
  String get updateBtnLabel;

  /// No description provided for @openAppBtnLabel.
  ///
  /// In en, this message translates to:
  /// **'Open App'**
  String get openAppBtnLabel;

  /// No description provided for @installApkBtnLabel.
  ///
  /// In en, this message translates to:
  /// **'Install APK'**
  String get installApkBtnLabel;

  /// No description provided for @downloadApkBtnLabel.
  ///
  /// In en, this message translates to:
  /// **'Download APK'**
  String get downloadApkBtnLabel;

  /// No description provided for @retryBtnLabel.
  ///
  /// In en, this message translates to:
  /// **'Retry'**
  String get retryBtnLabel;

  /// No description provided for @declineBtnLabel.
  ///
  /// In en, this message translates to:
  /// **'Decline'**
  String get declineBtnLabel;

  /// No description provided for @acceptBtnLabel.
  ///
  /// In en, this message translates to:
  /// **'Accept'**
  String get acceptBtnLabel;

  /// No description provided for @errorInstallCancelled.
  ///
  /// In en, this message translates to:
  /// **'Installation cancelled: Please grant permission to install the app.'**
  String get errorInstallCancelled;

  /// No description provided for @errorInstallConflictingVersion.
  ///
  /// In en, this message translates to:
  /// **'Installation failed: A conflicting version of the app is already installed.'**
  String get errorInstallConflictingVersion;

  /// No description provided for @errorInstallInvalidApk.
  ///
  /// In en, this message translates to:
  /// **'Installation failed: The APK file is invalid or corrupted.'**
  String get errorInstallInvalidApk;

  /// No description provided for @errorInstallInsufficientStorage.
  ///
  /// In en, this message translates to:
  /// **'Installation failed: Insufficient storage space on the device.'**
  String get errorInstallInsufficientStorage;

  /// No description provided for @errorInstallStartFailed.
  ///
  /// In en, this message translates to:
  /// **'Failed to start installation'**
  String get errorInstallStartFailed;

  /// No description provided for @errorInstallPrefix.
  ///
  /// In en, this message translates to:
  /// **'Installation error: '**
  String get errorInstallPrefix;

  /// No description provided for @feedbackSubmitTitle.
  ///
  /// In en, this message translates to:
  /// **'Submit Feedback'**
  String get feedbackSubmitTitle;

  /// No description provided for @feedbackCategoryLabel.
  ///
  /// In en, this message translates to:
  /// **'CATEGORY'**
  String get feedbackCategoryLabel;

  /// No description provided for @feedbackRatingLabel.
  ///
  /// In en, this message translates to:
  /// **'RATING'**
  String get feedbackRatingLabel;

  /// No description provided for @feedbackTitleLabel.
  ///
  /// In en, this message translates to:
  /// **'TITLE'**
  String get feedbackTitleLabel;

  /// No description provided for @feedbackDescriptionLabel.
  ///
  /// In en, this message translates to:
  /// **'DESCRIPTION'**
  String get feedbackDescriptionLabel;

  /// No description provided for @feedbackTitleHint.
  ///
  /// In en, this message translates to:
  /// **'Brief summary of your feedback'**
  String get feedbackTitleHint;

  /// No description provided for @feedbackTitleRequired.
  ///
  /// In en, this message translates to:
  /// **'Title is required'**
  String get feedbackTitleRequired;

  /// No description provided for @feedbackDescriptionHint.
  ///
  /// In en, this message translates to:
  /// **'Provide details about your experience, bug, or feature request...'**
  String get feedbackDescriptionHint;

  /// No description provided for @feedbackDescriptionRequired.
  ///
  /// In en, this message translates to:
  /// **'Description is required'**
  String get feedbackDescriptionRequired;

  /// No description provided for @feedbackSuccessMsg.
  ///
  /// In en, this message translates to:
  /// **'Thank you for your feedback!'**
  String get feedbackSuccessMsg;

  /// No description provided for @feedbackErrorMsg.
  ///
  /// In en, this message translates to:
  /// **'Failed to submit feedback'**
  String get feedbackErrorMsg;

  /// No description provided for @supportTitle.
  ///
  /// In en, this message translates to:
  /// **'Contact Support'**
  String get supportTitle;

  /// No description provided for @supportSubjectLabel.
  ///
  /// In en, this message translates to:
  /// **'SUBJECT'**
  String get supportSubjectLabel;

  /// No description provided for @supportMessageLabel.
  ///
  /// In en, this message translates to:
  /// **'MESSAGE'**
  String get supportMessageLabel;

  /// No description provided for @supportSubjectHint.
  ///
  /// In en, this message translates to:
  /// **'What is this regarding?'**
  String get supportSubjectHint;

  /// No description provided for @supportSubjectRequired.
  ///
  /// In en, this message translates to:
  /// **'Subject is required'**
  String get supportSubjectRequired;

  /// No description provided for @supportMessageHint.
  ///
  /// In en, this message translates to:
  /// **'Describe your issue or question in detail...'**
  String get supportMessageHint;

  /// No description provided for @supportMessageRequired.
  ///
  /// In en, this message translates to:
  /// **'Message is required'**
  String get supportMessageRequired;

  /// No description provided for @supportSuccessMsg.
  ///
  /// In en, this message translates to:
  /// **'Support request sent successfully!'**
  String get supportSuccessMsg;

  /// No description provided for @supportErrorMsg.
  ///
  /// In en, this message translates to:
  /// **'Failed to send support request'**
  String get supportErrorMsg;

  /// No description provided for @aboutTitle.
  ///
  /// In en, this message translates to:
  /// **'About TestAPK'**
  String get aboutTitle;

  /// No description provided for @aboutVersion.
  ///
  /// In en, this message translates to:
  /// **'Version 1.0.0+3'**
  String get aboutVersion;

  /// No description provided for @aboutDescription.
  ///
  /// In en, this message translates to:
  /// **'A modern, secure, and self-hosted APK release management platform.'**
  String get aboutDescription;

  /// No description provided for @aboutPlatformInfoLabel.
  ///
  /// In en, this message translates to:
  /// **'PLATFORM INFO'**
  String get aboutPlatformInfoLabel;

  /// No description provided for @aboutSupportChannelsLabel.
  ///
  /// In en, this message translates to:
  /// **'SUPPORT CHANNELS'**
  String get aboutSupportChannelsLabel;

  /// No description provided for @aboutLaunchError.
  ///
  /// In en, this message translates to:
  /// **'Could not launch '**
  String get aboutLaunchError;

  /// No description provided for @labelSendFeedback.
  ///
  /// In en, this message translates to:
  /// **'Send Feedback'**
  String get labelSendFeedback;

  /// No description provided for @labelTermsOfService.
  ///
  /// In en, this message translates to:
  /// **'Terms of Service'**
  String get labelTermsOfService;

  /// No description provided for @labelPrivacyPolicy.
  ///
  /// In en, this message translates to:
  /// **'Privacy Policy'**
  String get labelPrivacyPolicy;

  /// No description provided for @labelAboutTestApk.
  ///
  /// In en, this message translates to:
  /// **'About TestAPK'**
  String get labelAboutTestApk;

  /// No description provided for @deleteAccountLabel.
  ///
  /// In en, this message translates to:
  /// **'Delete Account'**
  String get deleteAccountLabel;

  /// No description provided for @profileTitle.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get profileTitle;

  /// No description provided for @signOutLabel.
  ///
  /// In en, this message translates to:
  /// **'Sign Out'**
  String get signOutLabel;

  /// No description provided for @signOutConfirmTitle.
  ///
  /// In en, this message translates to:
  /// **'Sign Out'**
  String get signOutConfirmTitle;

  /// No description provided for @signOutConfirmMessage.
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to sign out of your account?'**
  String get signOutConfirmMessage;

  /// No description provided for @deleteLabel.
  ///
  /// In en, this message translates to:
  /// **'Delete'**
  String get deleteLabel;

  /// No description provided for @deleteAccountConfirmTitle.
  ///
  /// In en, this message translates to:
  /// **'Delete Account?'**
  String get deleteAccountConfirmTitle;

  /// No description provided for @deleteAccountConfirmMessage.
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to delete your account? This action is permanent and cannot be undone.'**
  String get deleteAccountConfirmMessage;

  /// No description provided for @deleteAccountSuccessMsg.
  ///
  /// In en, this message translates to:
  /// **'Account deleted successfully'**
  String get deleteAccountSuccessMsg;

  /// No description provided for @deleteAccountErrorMsg.
  ///
  /// In en, this message translates to:
  /// **'Failed to delete account'**
  String get deleteAccountErrorMsg;

  /// No description provided for @errorUnexpected.
  ///
  /// In en, this message translates to:
  /// **'An unexpected error occurred. Please try again.'**
  String get errorUnexpected;

  /// No description provided for @errorTimeout.
  ///
  /// In en, this message translates to:
  /// **'Connection timed out. Please check your internet connection.'**
  String get errorTimeout;

  /// No description provided for @errorSessionExpired.
  ///
  /// In en, this message translates to:
  /// **'Session expired. Please sign in again.'**
  String get errorSessionExpired;

  /// No description provided for @errorServerError.
  ///
  /// In en, this message translates to:
  /// **'Server error. Please try again later.'**
  String get errorServerError;

  /// No description provided for @errorNoInternet.
  ///
  /// In en, this message translates to:
  /// **'No internet connection. Please check your network settings.'**
  String get errorNoInternet;

  /// No description provided for @errorRequestCancelled.
  ///
  /// In en, this message translates to:
  /// **'Request was cancelled.'**
  String get errorRequestCancelled;

  /// No description provided for @errorRequestFailedPrefix.
  ///
  /// In en, this message translates to:
  /// **'Request failed: '**
  String get errorRequestFailedPrefix;

  /// No description provided for @errorBadRequest.
  ///
  /// In en, this message translates to:
  /// **'Bad request. Please check your input.'**
  String get errorBadRequest;

  /// No description provided for @errorForbidden.
  ///
  /// In en, this message translates to:
  /// **'Access denied. You do not have permission to perform this action.'**
  String get errorForbidden;

  /// No description provided for @selectLanguage.
  ///
  /// In en, this message translates to:
  /// **'Select Language'**
  String get selectLanguage;

  /// No description provided for @saveLanguage.
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get saveLanguage;

  /// No description provided for @english.
  ///
  /// In en, this message translates to:
  /// **'English'**
  String get english;

  /// No description provided for @spanish.
  ///
  /// In en, this message translates to:
  /// **'Spanish'**
  String get spanish;

  /// No description provided for @portuguese.
  ///
  /// In en, this message translates to:
  /// **'Portuguese'**
  String get portuguese;

  /// No description provided for @hindi.
  ///
  /// In en, this message translates to:
  /// **'Hindi'**
  String get hindi;

  /// No description provided for @french.
  ///
  /// In en, this message translates to:
  /// **'French'**
  String get french;

  /// No description provided for @german.
  ///
  /// In en, this message translates to:
  /// **'German'**
  String get german;

  /// No description provided for @japanese.
  ///
  /// In en, this message translates to:
  /// **'Japanese'**
  String get japanese;

  /// No description provided for @chinese.
  ///
  /// In en, this message translates to:
  /// **'Chinese'**
  String get chinese;

  /// No description provided for @arabic.
  ///
  /// In en, this message translates to:
  /// **'Arabic'**
  String get arabic;

  /// No description provided for @cancel.
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get cancel;

  /// No description provided for @pendingInvitationsPrefix.
  ///
  /// In en, this message translates to:
  /// **'PENDING INVITATIONS ('**
  String get pendingInvitationsPrefix;

  /// No description provided for @myApplications.
  ///
  /// In en, this message translates to:
  /// **'MY APPLICATIONS'**
  String get myApplications;

  /// No description provided for @noApplicationsMsg.
  ///
  /// In en, this message translates to:
  /// **'No accepted applications yet.'**
  String get noApplicationsMsg;

  /// No description provided for @changeLanguageTooltip.
  ///
  /// In en, this message translates to:
  /// **'Change Language'**
  String get changeLanguageTooltip;

  /// No description provided for @agreeToTermsPrefix.
  ///
  /// In en, this message translates to:
  /// **'By signing in, you agree to our '**
  String get agreeToTermsPrefix;

  /// No description provided for @agreeToTermsAnd.
  ///
  /// In en, this message translates to:
  /// **' and '**
  String get agreeToTermsAnd;

  /// No description provided for @agreeToTermsSuffix.
  ///
  /// In en, this message translates to:
  /// **'.'**
  String get agreeToTermsSuffix;

  /// No description provided for @signingIn.
  ///
  /// In en, this message translates to:
  /// **'Signing in...'**
  String get signingIn;

  /// No description provided for @continueWithGoogle.
  ///
  /// In en, this message translates to:
  /// **'Continue with Google'**
  String get continueWithGoogle;

  /// No description provided for @aboutWebDashboardTitle.
  ///
  /// In en, this message translates to:
  /// **'Web Dashboard'**
  String get aboutWebDashboardTitle;

  /// No description provided for @aboutWebDashboardSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Google Drive Storage, Team Management, Release History'**
  String get aboutWebDashboardSubtitle;

  /// No description provided for @aboutFlutterClientTitle.
  ///
  /// In en, this message translates to:
  /// **'Flutter Client'**
  String get aboutFlutterClientTitle;

  /// No description provided for @aboutFlutterClientSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Glassmorphic UI, One-Tap Install, Version Detection'**
  String get aboutFlutterClientSubtitle;

  /// No description provided for @aboutCliToolTitle.
  ///
  /// In en, this message translates to:
  /// **'CLI Tool'**
  String get aboutCliToolTitle;

  /// No description provided for @aboutCliToolSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Device Auth Flow, Real-Time Progress, Drive Upload Status'**
  String get aboutCliToolSubtitle;

  /// No description provided for @aboutEmailSupport.
  ///
  /// In en, this message translates to:
  /// **'Email Support'**
  String get aboutEmailSupport;

  /// No description provided for @aboutGithubIssues.
  ///
  /// In en, this message translates to:
  /// **'GitHub Issues'**
  String get aboutGithubIssues;

  /// No description provided for @aboutDiscordCommunity.
  ///
  /// In en, this message translates to:
  /// **'Discord Community'**
  String get aboutDiscordCommunity;

  /// No description provided for @feedbackCategoryBug.
  ///
  /// In en, this message translates to:
  /// **'Bug'**
  String get feedbackCategoryBug;

  /// No description provided for @feedbackCategoryFeature.
  ///
  /// In en, this message translates to:
  /// **'Feature'**
  String get feedbackCategoryFeature;

  /// No description provided for @feedbackCategoryOther.
  ///
  /// In en, this message translates to:
  /// **'Other'**
  String get feedbackCategoryOther;

  /// No description provided for @feedbackRateUsQuestion.
  ///
  /// In en, this message translates to:
  /// **'How would you rate us?'**
  String get feedbackRateUsQuestion;

  /// No description provided for @feedbackSubmitButton.
  ///
  /// In en, this message translates to:
  /// **'Submit Feedback'**
  String get feedbackSubmitButton;

  /// No description provided for @profileFullName.
  ///
  /// In en, this message translates to:
  /// **'Full Name'**
  String get profileFullName;

  /// No description provided for @profileEmail.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get profileEmail;

  /// No description provided for @profileRole.
  ///
  /// In en, this message translates to:
  /// **'Role'**
  String get profileRole;

  /// No description provided for @supportSubmitButton.
  ///
  /// In en, this message translates to:
  /// **'Submit Support Request'**
  String get supportSubmitButton;

  /// No description provided for @memberStatusPending.
  ///
  /// In en, this message translates to:
  /// **'Pending'**
  String get memberStatusPending;

  /// No description provided for @roleOwner.
  ///
  /// In en, this message translates to:
  /// **'Owner'**
  String get roleOwner;

  /// No description provided for @roleDeveloper.
  ///
  /// In en, this message translates to:
  /// **'Developer'**
  String get roleDeveloper;

  /// No description provided for @roleTester.
  ///
  /// In en, this message translates to:
  /// **'Tester'**
  String get roleTester;

  /// No description provided for @legalLastUpdated.
  ///
  /// In en, this message translates to:
  /// **'Last Updated: {date}'**
  String legalLastUpdated(String date);

  /// No description provided for @privacyPolicyLastUpdated.
  ///
  /// In en, this message translates to:
  /// **'July 18, 2026'**
  String get privacyPolicyLastUpdated;

  /// No description provided for @privacyPolicyTitle1.
  ///
  /// In en, this message translates to:
  /// **'1. Introduction'**
  String get privacyPolicyTitle1;

  /// No description provided for @privacyPolicyPara1_1.
  ///
  /// In en, this message translates to:
  /// **'Welcome to TestAPK. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web dashboard, mobile application, and command line interface (CLI).'**
  String get privacyPolicyPara1_1;

  /// No description provided for @privacyPolicyTitle2.
  ///
  /// In en, this message translates to:
  /// **'2. Information We Collect'**
  String get privacyPolicyTitle2;

  /// No description provided for @privacyPolicyPara2_1.
  ///
  /// In en, this message translates to:
  /// **'We collect information that you provide directly to us when using our services:'**
  String get privacyPolicyPara2_1;

  /// No description provided for @privacyPolicyPara2_2.
  ///
  /// In en, this message translates to:
  /// **'• Account Information: When you sign in using Google OAuth, we receive your name, email address, and profile picture.'**
  String get privacyPolicyPara2_2;

  /// No description provided for @privacyPolicyPara2_3.
  ///
  /// In en, this message translates to:
  /// **'• Google Drive Integration: To enable APK storage and management, our application requests permission to access your Google Drive. We only access, create, and modify files that are created by or uploaded through the TestAPK application (using the drive.file scope). We do not access or read any other files in your Google Drive.'**
  String get privacyPolicyPara2_3;

  /// No description provided for @privacyPolicyPara2_4.
  ///
  /// In en, this message translates to:
  /// **'• Application Metadata: We collect metadata about the APK files you upload (such as package name, version code, version name, and release notes) to display them in your dashboard and mobile app.'**
  String get privacyPolicyPara2_4;

  /// No description provided for @privacyPolicyTitle3.
  ///
  /// In en, this message translates to:
  /// **'3. How We Use Your Information'**
  String get privacyPolicyTitle3;

  /// No description provided for @privacyPolicyPara3_1.
  ///
  /// In en, this message translates to:
  /// **'We use the collected information for the following purposes:'**
  String get privacyPolicyPara3_1;

  /// No description provided for @privacyPolicyPara3_2.
  ///
  /// In en, this message translates to:
  /// **'• To authenticate your identity and manage your account.'**
  String get privacyPolicyPara3_2;

  /// No description provided for @privacyPolicyPara3_3.
  ///
  /// In en, this message translates to:
  /// **'• To facilitate the upload, storage, and retrieval of APK files directly to/from your own Google Drive storage.'**
  String get privacyPolicyPara3_3;

  /// No description provided for @privacyPolicyPara3_4.
  ///
  /// In en, this message translates to:
  /// **'• To display application release history and details on your dashboard and mobile client.'**
  String get privacyPolicyPara3_4;

  /// No description provided for @privacyPolicyPara3_5.
  ///
  /// In en, this message translates to:
  /// **'• To support the CLI tool\'s authentication and upload flows.'**
  String get privacyPolicyPara3_5;

  /// No description provided for @privacyPolicyTitle4.
  ///
  /// In en, this message translates to:
  /// **'4. Data Sharing and Disclosure'**
  String get privacyPolicyTitle4;

  /// No description provided for @privacyPolicyPara4_1.
  ///
  /// In en, this message translates to:
  /// **'We do not sell, trade, or share your personal data or Google Drive files with third parties. All APK files are stored directly in your own Google Drive account. The TestAPK server only stores metadata (such as file IDs, version numbers, and release notes) to coordinate downloads and installations.'**
  String get privacyPolicyPara4_1;

  /// No description provided for @privacyPolicyTitle5.
  ///
  /// In en, this message translates to:
  /// **'5. Data Security'**
  String get privacyPolicyTitle5;

  /// No description provided for @privacyPolicyPara5_1.
  ///
  /// In en, this message translates to:
  /// **'We implement industry-standard security measures to protect your account metadata and authentication tokens. Your Google OAuth tokens are transmitted securely and stored using encryption.'**
  String get privacyPolicyPara5_1;

  /// No description provided for @privacyPolicyTitle6.
  ///
  /// In en, this message translates to:
  /// **'6. Your Rights and Choices'**
  String get privacyPolicyTitle6;

  /// No description provided for @privacyPolicyPara6_1.
  ///
  /// In en, this message translates to:
  /// **'You have full control over your data:'**
  String get privacyPolicyPara6_1;

  /// No description provided for @privacyPolicyPara6_2.
  ///
  /// In en, this message translates to:
  /// **'• You can disconnect your Google Drive integration at any time through the dashboard settings.'**
  String get privacyPolicyPara6_2;

  /// No description provided for @privacyPolicyPara6_3.
  ///
  /// In en, this message translates to:
  /// **'• You can revoke TestAPK\'s access to your Google Account entirely by visiting the Google Account Permissions page.'**
  String get privacyPolicyPara6_3;

  /// No description provided for @privacyPolicyPara6_4.
  ///
  /// In en, this message translates to:
  /// **'• You can request the deletion of your TestAPK account and associated metadata by contacting us.'**
  String get privacyPolicyPara6_4;

  /// No description provided for @privacyPolicyTitle7.
  ///
  /// In en, this message translates to:
  /// **'7. Contact Us'**
  String get privacyPolicyTitle7;

  /// No description provided for @privacyPolicyPara7_1.
  ///
  /// In en, this message translates to:
  /// **'If you have any questions or concerns about this Privacy Policy, please contact us at subrata3250das@gmail.com.'**
  String get privacyPolicyPara7_1;

  /// No description provided for @termsOfServiceLastUpdated.
  ///
  /// In en, this message translates to:
  /// **'July 18, 2026'**
  String get termsOfServiceLastUpdated;

  /// No description provided for @termsOfServiceTitle1.
  ///
  /// In en, this message translates to:
  /// **'1. Agreement to Terms'**
  String get termsOfServiceTitle1;

  /// No description provided for @termsOfServicePara1_1.
  ///
  /// In en, this message translates to:
  /// **'By accessing or using TestAPK, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'**
  String get termsOfServicePara1_1;

  /// No description provided for @termsOfServiceTitle2.
  ///
  /// In en, this message translates to:
  /// **'2. Description of Service'**
  String get termsOfServiceTitle2;

  /// No description provided for @termsOfServicePara2_1.
  ///
  /// In en, this message translates to:
  /// **'TestAPK provides a platform for developers to host, distribute, and manage Android application packages (APKs). The service includes a web dashboard, a mobile client for testing/installation, and a command line interface (CLI) for automated uploads.'**
  String get termsOfServicePara2_1;

  /// No description provided for @termsOfServiceTitle3.
  ///
  /// In en, this message translates to:
  /// **'3. User Accounts and Security'**
  String get termsOfServiceTitle3;

  /// No description provided for @termsOfServicePara3_1.
  ///
  /// In en, this message translates to:
  /// **'To use certain features of the service, you must sign in using Google OAuth. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.'**
  String get termsOfServicePara3_1;

  /// No description provided for @termsOfServiceTitle4.
  ///
  /// In en, this message translates to:
  /// **'4. Google Drive Integration'**
  String get termsOfServiceTitle4;

  /// No description provided for @termsOfServicePara4_1.
  ///
  /// In en, this message translates to:
  /// **'Our service integrates with Google Drive to store your uploaded APK files. By linking your Google Drive account, you grant TestAPK permission to create, read, and delete files within the specific folder created by the application. You retain full ownership and control of all files stored in your Google Drive.'**
  String get termsOfServicePara4_1;

  /// No description provided for @termsOfServiceTitle5.
  ///
  /// In en, this message translates to:
  /// **'5. Acceptable Use'**
  String get termsOfServiceTitle5;

  /// No description provided for @termsOfServicePara5_1.
  ///
  /// In en, this message translates to:
  /// **'You agree not to use the service to:'**
  String get termsOfServicePara5_1;

  /// No description provided for @termsOfServicePara5_2.
  ///
  /// In en, this message translates to:
  /// **'• Upload or distribute malicious software, viruses, or any code designed to damage or disrupt devices.'**
  String get termsOfServicePara5_2;

  /// No description provided for @termsOfServicePara5_3.
  ///
  /// In en, this message translates to:
  /// **'• Infringe upon the intellectual property rights of others.'**
  String get termsOfServicePara5_3;

  /// No description provided for @termsOfServicePara5_4.
  ///
  /// In en, this message translates to:
  /// **'• Violate any applicable local, state, national, or international laws.'**
  String get termsOfServicePara5_4;

  /// No description provided for @termsOfServicePara5_5.
  ///
  /// In en, this message translates to:
  /// **'• Attempt to gain unauthorized access to the service or its related systems.'**
  String get termsOfServicePara5_5;

  /// No description provided for @termsOfServiceTitle6.
  ///
  /// In en, this message translates to:
  /// **'6. Limitation of Liability'**
  String get termsOfServiceTitle6;

  /// No description provided for @termsOfServicePara6_1.
  ///
  /// In en, this message translates to:
  /// **'To the maximum extent permitted by law, TestAPK and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the service.'**
  String get termsOfServicePara6_1;

  /// No description provided for @termsOfServiceTitle7.
  ///
  /// In en, this message translates to:
  /// **'7. Changes to Terms'**
  String get termsOfServiceTitle7;

  /// No description provided for @termsOfServicePara7_1.
  ///
  /// In en, this message translates to:
  /// **'We reserve the right to modify or replace these Terms of Service at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the service after any changes constitutes acceptance of the new terms.'**
  String get termsOfServicePara7_1;

  /// No description provided for @termsOfServiceTitle8.
  ///
  /// In en, this message translates to:
  /// **'8. Contact Us'**
  String get termsOfServiceTitle8;

  /// No description provided for @termsOfServicePara8_1.
  ///
  /// In en, this message translates to:
  /// **'If you have any questions about these Terms of Service, please contact us at subrata3250das@gmail.com.'**
  String get termsOfServicePara8_1;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) => <String>[
    'ar',
    'de',
    'en',
    'es',
    'fr',
    'hi',
    'ja',
    'pt',
    'zh',
  ].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'ar':
      return AppLocalizationsAr();
    case 'de':
      return AppLocalizationsDe();
    case 'en':
      return AppLocalizationsEn();
    case 'es':
      return AppLocalizationsEs();
    case 'fr':
      return AppLocalizationsFr();
    case 'hi':
      return AppLocalizationsHi();
    case 'ja':
      return AppLocalizationsJa();
    case 'pt':
      return AppLocalizationsPt();
    case 'zh':
      return AppLocalizationsZh();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
