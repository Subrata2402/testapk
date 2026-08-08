// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get loginErrorMsg => 'Sign-in failed. Please ensure you are a registered tester.';

  @override
  String get appName => 'TestAPK';

  @override
  String get loginSubtitle => 'Your gateway to beta releases';

  @override
  String get featureBetaTesting => 'Beta Testing';

  @override
  String get featureApkDownloads => 'APK Downloads';

  @override
  String get featureReleaseNotes => 'Release Notes';

  @override
  String get featureVerifiedBuilds => 'Verified Builds';

  @override
  String get featureSha256 => 'SHA-256 Verified';

  @override
  String get infoTitleTesterAccess => 'Tester Access Only';

  @override
  String get infoSubtitleTesterAccess => 'Only invited testers can access app releases.';

  @override
  String get infoTitleSecureStorage => 'Secure Cloud Storage';

  @override
  String get infoSubtitleSecureStorage => 'APKs stored on Google Drive, delivered securely.';

  @override
  String get infoTitleAlwaysUpToDate => 'Always Up-to-Date';

  @override
  String get infoSubtitleAlwaysUpToDate => 'Instant access to the latest builds.';

  @override
  String get loginSigningIn => 'Signing in…';

  @override
  String get loginContinueWithGoogle => 'Continue with Google';

  @override
  String get loginConfirmation => 'By signing in, you confirm you are an authorized tester.';

  @override
  String get splashSubtitle => 'Release Manager for Testers';

  @override
  String get appListErrorFailedToLoad => 'Failed to load data';

  @override
  String get appListErrorConnection => 'Connection error: ';

  @override
  String get inviteAcceptedMsg => 'Invitation accepted!';

  @override
  String get inviteAcceptFailedMsg => 'Failed to accept invitation';

  @override
  String get inviteRejectedMsg => 'Invitation rejected';

  @override
  String get inviteRejectFailedMsg => 'Failed to reject invitation';

  @override
  String get errorPrefix => 'Error: ';

  @override
  String get appListEmptyTitle => 'You haven\'t been added\nto any app yet.';

  @override
  String get appListEmptySubtitle => 'Ask a developer to invite you as a Tester.';

  @override
  String get signOutTooltip => 'Sign out';

  @override
  String get labelLatestVersion => 'Latest Version';

  @override
  String get none => 'None';

  @override
  String get tabReleases => 'Releases';

  @override
  String get tabMembers => 'Members';

  @override
  String get noReleasesMsg => 'No releases yet';

  @override
  String get teamMembersTitle => 'Team Members';

  @override
  String get teamMembersSubtitle => 'Collaborators invited to this application.';

  @override
  String get noMembersMsg => 'No members yet';

  @override
  String get buildPrefix => 'Build #';

  @override
  String get releaseDetailsTitle => 'Release Details';

  @override
  String get sectionDetails => 'DETAILS';

  @override
  String get sectionUploadedBy => 'UPLOADED BY';

  @override
  String get sectionReleaseNotes => 'RELEASE NOTES';

  @override
  String get sectionPermissionsPrefix => 'PERMISSIONS (';

  @override
  String get unknownDate => 'Unknown date';

  @override
  String get labelBuildNumber => 'Build Number';

  @override
  String get labelMinSdk => 'Min SDK';

  @override
  String get apiPrefix => 'API ';

  @override
  String get labelTargetSdk => 'Target SDK';

  @override
  String get labelSize => 'Size';

  @override
  String get downloadFailedMsg => 'Download failed (';

  @override
  String get downloadedMsg => 'Downloaded: ';

  @override
  String get launchFailedMsg => 'Failed to launch application';

  @override
  String get launchErrorMsg => 'Error launching app: ';

  @override
  String get downloadingMsg => 'Downloading… ';

  @override
  String get installUpdateBtnLabel => 'Install Update';

  @override
  String get updateBtnLabel => 'Update';

  @override
  String get openAppBtnLabel => 'Open App';

  @override
  String get installApkBtnLabel => 'Install APK';

  @override
  String get downloadApkBtnLabel => 'Download APK';

  @override
  String get retryBtnLabel => 'Retry';

  @override
  String get declineBtnLabel => 'Decline';

  @override
  String get acceptBtnLabel => 'Accept';

  @override
  String get errorInstallCancelled => 'Installation cancelled: Please grant permission to install the app.';

  @override
  String get errorInstallConflictingVersion =>
      'Installation failed: A conflicting version of the app is already installed.';

  @override
  String get errorInstallInvalidApk => 'Installation failed: The APK file is invalid or corrupted.';

  @override
  String get errorInstallInsufficientStorage => 'Installation failed: Insufficient storage space on the device.';

  @override
  String get errorInstallStartFailed => 'Failed to start installation';

  @override
  String get errorInstallPrefix => 'Installation error: ';

  @override
  String get feedbackSubmitTitle => 'Submit Feedback';

  @override
  String get feedbackCategoryLabel => 'CATEGORY';

  @override
  String get feedbackRatingLabel => 'RATING';

  @override
  String get feedbackTitleLabel => 'TITLE';

  @override
  String get feedbackDescriptionLabel => 'DESCRIPTION';

  @override
  String get feedbackTitleHint => 'Brief summary of your feedback';

  @override
  String get feedbackTitleRequired => 'Title is required';

  @override
  String get feedbackDescriptionHint => 'Provide details about your experience, bug, or feature request...';

  @override
  String get feedbackDescriptionRequired => 'Description is required';

  @override
  String get feedbackSuccessMsg => 'Thank you for your feedback!';

  @override
  String get feedbackErrorMsg => 'Failed to submit feedback';

  @override
  String get supportTitle => 'Contact Support';

  @override
  String get supportSubjectLabel => 'SUBJECT';

  @override
  String get supportMessageLabel => 'MESSAGE';

  @override
  String get supportSubjectHint => 'What is this regarding?';

  @override
  String get supportSubjectRequired => 'Subject is required';

  @override
  String get supportMessageHint => 'Describe your issue or question in detail...';

  @override
  String get supportMessageRequired => 'Message is required';

  @override
  String get supportSuccessMsg => 'Support request sent successfully!';

  @override
  String get supportErrorMsg => 'Failed to send support request';

  @override
  String get aboutTitle => 'About TestAPK';

  @override
  String get aboutVersion => 'Version 1.0.0+3';

  @override
  String get aboutDescription => 'A modern, secure, and self-hosted APK release management platform.';

  @override
  String get aboutPlatformInfoLabel => 'PLATFORM INFO';

  @override
  String get aboutSupportChannelsLabel => 'SUPPORT CHANNELS';

  @override
  String get aboutLaunchError => 'Could not launch ';

  @override
  String get labelSendFeedback => 'Send Feedback';

  @override
  String get labelTermsOfService => 'Terms of Service';

  @override
  String get labelPrivacyPolicy => 'Privacy Policy';

  @override
  String get labelAboutTestApk => 'About TestAPK';

  @override
  String get deleteAccountLabel => 'Delete Account';

  @override
  String get profileTitle => 'Profile';

  @override
  String get signOutLabel => 'Sign Out';

  @override
  String get signOutConfirmTitle => 'Sign Out';

  @override
  String get signOutConfirmMessage => 'Are you sure you want to sign out of your account?';

  @override
  String get deleteLabel => 'Delete';

  @override
  String get deleteAccountConfirmTitle => 'Delete Account?';

  @override
  String get deleteAccountConfirmMessage =>
      'Are you sure you want to delete your account? This action is permanent and cannot be undone.';

  @override
  String get deleteAccountSuccessMsg => 'Account deleted successfully';

  @override
  String get deleteAccountErrorMsg => 'Failed to delete account';

  @override
  String get errorUnexpected => 'An unexpected error occurred. Please try again.';

  @override
  String get errorTimeout => 'Connection timed out. Please check your internet connection.';

  @override
  String get errorSessionExpired => 'Session expired. Please sign in again.';

  @override
  String get errorServerError => 'Server error. Please try again later.';

  @override
  String get errorNoInternet => 'No internet connection. Please check your network settings.';

  @override
  String get errorRequestCancelled => 'Request was cancelled.';

  @override
  String get errorRequestFailedPrefix => 'Request failed: ';

  @override
  String get errorBadRequest => 'Bad request. Please check your input.';

  @override
  String get errorForbidden => 'Access denied. You do not have permission to perform this action.';

  @override
  String get selectLanguage => 'Select Language';

  @override
  String get saveLanguage => 'Save';

  @override
  String get english => 'English';

  @override
  String get spanish => 'Spanish';

  @override
  String get portuguese => 'Portuguese';

  @override
  String get hindi => 'Hindi';

  @override
  String get french => 'French';

  @override
  String get german => 'German';

  @override
  String get japanese => 'Japanese';

  @override
  String get chinese => 'Chinese';

  @override
  String get arabic => 'Arabic';

  @override
  String get cancel => 'Cancel';

  @override
  String get pendingInvitationsPrefix => 'PENDING INVITATIONS (';

  @override
  String get myApplications => 'MY APPLICATIONS';

  @override
  String get noApplicationsMsg => 'No accepted applications yet.';

  @override
  String get changeLanguageTooltip => 'Change Language';

  @override
  String get agreeToTermsPrefix => 'By signing in, you agree to our ';

  @override
  String get agreeToTermsAnd => ' and ';

  @override
  String get agreeToTermsSuffix => '.';

  @override
  String get signingIn => 'Signing in...';

  @override
  String get continueWithGoogle => 'Continue with Google';

  @override
  String get aboutWebDashboardTitle => 'Web Dashboard';

  @override
  String get aboutWebDashboardSubtitle => 'Google Drive Storage, Team Management, Release History';

  @override
  String get aboutFlutterClientTitle => 'Flutter Client';

  @override
  String get aboutFlutterClientSubtitle => 'Glassmorphic UI, One-Tap Install, Version Detection';

  @override
  String get aboutCliToolTitle => 'CLI Tool';

  @override
  String get aboutCliToolSubtitle => 'Device Auth Flow, Real-Time Progress, Drive Upload Status';

  @override
  String get aboutEmailSupport => 'Email Support';

  @override
  String get aboutGithubIssues => 'GitHub Issues';

  @override
  String get aboutDiscordCommunity => 'Discord Community';

  @override
  String get feedbackCategoryBug => 'Bug';

  @override
  String get feedbackCategoryFeature => 'Feature';

  @override
  String get feedbackCategoryOther => 'Other';

  @override
  String get feedbackRateUsQuestion => 'How would you rate us?';

  @override
  String get feedbackSubmitButton => 'Submit Feedback';

  @override
  String get profileFullName => 'Full Name';

  @override
  String get profileEmail => 'Email';

  @override
  String get profileRole => 'Role';

  @override
  String get supportSubmitButton => 'Submit Support Request';

  @override
  String get memberStatusPending => 'Pending';

  @override
  String get roleOwner => 'Owner';

  @override
  String get roleDeveloper => 'Developer';

  @override
  String get roleTester => 'Tester';

  @override
  String legalLastUpdated(String date) {
    return 'Last Updated: $date';
  }

  @override
  String get privacyPolicyLastUpdated => 'July 18, 2026';

  @override
  String get privacyPolicyTitle1 => '1. Introduction';

  @override
  String get privacyPolicyPara1_1 =>
      'Welcome to TestAPK. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web dashboard, mobile application, and command line interface (CLI).';

  @override
  String get privacyPolicyTitle2 => '2. Information We Collect';

  @override
  String get privacyPolicyPara2_1 => 'We collect information that you provide directly to us when using our services:';

  @override
  String get privacyPolicyPara2_2 =>
      '• Account Information: When you sign in using Google OAuth, we receive your name, email address, and profile picture.';

  @override
  String get privacyPolicyPara2_3 =>
      '• Google Drive Integration: To enable APK storage and management, our application requests permission to access your Google Drive. We only access, create, and modify files that are created by or uploaded through the TestAPK application (using the drive.file scope). We do not access or read any other files in your Google Drive.';

  @override
  String get privacyPolicyPara2_4 =>
      '• Application Metadata: We collect metadata about the APK files you upload (such as package name, version code, version name, and release notes) to display them in your dashboard and mobile app.';

  @override
  String get privacyPolicyTitle3 => '3. How We Use Your Information';

  @override
  String get privacyPolicyPara3_1 => 'We use the collected information for the following purposes:';

  @override
  String get privacyPolicyPara3_2 => '• To authenticate your identity and manage your account.';

  @override
  String get privacyPolicyPara3_3 =>
      '• To facilitate the upload, storage, and retrieval of APK files directly to/from your own Google Drive storage.';

  @override
  String get privacyPolicyPara3_4 =>
      '• To display application release history and details on your dashboard and mobile client.';

  @override
  String get privacyPolicyPara3_5 => '• To support the CLI tool\'s authentication and upload flows.';

  @override
  String get privacyPolicyTitle4 => '4. Data Sharing and Disclosure';

  @override
  String get privacyPolicyPara4_1 =>
      'We do not sell, trade, or share your personal data or Google Drive files with third parties. All APK files are stored directly in your own Google Drive account. The TestAPK server only stores metadata (such as file IDs, version numbers, and release notes) to coordinate downloads and installations.';

  @override
  String get privacyPolicyTitle5 => '5. Data Security';

  @override
  String get privacyPolicyPara5_1 =>
      'We implement industry-standard security measures to protect your account metadata and authentication tokens. Your Google OAuth tokens are transmitted securely and stored using encryption.';

  @override
  String get privacyPolicyTitle6 => '6. Your Rights and Choices';

  @override
  String get privacyPolicyPara6_1 => 'You have full control over your data:';

  @override
  String get privacyPolicyPara6_2 =>
      '• You can disconnect your Google Drive integration at any time through the dashboard settings.';

  @override
  String get privacyPolicyPara6_3 =>
      '• You can revoke TestAPK\'s access to your Google Account entirely by visiting the Google Account Permissions page.';

  @override
  String get privacyPolicyPara6_4 =>
      '• You can request the deletion of your TestAPK account and associated metadata by contacting us.';

  @override
  String get privacyPolicyTitle7 => '7. Contact Us';

  @override
  String get privacyPolicyPara7_1 =>
      'If you have any questions or concerns about this Privacy Policy, please contact us at subrata3250das@gmail.com.';

  @override
  String get termsOfServiceLastUpdated => 'July 18, 2026';

  @override
  String get termsOfServiceTitle1 => '1. Agreement to Terms';

  @override
  String get termsOfServicePara1_1 =>
      'By accessing or using TestAPK, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.';

  @override
  String get termsOfServiceTitle2 => '2. Description of Service';

  @override
  String get termsOfServicePara2_1 =>
      'TestAPK provides a platform for developers to host, distribute, and manage Android application packages (APKs). The service includes a web dashboard, a mobile client for testing/installation, and a command line interface (CLI) for automated uploads.';

  @override
  String get termsOfServiceTitle3 => '3. User Accounts and Security';

  @override
  String get termsOfServicePara3_1 =>
      'To use certain features of the service, you must sign in using Google OAuth. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.';

  @override
  String get termsOfServiceTitle4 => '4. Google Drive Integration';

  @override
  String get termsOfServicePara4_1 =>
      'Our service integrates with Google Drive to store your uploaded APK files. By linking your Google Drive account, you grant TestAPK permission to create, read, and delete files within the specific folder created by the application. You retain full ownership and control of all files stored in your Google Drive.';

  @override
  String get termsOfServiceTitle5 => '5. Acceptable Use';

  @override
  String get termsOfServicePara5_1 => 'You agree not to use the service to:';

  @override
  String get termsOfServicePara5_2 =>
      '• Upload or distribute malicious software, viruses, or any code designed to damage or disrupt devices.';

  @override
  String get termsOfServicePara5_3 => '• Infringe upon the intellectual property rights of others.';

  @override
  String get termsOfServicePara5_4 => '• Violate any applicable local, state, national, or international laws.';

  @override
  String get termsOfServicePara5_5 => '• Attempt to gain unauthorized access to the service or its related systems.';

  @override
  String get termsOfServiceTitle6 => '6. Limitation of Liability';

  @override
  String get termsOfServicePara6_1 =>
      'To the maximum extent permitted by law, TestAPK and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the service.';

  @override
  String get termsOfServiceTitle7 => '7. Changes to Terms';

  @override
  String get termsOfServicePara7_1 =>
      'We reserve the right to modify or replace these Terms of Service at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the service after any changes constitutes acceptance of the new terms.';

  @override
  String get termsOfServiceTitle8 => '8. Contact Us';

  @override
  String get termsOfServicePara8_1 =>
      'If you have any questions about these Terms of Service, please contact us at subrata3250das@gmail.com.';
}
