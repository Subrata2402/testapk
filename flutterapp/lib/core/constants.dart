/// API base URL – change this to your server's address.
// / For Android emulator: http://10.0.2.2:3000/api/v1
// const String kApiBaseUrl = 'https://testapkapi.clipboux.online/api/v1';
const String kApiBaseUrl = 'http://10.0.2.2:3000/api/v1';

/// Google OAuth Client ID (Web Client ID from Google Console)
const String kGoogleClientId = '229511253859-m9otrv5gp2g1l63un2mq3hosbniv598u.apps.googleusercontent.com';

/// User-facing strings for LoginScreen
const String kLoginErrorMsg = 'Sign-in failed. Please ensure you are a registered tester.';
const String kAppName = 'TestAPK';
const String kLoginSubtitle = 'Your gateway to beta releases';
const String kFeatureBetaTesting = 'Beta Testing';
const String kFeatureApkDownloads = 'APK Downloads';
const String kFeatureReleaseNotes = 'Release Notes';
const String kFeatureVerifiedBuilds = 'Verified Builds';
const String kFeatureSha256 = 'SHA-256 Verified';
const String kInfoTitleTesterAccess = 'Tester Access Only';
const String kInfoSubtitleTesterAccess = 'Only invited testers can access app releases.';
const String kInfoTitleSecureStorage = 'Secure Cloud Storage';
const String kInfoSubtitleSecureStorage = 'APKs stored on Google Drive, delivered securely.';
const String kInfoTitleAlwaysUpToDate = 'Always Up-to-Date';
const String kInfoSubtitleAlwaysUpToDate = 'Instant access to the latest builds.';
const String kLoginSigningIn = 'Signing in…';
const String kLoginContinueWithGoogle = 'Continue with Google';
const String kLoginConfirmation = 'By signing in, you confirm you are an authorized tester.';

/// Splash Screen
const String kSplashSubtitle = 'Release Manager for Testers';

/// App List Screen
const String kAppListErrorFailedToLoad = 'Failed to load data';
const String kAppListErrorConnection = 'Connection error: ';
const String kInviteAcceptedMsg = 'Invitation accepted!';
const String kInviteAcceptFailedMsg = 'Failed to accept invitation';
const String kInviteRejectedMsg = 'Invitation rejected';
const String kInviteRejectFailedMsg = 'Failed to reject invitation';
const String kErrorPrefix = 'Error: ';

/// App List Empty State
const String kAppListEmptyTitle = "You haven't been added\nto any app yet.";
const String kAppListEmptySubtitle = 'Ask a developer to invite you as a Tester.';

/// App Bar
const String kSignOutTooltip = 'Sign out';

/// App Card
const String kLabelLatestVersion = 'Latest Version';
const String kNone = 'None';

/// Release List Screen
const String kTabReleases = 'Releases';
const String kTabMembers = 'Members';
const String kNoReleasesMsg = 'No releases yet';
const String kTeamMembersTitle = 'Team Members';
const String kTeamMembersSubtitle = 'Collaborators invited to this application.';
const String kNoMembersMsg = 'No members yet';

/// Release Card
const String kBuildPrefix = 'Build #';

/// Release Detail Screen
const String kReleaseDetailsTitle = 'Release Details';
const String kSectionDetails = 'DETAILS';
const String kSectionUploadedBy = 'UPLOADED BY';
const String kSectionReleaseNotes = 'RELEASE NOTES';
const String kSectionPermissionsPrefix = 'PERMISSIONS (';
const String kUnknownDate = 'Unknown date';

/// Detail Grid
const String kLabelBuildNumber = 'Build Number';
const String kLabelMinSdk = 'Min SDK';
const String kApiPrefix = 'API ';
const String kLabelTargetSdk = 'Target SDK';
const String kLabelSize = 'Size';

/// Release Action Button
const String kDownloadFailedMsg = 'Download failed (';
const String kDownloadedMsg = 'Downloaded: ';
const String kLaunchFailedMsg = 'Failed to launch application';
const String kLaunchErrorMsg = 'Error launching app: ';
const String kDownloadingMsg = 'Downloading… ';
const String kInstallUpdateBtnLabel = 'Install Update';
const String kUpdateBtnLabel = 'Update';
const String kOpenAppBtnLabel = 'Open App';
const String kInstallApkBtnLabel = 'Install APK';
const String kDownloadApkBtnLabel = 'Download APK';
const String kRetryBtnLabel = 'Retry';
const String kDeclineBtnLabel = 'Decline';
const String kAcceptBtnLabel = 'Accept';

/// Installation Errors
const String kErrorInstallCancelled = 'Installation cancelled: Please grant permission to install the app.';
const String kErrorInstallConflictingVersion =
    'Installation failed: A conflicting version of the app is already installed.';
const String kErrorInstallInvalidApk = 'Installation failed: The APK file is invalid or corrupted.';
const String kErrorInstallInsufficientStorage = 'Installation failed: Insufficient storage space on the device.';
const String kErrorInstallStartFailed = 'Failed to start installation';
const String kErrorInstallPrefix = 'Installation error: ';

/// Feedback Screen
const String kFeedbackSubmitTitle = 'Submit Feedback';
const String kFeedbackCategoryLabel = 'CATEGORY';
const String kFeedbackRatingLabel = 'RATING';
const String kFeedbackTitleLabel = 'TITLE';
const String kFeedbackDescriptionLabel = 'DESCRIPTION';
const String kFeedbackTitleHint = 'Brief summary of your feedback';
const String kFeedbackTitleRequired = 'Title is required';
const String kFeedbackDescriptionHint = 'Provide details about your experience, bug, or feature request...';
const String kFeedbackDescriptionRequired = 'Description is required';
const String kFeedbackSuccessMsg = 'Thank you for your feedback!';
const String kFeedbackErrorMsg = 'Failed to submit feedback';

/// About Screen
const String kAboutTitle = 'About TestAPK';
const String kAboutVersion = 'Version 1.0.0+3';
const String kAboutDescription = 'A modern, secure, and self-hosted APK release management platform.';
const String kAboutPlatformInfoLabel = 'PLATFORM INFO';
const String kAboutSupportChannelsLabel = 'SUPPORT CHANNELS';
const String kAboutLaunchError = 'Could not launch ';

/// Legal & Profile Labels
const String kLabelSendFeedback = 'Send Feedback';
const String kLabelTermsOfService = 'Terms of Service';
const String kLabelPrivacyPolicy = 'Privacy Policy';
const String kLabelAboutTestApk = 'About TestAPK';
