import 'package:flutterapp/core/navigation.dart';
import 'package:flutterapp/l10n/app_localizations.dart';

const String kMethodChannelName = "com.testapk.app/app_launcher";

/// API Base URL
String kApiBaseUrl = "";

/// Google OAuth Client ID (Web Client ID from Google Console)
const String kGoogleClientId = '229511253859-m9otrv5gp2g1l63un2mq3hosbniv598u.apps.googleusercontent.com';

AppLocalizations? get _l10n {
  final context = navigatorKey.currentContext;
  if (context == null) return null;
  return AppLocalizations.of(context);
}

/// User-facing strings for LoginScreen
String get kLoginErrorMsg => _l10n?.loginErrorMsg ?? 'Sign-in failed. Please ensure you are a registered tester.';
String get kAppName => _l10n?.appName ?? 'TestAPK';
String get kLoginSubtitle => _l10n?.loginSubtitle ?? 'Your gateway to beta releases';
String get kFeatureBetaTesting => _l10n?.featureBetaTesting ?? 'Beta Testing';
String get kFeatureApkDownloads => _l10n?.featureApkDownloads ?? 'APK Downloads';
String get kFeatureReleaseNotes => _l10n?.featureReleaseNotes ?? 'Release Notes';
String get kFeatureVerifiedBuilds => _l10n?.featureVerifiedBuilds ?? 'Verified Builds';
String get kFeatureSha256 => _l10n?.featureSha256 ?? 'SHA-256 Verified';
String get kInfoTitleTesterAccess => _l10n?.infoTitleTesterAccess ?? 'Tester Access Only';
String get kInfoSubtitleTesterAccess =>
    _l10n?.infoSubtitleTesterAccess ?? 'Only invited testers can access app releases.';
String get kInfoTitleSecureStorage => _l10n?.infoTitleSecureStorage ?? 'Secure Cloud Storage';
String get kInfoSubtitleSecureStorage =>
    _l10n?.infoSubtitleSecureStorage ?? 'APKs stored on Google Drive, delivered securely.';
String get kInfoTitleAlwaysUpToDate => _l10n?.infoTitleAlwaysUpToDate ?? 'Always Up-to-Date';
String get kInfoSubtitleAlwaysUpToDate => _l10n?.infoSubtitleAlwaysUpToDate ?? 'Instant access to the latest builds.';
String get kLoginSigningIn => _l10n?.loginSigningIn ?? 'Signing in…';
String get kLoginContinueWithGoogle => _l10n?.loginContinueWithGoogle ?? 'Continue with Google';
String get kLoginConfirmation => _l10n?.loginConfirmation ?? 'By signing in, you confirm you are an authorized tester.';

/// Splash Screen
String get kSplashSubtitle => _l10n?.splashSubtitle ?? 'Release Manager for Testers';

/// Maintenance Screen
String get kMaintenanceTitle => _l10n?.maintenanceTitle ?? 'System Maintenance';
String get kMaintenanceDescription =>
    _l10n?.maintenanceDescription ??
    'We are currently performing scheduled system updates to improve performance and security. We\'ll be back online shortly.';
String get kMaintenanceCheckAgain => _l10n?.maintenanceCheckAgain ?? 'Check Again';
String get kMaintenanceStillActive =>
    _l10n?.maintenanceStillActive ?? 'System is still undergoing maintenance. Please try again later.';
String get kMaintenanceCheckFailed =>
    _l10n?.maintenanceCheckFailed ?? 'Failed to check system status. Please try again.';
String get kMaintenanceChecking => _l10n?.maintenanceChecking ?? 'Checking...';

/// App List Screen
String get kAppListErrorFailedToLoad => _l10n?.appListErrorFailedToLoad ?? 'Failed to load data';
String get kAppListErrorConnection => _l10n?.appListErrorConnection ?? 'Connection error: ';
String get kInviteAcceptedMsg => _l10n?.inviteAcceptedMsg ?? 'Invitation accepted!';
String get kInviteAcceptFailedMsg => _l10n?.inviteAcceptFailedMsg ?? 'Failed to accept invitation';
String get kInviteRejectedMsg => _l10n?.inviteRejectedMsg ?? 'Invitation rejected';
String get kInviteRejectFailedMsg => _l10n?.inviteRejectFailedMsg ?? 'Failed to reject invitation';
String get kErrorPrefix => _l10n?.errorPrefix ?? 'Error: ';
String get kPendingInvitationsPrefix => _l10n?.pendingInvitationsPrefix ?? 'PENDING INVITATIONS (';
String get kMyApplications => _l10n?.myApplications ?? 'MY APPLICATIONS';
String get kNoApplicationsMsg => _l10n?.noApplicationsMsg ?? 'No accepted applications yet.';
String get kChangeLanguageTooltip => _l10n?.changeLanguageTooltip ?? 'Change Language';
String get kAgreeToTermsPrefix => _l10n?.agreeToTermsPrefix ?? 'By signing in, you agree to our ';
String get kAgreeToTermsAnd => _l10n?.agreeToTermsAnd ?? ' and ';
String get kAgreeToTermsSuffix => _l10n?.agreeToTermsSuffix ?? '.';
String get kSigningIn => _l10n?.signingIn ?? 'Signing in…';
String get kContinueWithGoogle => _l10n?.continueWithGoogle ?? 'Continue with Google';
String get kAboutWebDashboardTitle => _l10n?.aboutWebDashboardTitle ?? 'Web Dashboard';
String get kAboutWebDashboardSubtitle =>
    _l10n?.aboutWebDashboardSubtitle ?? 'Google Drive Storage, Team Management, Release History';
String get kAboutFlutterClientTitle => _l10n?.aboutFlutterClientTitle ?? 'Flutter Client';
String get kAboutFlutterClientSubtitle =>
    _l10n?.aboutFlutterClientSubtitle ?? 'Glassmorphic UI, One-Tap Install, Version Detection';
String get kAboutCliToolTitle => _l10n?.aboutCliToolTitle ?? 'CLI Tool';
String get kAboutCliToolSubtitle =>
    _l10n?.aboutCliToolSubtitle ?? 'Device Auth Flow, Real-Time Progress, Drive Upload Status';
String get kAboutEmailSupport => _l10n?.aboutEmailSupport ?? 'Email Support';
String get kAboutGithubIssues => _l10n?.aboutGithubIssues ?? 'GitHub Issues';
String get kAboutDiscordCommunity => _l10n?.aboutDiscordCommunity ?? 'Discord Community';
String get kFeedbackCategoryBug => _l10n?.feedbackCategoryBug ?? 'Bug';
String get kFeedbackCategoryFeature => _l10n?.feedbackCategoryFeature ?? 'Feature';
String get kFeedbackCategoryOther => _l10n?.feedbackCategoryOther ?? 'Other';
String get kFeedbackRateUsQuestion => _l10n?.feedbackRateUsQuestion ?? 'How would you rate us?';
String get kFeedbackSubmitButton => _l10n?.feedbackSubmitButton ?? 'Submit Feedback';

/// App List Empty State
String get kAppListEmptyTitle => _l10n?.appListEmptyTitle ?? "You haven't been added\nto any app yet.";
String get kAppListEmptySubtitle => _l10n?.appListEmptySubtitle ?? 'Ask a developer to invite you as a Tester.';

/// App Bar
String get kSignOutTooltip => _l10n?.signOutTooltip ?? 'Sign out';

/// App Card
String get kLabelLatestVersion => _l10n?.labelLatestVersion ?? 'Latest Version';
String get kNone => _l10n?.none ?? 'None';

/// Release List Screen
String get kTabReleases => _l10n?.tabReleases ?? 'Releases';
String get kTabMembers => _l10n?.tabMembers ?? 'Members';
String get kNoReleasesMsg => _l10n?.noReleasesMsg ?? 'No releases yet';
String get kTeamMembersTitle => _l10n?.teamMembersTitle ?? 'Team Members';
String get kTeamMembersSubtitle => _l10n?.teamMembersSubtitle ?? 'Collaborators invited to this application.';
String get kNoMembersMsg => _l10n?.noMembersMsg ?? 'No members yet';

/// Release Card
String get kBuildPrefix => _l10n?.buildPrefix ?? 'Build #';

/// Release Detail Screen
String get kReleaseDetailsTitle => _l10n?.releaseDetailsTitle ?? 'Release Details';
String get kSectionDetails => _l10n?.sectionDetails ?? 'DETAILS';
String get kSectionUploadedBy => _l10n?.sectionUploadedBy ?? 'UPLOADED BY';
String get kSectionReleaseNotes => _l10n?.sectionReleaseNotes ?? 'RELEASE NOTES';
String get kSectionPermissionsPrefix => _l10n?.sectionPermissionsPrefix ?? 'PERMISSIONS (';
String get kUnknownDate => _l10n?.unknownDate ?? 'Unknown date';

/// Detail Grid
String get kLabelBuildNumber => _l10n?.labelBuildNumber ?? 'Build Number';
String get kLabelMinSdk => _l10n?.labelMinSdk ?? 'Min SDK';
String get kApiPrefix => _l10n?.apiPrefix ?? 'API ';
String get kLabelTargetSdk => _l10n?.labelTargetSdk ?? 'Target SDK';
String get kLabelSize => _l10n?.labelSize ?? 'Size';

/// Release Action Button
String get kDownloadFailedMsg => _l10n?.downloadFailedMsg ?? 'Download failed (';
String get kDownloadedMsg => _l10n?.downloadedMsg ?? 'Downloaded: ';
String get kLaunchFailedMsg => _l10n?.launchFailedMsg ?? 'Failed to launch application';
String get kLaunchErrorMsg => _l10n?.launchErrorMsg ?? 'Error launching app: ';
String get kDownloadingMsg => _l10n?.downloadingMsg ?? 'Downloading… ';
String get kInstallingMsg => _l10n?.installingMsg ?? 'Installing…';
String get kInstallUpdateBtnLabel => _l10n?.installUpdateBtnLabel ?? 'Install Update';
String get kUpdateBtnLabel => _l10n?.updateBtnLabel ?? 'Update';
String get kOpenAppBtnLabel => _l10n?.openAppBtnLabel ?? 'Open App';
String get kInstallApkBtnLabel => _l10n?.installApkBtnLabel ?? 'Install APK';
String get kDownloadApkBtnLabel => _l10n?.downloadApkBtnLabel ?? 'Download APK';
String get kRetryBtnLabel => _l10n?.retryBtnLabel ?? 'Retry';
String get kDeclineBtnLabel => _l10n?.declineBtnLabel ?? 'Decline';
String get kAcceptBtnLabel => _l10n?.acceptBtnLabel ?? 'Accept';

/// Installation Errors
String get kErrorInstallCancelled =>
    _l10n?.errorInstallCancelled ?? 'Installation cancelled: Please grant permission to install the app.';
String get kErrorInstallConflictingVersion =>
    _l10n?.errorInstallConflictingVersion ??
    'Installation failed: A conflicting version of the app is already installed.';
String get kErrorInstallInvalidApk =>
    _l10n?.errorInstallInvalidApk ?? 'Installation failed: The APK file is invalid or corrupted.';
String get kErrorInstallInsufficientStorage =>
    _l10n?.errorInstallInsufficientStorage ?? 'Installation failed: Insufficient storage space on the device.';
String get kErrorInstallStartFailed => _l10n?.errorInstallStartFailed ?? 'Failed to start installation';
String get kErrorInstallPrefix => _l10n?.errorInstallPrefix ?? 'Installation error: ';

/// Feedback Screen
String get kFeedbackSubmitTitle => _l10n?.feedbackSubmitTitle ?? 'Submit Feedback';
String get kFeedbackCategoryLabel => _l10n?.feedbackCategoryLabel ?? 'CATEGORY';
String get kFeedbackRatingLabel => _l10n?.feedbackRatingLabel ?? 'RATING';
String get kFeedbackTitleLabel => _l10n?.feedbackTitleLabel ?? 'TITLE';
String get kFeedbackDescriptionLabel => _l10n?.feedbackDescriptionLabel ?? 'DESCRIPTION';
String get kFeedbackTitleHint => _l10n?.feedbackTitleHint ?? 'Brief summary of your feedback';
String get kFeedbackTitleRequired => _l10n?.feedbackTitleRequired ?? 'Title is required';
String get kFeedbackDescriptionHint =>
    _l10n?.feedbackDescriptionHint ?? 'Provide details about your experience, bug, or feature request...';
String get kFeedbackDescriptionRequired => _l10n?.feedbackDescriptionRequired ?? 'Description is required';
String get kFeedbackSuccessMsg => _l10n?.feedbackSuccessMsg ?? 'Thank you for your feedback!';
String get kFeedbackErrorMsg => _l10n?.feedbackErrorMsg ?? 'Failed to submit feedback';

/// Contact Support Screen
String get kSupportTitle => _l10n?.supportTitle ?? 'Contact Support';
String get kSupportSubjectLabel => _l10n?.supportSubjectLabel ?? 'SUBJECT';
String get kSupportMessageLabel => _l10n?.supportMessageLabel ?? 'MESSAGE';
String get kSupportSubjectHint => _l10n?.supportSubjectHint ?? 'What is this regarding?';
String get kSupportSubjectRequired => _l10n?.supportSubjectRequired ?? 'Subject is required';
String get kSupportMessageHint => _l10n?.supportMessageHint ?? 'Describe your issue or question in detail...';
String get kSupportMessageRequired => _l10n?.supportMessageRequired ?? 'Message is required';
String get kSupportSuccessMsg => _l10n?.supportSuccessMsg ?? 'Support request sent successfully!';
String get kSupportErrorMsg => _l10n?.supportErrorMsg ?? 'Failed to send support request';
String get kSupportSubmitButton => _l10n?.supportSubmitButton ?? 'Submit Support Request';
String get kMemberStatusPending => _l10n?.memberStatusPending ?? 'Pending';
String get kRoleOwner => _l10n?.roleOwner ?? 'Owner';
String get kRoleDeveloper => _l10n?.roleDeveloper ?? 'Developer';
String get kRoleTester => _l10n?.roleTester ?? 'Tester';

/// About Screen
String get kAboutTitle => _l10n?.aboutTitle ?? 'About TestAPK';
String get kAboutVersion => _l10n?.aboutVersion ?? 'Version 1.0.0+3';
String get kAboutDescription =>
    _l10n?.aboutDescription ?? 'A modern, secure, and self-hosted APK release management platform.';
String get kAboutPlatformInfoLabel => _l10n?.aboutPlatformInfoLabel ?? 'PLATFORM INFO';
String get kAboutSupportChannelsLabel => _l10n?.aboutSupportChannelsLabel ?? 'SUPPORT CHANNELS';
String get kAboutLaunchError => _l10n?.aboutLaunchError ?? 'Could not launch ';

/// Version Control / Updates
String get kUpdateRequiredTitle => _l10n?.updateRequiredTitle ?? 'Update Required';
String get kUpdateRequiredDescription =>
    _l10n?.updateRequiredDescription ??
    'This version of the app is no longer supported. Please update to the latest version to continue.';
String get kUpdateNowBtnLabel => _l10n?.updateNowBtnLabel ?? 'Update Now';
String get kDownloadLinkNotConfigured => _l10n?.downloadLinkNotConfigured ?? 'Download link is not configured.';
String kDownloadLinkLaunchError(String link) =>
    _l10n?.downloadLinkLaunchError(link) ?? 'Could not launch download link: $link';
String get kUpdateAvailableTitle => _l10n?.updateAvailableTitle ?? 'Update Available';
String get kUpdateAvailableDescription =>
    _l10n?.updateAvailableDescription ?? 'A new version of the app is available. Would you like to update now?';
String get kLaterBtnLabel => _l10n?.laterBtnLabel ?? 'Later';

/// Legal & Profile Labels
String get kLabelSendFeedback => _l10n?.labelSendFeedback ?? 'Send Feedback';
String get kLabelTermsOfService => _l10n?.labelTermsOfService ?? 'Terms of Service';
String get kLabelPrivacyPolicy => _l10n?.labelPrivacyPolicy ?? 'Privacy Policy';
String get kLabelAboutTestApk => _l10n?.labelAboutTestApk ?? 'About TestAPK';
String kLegalLastUpdated(String date) => _l10n?.legalLastUpdated(date) ?? 'Last Updated: $date';
String get kDeleteAccountLabel => _l10n?.deleteAccountLabel ?? 'Delete Account';

/// Profile Screen
String get kProfileTitle => _l10n?.profileTitle ?? 'Profile';
String get kProfileFullName => _l10n?.profileFullName ?? 'Full Name';
String get kProfileEmail => _l10n?.profileEmail ?? 'Email';
String get kProfileRole => _l10n?.profileRole ?? 'Role';
String get kSignOutLabel => _l10n?.signOutLabel ?? 'Sign Out';
String get kSignOutConfirmTitle => _l10n?.signOutConfirmTitle ?? 'Sign Out';
String get kSignOutConfirmMessage =>
    _l10n?.signOutConfirmMessage ?? 'Are you sure you want to sign out of your account?';
String get kDeleteLabel => _l10n?.deleteLabel ?? 'Delete';
String get kCancel => _l10n?.cancel ?? 'Cancel';

/// Delete Account Dialog
String get kDeleteAccountConfirmTitle => _l10n?.deleteAccountConfirmTitle ?? 'Delete Account?';
String get kDeleteAccountConfirmMessage =>
    _l10n?.deleteAccountConfirmMessage ??
    'Are you sure you want to delete your account? This action is permanent and cannot be undone.';
String get kDeleteAccountSuccessMsg => _l10n?.deleteAccountSuccessMsg ?? 'Account deleted successfully';
String get kDeleteAccountErrorMsg => _l10n?.deleteAccountErrorMsg ?? 'Failed to delete account';

/// API Error Messages
String get kErrorUnexpected => _l10n?.errorUnexpected ?? 'An unexpected error occurred. Please try again.';
String get kErrorTimeout => _l10n?.errorTimeout ?? 'Connection timed out. Please check your internet connection.';
String get kErrorSessionExpired => _l10n?.errorSessionExpired ?? 'Session expired. Please sign in again.';
String get kErrorServerError => _l10n?.errorServerError ?? 'Server error. Please try again later.';
String get kErrorNoInternet => _l10n?.errorNoInternet ?? 'No internet connection. Please check your network settings.';
String get kErrorRequestCancelled => _l10n?.errorRequestCancelled ?? 'Request was cancelled.';
String get kErrorRequestFailedPrefix => _l10n?.errorRequestFailedPrefix ?? 'Request failed: ';
String get kErrorBadRequest => _l10n?.errorBadRequest ?? 'Bad request. Please check your input.';
String get kErrorForbidden =>
    _l10n?.errorForbidden ?? 'Access denied. You do not have permission to perform this action.';

/// Legal Texts (Privacy Policy & Terms of Service)
String get kPrivacyPolicyLastUpdated => _l10n?.privacyPolicyLastUpdated ?? 'July 18, 2026';
String get kPrivacyPolicyTitle1 => _l10n?.privacyPolicyTitle1 ?? '1. Introduction';
String get kPrivacyPolicyPara1_1 =>
    _l10n?.privacyPolicyPara1_1 ??
    'Welcome to TestAPK. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web dashboard, mobile application, and command line interface (CLI).';
String get kPrivacyPolicyTitle2 => _l10n?.privacyPolicyTitle2 ?? '2. Information We Collect';
String get kPrivacyPolicyPara2_1 =>
    _l10n?.privacyPolicyPara2_1 ?? 'We collect information that you provide directly to us when using our services:';
String get kPrivacyPolicyPara2_2 =>
    _l10n?.privacyPolicyPara2_2 ??
    '• Account Information: When you sign in using Google OAuth, we receive your name, email address, and profile picture.';
String get kPrivacyPolicyPara2_3 =>
    _l10n?.privacyPolicyPara2_3 ??
    '• Google Drive Integration: To enable APK storage and management, our application requests permission to access your Google Drive. We only access, create, and modify files that are created by or uploaded through the TestAPK application (using the drive.file scope). We do not access or read any other files in your Google Drive.';
String get kPrivacyPolicyPara2_4 =>
    _l10n?.privacyPolicyPara2_4 ??
    '• Application Metadata: We collect metadata about the APK files you upload (such as package name, version code, version name, and release notes) to display them in your dashboard and mobile app.';
String get kPrivacyPolicyTitle3 => _l10n?.privacyPolicyTitle3 ?? '3. How We Use Your Information';
String get kPrivacyPolicyPara3_1 =>
    _l10n?.privacyPolicyPara3_1 ?? 'We use the collected information for the following purposes:';
String get kPrivacyPolicyPara3_2 =>
    _l10n?.privacyPolicyPara3_2 ?? '• To authenticate your identity and manage your account.';
String get kPrivacyPolicyPara3_3 =>
    _l10n?.privacyPolicyPara3_3 ??
    '• To facilitate the upload, storage, and retrieval of APK files directly to/from your own Google Drive storage.';
String get kPrivacyPolicyPara3_4 =>
    _l10n?.privacyPolicyPara3_4 ??
    '• To display application release history and details on your dashboard and mobile client.';
String get kPrivacyPolicyPara3_5 =>
    _l10n?.privacyPolicyPara3_5 ?? '• To support the CLI tool\'s authentication and upload flows.';
String get kPrivacyPolicyTitle4 => _l10n?.privacyPolicyTitle4 ?? '4. Data Sharing and Disclosure';
String get kPrivacyPolicyPara4_1 =>
    _l10n?.privacyPolicyPara4_1 ??
    'We do not sell, trade, or share your personal data or Google Drive files with third parties. All APK files are stored directly in your own Google Drive account. The TestAPK server only stores metadata (such as file IDs, version numbers, and release notes) to coordinate downloads and installations.';
String get kPrivacyPolicyTitle5 => _l10n?.privacyPolicyTitle5 ?? '5. Data Security';
String get kPrivacyPolicyPara5_1 =>
    _l10n?.privacyPolicyPara5_1 ??
    'We implement industry-standard security measures to protect your account metadata and authentication tokens. Your Google OAuth tokens are transmitted securely and stored using encryption.';
String get kPrivacyPolicyTitle6 => _l10n?.privacyPolicyTitle6 ?? '6. Your Rights and Choices';
String get kPrivacyPolicyPara6_1 => _l10n?.privacyPolicyPara6_1 ?? 'You have full control over your data:';
String get kPrivacyPolicyPara6_2 =>
    _l10n?.privacyPolicyPara6_2 ??
    '• You can disconnect your Google Drive integration at any time through the dashboard settings.';
String get kPrivacyPolicyPara6_3 =>
    _l10n?.privacyPolicyPara6_3 ??
    '• You can revoke TestAPK\'s access to your Google Account entirely by visiting the Google Account Permissions page.';
String get kPrivacyPolicyPara6_4 =>
    _l10n?.privacyPolicyPara6_4 ??
    '• You can request the deletion of your TestAPK account and associated metadata by contacting us.';
String get kPrivacyPolicyTitle7 => _l10n?.privacyPolicyTitle7 ?? '7. Contact Us';
String get kPrivacyPolicyPara7_1 =>
    _l10n?.privacyPolicyPara7_1 ??
    'If you have any questions or concerns about this Privacy Policy, please contact us at subrata3250das@gmail.com.';

String get kTermsOfServiceLastUpdated => _l10n?.termsOfServiceLastUpdated ?? 'July 18, 2026';
String get kTermsOfServiceTitle1 => _l10n?.termsOfServiceTitle1 ?? '1. Agreement to Terms';
String get kTermsOfServicePara1_1 =>
    _l10n?.termsOfServicePara1_1 ??
    'By accessing or using TestAPK, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.';
String get kTermsOfServiceTitle2 => _l10n?.termsOfServiceTitle2 ?? '2. Description of Service';
String get kTermsOfServicePara2_1 =>
    _l10n?.termsOfServicePara2_1 ??
    'TestAPK provides a platform for developers to host, distribute, and manage Android application packages (APKs). The service includes a web dashboard, a mobile client for testing/installation, and a command line interface (CLI) for automated uploads.';
String get kTermsOfServiceTitle3 => _l10n?.termsOfServiceTitle3 ?? '3. User Accounts and Security';
String get kTermsOfServicePara3_1 =>
    _l10n?.termsOfServicePara3_1 ??
    'To use certain features of the service, you must sign in using Google OAuth. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.';
String get kTermsOfServiceTitle4 => _l10n?.termsOfServiceTitle4 ?? '4. Google Drive Integration';
String get kTermsOfServicePara4_1 =>
    _l10n?.termsOfServicePara4_1 ??
    'Our service integrates with Google Drive to store your uploaded APK files. By linking your Google Drive account, you grant TestAPK permission to create, read, and delete files within the specific folder created by the application. You retain full ownership and control of all files stored in your Google Drive.';
String get kTermsOfServiceTitle5 => _l10n?.termsOfServiceTitle5 ?? '5. Acceptable Use';
String get kTermsOfServicePara5_1 => _l10n?.termsOfServicePara5_1 ?? 'You agree not to use the service to:';
String get kTermsOfServicePara5_2 =>
    _l10n?.termsOfServicePara5_2 ??
    '• Upload or distribute malicious software, viruses, or any code designed to damage or disrupt devices.';
String get kTermsOfServicePara5_3 =>
    _l10n?.termsOfServicePara5_3 ?? '• Infringe upon the intellectual property rights of others.';
String get kTermsOfServicePara5_4 =>
    _l10n?.termsOfServicePara5_4 ?? '• Violate any applicable local, state, national, or international laws.';
String get kTermsOfServicePara5_5 =>
    _l10n?.termsOfServicePara5_5 ?? '• Attempt to gain unauthorized access to the service or its related systems.';
String get kTermsOfServiceTitle6 => _l10n?.termsOfServiceTitle6 ?? '6. Limitation of Liability';
String get kTermsOfServicePara6_1 =>
    _l10n?.termsOfServicePara6_1 ??
    'To the maximum extent permitted by law, TestAPK and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the service.';
String get kTermsOfServiceTitle7 => _l10n?.termsOfServiceTitle7 ?? '7. Changes to Terms';
String get kTermsOfServicePara7_1 =>
    _l10n?.termsOfServicePara7_1 ??
    'We reserve the right to modify or replace these Terms of Service at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the service after any changes constitutes acceptance of the new terms.';
String get kTermsOfServiceTitle8 => _l10n?.termsOfServiceTitle8 ?? '8. Contact Us';
String get kTermsOfServicePara8_1 =>
    _l10n?.termsOfServicePara8_1 ??
    'If you have any questions about these Terms of Service, please contact us at subrata3250das@gmail.com.';
