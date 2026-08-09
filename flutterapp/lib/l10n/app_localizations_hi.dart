// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Hindi (`hi`).
class AppLocalizationsHi extends AppLocalizations {
  AppLocalizationsHi([String locale = 'hi']) : super(locale);

  @override
  String get loginErrorMsg =>
      'साइन-इन विफल रहा। कृपया सुनिश्चित करें कि आप एक पंजीकृत परीक्षक हैं।';

  @override
  String get appName => 'TestAPK';

  @override
  String get loginSubtitle => 'बीटा रिलीज़ के लिए आपका प्रवेश द्वार';

  @override
  String get featureBetaTesting => 'बीटा परीक्षण';

  @override
  String get featureApkDownloads => 'APK डाउनलोड';

  @override
  String get featureReleaseNotes => 'रिलीज़ नोट्स';

  @override
  String get featureVerifiedBuilds => 'सत्यापित बिल्ड';

  @override
  String get featureSha256 => 'SHA-256 सत्यापित';

  @override
  String get infoTitleTesterAccess => 'केवल परीक्षक पहुंच';

  @override
  String get infoSubtitleTesterAccess =>
      'केवल आमंत्रित परीक्षक ही ऐप रिलीज़ तक पहुँच सकते हैं।';

  @override
  String get infoTitleSecureStorage => 'सुरक्षित क्लाउड स्टोरेज';

  @override
  String get infoSubtitleSecureStorage =>
      'APK Google ड्राइव पर संग्रहीत हैं, सुरक्षित रूप से वितरित किए गए हैं।';

  @override
  String get infoTitleAlwaysUpToDate => 'हमेशा अद्यतित';

  @override
  String get infoSubtitleAlwaysUpToDate => 'नवीनतम बिल्ड तक त्वरित पहुंच।';

  @override
  String get loginSigningIn => 'साइन इन किया जा रहा है…';

  @override
  String get loginContinueWithGoogle => 'Google के साथ जारी रखें';

  @override
  String get loginConfirmation =>
      'साइन इन करके, आप पुष्टि करते हैं कि आप एक अधिकृत परीक्षक हैं।';

  @override
  String get splashSubtitle => 'परीक्षकों के लिए रिलीज़ प्रबंधक';

  @override
  String get appListErrorFailedToLoad => 'डेटा लोड करने में विफल';

  @override
  String get appListErrorConnection => 'कनेक्शन त्रुटि: ';

  @override
  String get inviteAcceptedMsg => 'आमंत्रण स्वीकार कर लिया गया!';

  @override
  String get inviteAcceptFailedMsg => 'आमंत्रण स्वीकार करने में विफल';

  @override
  String get inviteRejectedMsg => 'आमंत्रण अस्वीकार कर दिया गया';

  @override
  String get inviteRejectFailedMsg => 'आमंत्रण अस्वीकार करने में विफल';

  @override
  String get errorPrefix => 'त्रुटि: ';

  @override
  String get appListEmptyTitle =>
      'आपको अभी तक किसी भी\nऐप में नहीं जोड़ा गया है।';

  @override
  String get appListEmptySubtitle =>
      'किसी डेवलपर से आपको परीक्षक के रूप में आमंत्रित करने के लिए कहें।';

  @override
  String get signOutTooltip => 'साइन आउट';

  @override
  String get labelLatestVersion => 'नवीनतम संस्करण';

  @override
  String get none => 'कोई नहीं';

  @override
  String get tabReleases => 'रिलीज़';

  @override
  String get tabMembers => 'सदस्य';

  @override
  String get noReleasesMsg => 'अभी तक कोई रिलीज़ नहीं';

  @override
  String get teamMembersTitle => 'टीम के सदस्य';

  @override
  String get teamMembersSubtitle => 'इस एप्लिकेशन में आमंत्रित सहयोगी।';

  @override
  String get noMembersMsg => 'अभी तक कोई सदस्य नहीं';

  @override
  String get buildPrefix => 'बिल्ड #';

  @override
  String get releaseDetailsTitle => 'रिलीज़ विवरण';

  @override
  String get sectionDetails => 'विवरण';

  @override
  String get sectionUploadedBy => 'द्वारा अपलोड किया गया';

  @override
  String get sectionReleaseNotes => 'रिलीज़ नोट्स';

  @override
  String get sectionPermissionsPrefix => 'अनुमतियाँ (';

  @override
  String get unknownDate => 'अज्ञान तिथि';

  @override
  String get labelBuildNumber => 'बिल्ड संख्या';

  @override
  String get labelMinSdk => 'न्यूनतम SDK';

  @override
  String get apiPrefix => 'API ';

  @override
  String get labelTargetSdk => 'लक्षित SDK';

  @override
  String get labelSize => 'आकार';

  @override
  String get downloadFailedMsg => 'डाउनलोड विफल (';

  @override
  String get downloadedMsg => 'डाउनलोड किया गया: ';

  @override
  String get launchFailedMsg => 'एप्लिकेशन लॉन्च करने में विफल';

  @override
  String get launchErrorMsg => 'ऐप लॉन्च करने में त्रुटि: ';

  @override
  String get downloadingMsg => 'डाउनलोड हो रहा है… ';

  @override
  String get installUpdateBtnLabel => 'अपडेट इंस्टॉल करें';

  @override
  String get updateBtnLabel => 'अपडेट करें';

  @override
  String get openAppBtnLabel => 'ऐप खोलें';

  @override
  String get installApkBtnLabel => 'APK इंस्टॉल करें';

  @override
  String get downloadApkBtnLabel => 'APK डाउनलोड करें';

  @override
  String get retryBtnLabel => 'पुनः प्रयास करें';

  @override
  String get declineBtnLabel => 'अस्वीकार करें';

  @override
  String get acceptBtnLabel => 'स्वीकार करें';

  @override
  String get errorInstallCancelled =>
      'इंस्टॉलेशन रद्द: कृपया ऐप इंस्टॉल करने की अनुमति दें।';

  @override
  String get errorInstallConflictingVersion =>
      'इंस्टॉलेशन विफल: ऐप का एक परस्पर विरोधी संस्करण पहले से इंस्टॉल है।';

  @override
  String get errorInstallInvalidApk =>
      'इंस्टॉलेशन विफल: APK फ़ाइल अमान्य या दूषित है।';

  @override
  String get errorInstallInsufficientStorage =>
      'इंस्टॉलेशन विफल: डिवाइस पर अपर्याप्त स्टोरेज स्पेस।';

  @override
  String get errorInstallStartFailed => 'इंस्टॉलेशन शुरू करने में विफल';

  @override
  String get errorInstallPrefix => 'इंस्टॉलेशन त्रुटि: ';

  @override
  String get feedbackSubmitTitle => 'प्रतिक्रिया सबमिट करें';

  @override
  String get feedbackCategoryLabel => 'श्रेणी';

  @override
  String get feedbackRatingLabel => 'रेटिंग';

  @override
  String get feedbackTitleLabel => 'शीर्षक';

  @override
  String get feedbackDescriptionLabel => 'विवरण';

  @override
  String get feedbackTitleHint => 'आपकी प्रतिक्रिया का संक्षिप्त सारांश';

  @override
  String get feedbackTitleRequired => 'शीर्षक आवश्यक है';

  @override
  String get feedbackDescriptionHint =>
      'अपने अनुभव, बग या सुविधा अनुरोध के बारे में विवरण प्रदान करें...';

  @override
  String get feedbackDescriptionRequired => 'विवरण आवश्यक है';

  @override
  String get feedbackSuccessMsg => 'आपकी प्रतिक्रिया के लिए धन्यवाद!';

  @override
  String get feedbackErrorMsg => 'प्रतिक्रिया सबमिट करने में विफल';

  @override
  String get supportTitle => 'सहायता से संपर्क करें';

  @override
  String get supportSubjectLabel => 'विषय';

  @override
  String get supportMessageLabel => 'संदेश';

  @override
  String get supportSubjectHint => 'यह किस संबंध में है?';

  @override
  String get supportSubjectRequired => 'विषय आवश्यक है';

  @override
  String get supportMessageHint =>
      'अपनी समस्या या प्रश्न का विस्तार से वर्णन करें...';

  @override
  String get supportMessageRequired => 'संदेश आवश्यक है';

  @override
  String get supportSuccessMsg => 'सहायता अनुरोध सफलतापूर्वक भेजा गया!';

  @override
  String get supportErrorMsg => 'सहायता अनुरोध भेजने में विफल';

  @override
  String get aboutTitle => 'TestAPK के बारे में';

  @override
  String get aboutVersion => 'संस्करण 1.0.0+3';

  @override
  String get aboutDescription =>
      'एक आधुनिक, सुरक्षित और स्व-होस्टेड APK रिलीज़ प्रबंधन प्लेटफ़ॉर्म।';

  @override
  String get aboutPlatformInfoLabel => 'प्लेटफ़ॉर्म जानकारी';

  @override
  String get aboutSupportChannelsLabel => 'सहायता चैनल';

  @override
  String get aboutLaunchError => 'लॉन्च नहीं किया जा सका ';

  @override
  String get labelSendFeedback => 'प्रतिक्रिया भेजें';

  @override
  String get labelTermsOfService => 'सेवा की शर्तें';

  @override
  String get labelPrivacyPolicy => 'गोपनीयता नीति';

  @override
  String get labelAboutTestApk => 'TestAPK के बारे में';

  @override
  String get deleteAccountLabel => 'खाता हटाएं';

  @override
  String get profileTitle => 'प्रोफ़ाइल';

  @override
  String get signOutLabel => 'साइन आउट';

  @override
  String get signOutConfirmTitle => 'साइन आउट';

  @override
  String get signOutConfirmMessage =>
      'क्या आप वाकई अपने खाते से साइन आउट करना चाहते हैं?';

  @override
  String get deleteLabel => 'हटाएं';

  @override
  String get deleteAccountConfirmTitle => 'खाता हटाएं?';

  @override
  String get deleteAccountConfirmMessage =>
      'क्या आप वाकई अपना खाता हटाना चाहते हैं? यह कार्रवाई स्थायी है और इसे पूर्ववत नहीं किया जा सकता।';

  @override
  String get deleteAccountSuccessMsg => 'खाता सफलतापूर्वक हटा दिया गया';

  @override
  String get deleteAccountErrorMsg => 'खाता हटाने में विफल';

  @override
  String get errorUnexpected =>
      'एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें।';

  @override
  String get errorTimeout =>
      'कनेक्शन का समय समाप्त हो गया। कृपया अपना इंटरनेट कनेक्शन जांचें।';

  @override
  String get errorSessionExpired =>
      'सत्र समाप्त हो गया। कृपया पुनः साइन इन करें।';

  @override
  String get errorServerError =>
      'सर्वर त्रुटि। कृपया बाद में पुनः प्रयास करें।';

  @override
  String get errorNoInternet =>
      'कोई इंटरनेट कनेक्शन नहीं। कृपया अपनी नेटवर्क सेटिंग्स जांचें।';

  @override
  String get errorRequestCancelled => 'अनुरोध रद्द कर दिया गया था।';

  @override
  String get errorRequestFailedPrefix => 'अनुरोध विफल रहा: ';

  @override
  String get errorBadRequest => 'अमान्य अनुरोध। कृपया अपना इनपुट जांचें।';

  @override
  String get errorForbidden =>
      'पहुंच अस्वीकृत। आपके पास इस कार्रवाई को करने की अनुमति नहीं है।';

  @override
  String get selectLanguage => 'भाषा चुनें';

  @override
  String get saveLanguage => 'सहेजें';

  @override
  String get english => 'अंग्रेज़ी';

  @override
  String get spanish => 'स्पैनिश';

  @override
  String get portuguese => 'पुर्तगाली';

  @override
  String get hindi => 'हिन्दी';

  @override
  String get french => 'फ़्रेंच';

  @override
  String get german => 'जर्मन';

  @override
  String get japanese => 'जापानी';

  @override
  String get chinese => 'चीनी';

  @override
  String get arabic => 'अरबी';

  @override
  String get cancel => 'रद्द करें';

  @override
  String get pendingInvitationsPrefix => 'लंबित आमंत्रण (';

  @override
  String get myApplications => 'मेरे अनुप्रयोग';

  @override
  String get noApplicationsMsg => 'अभी तक कोई स्वीकृत अनुप्रयोग नहीं है।';

  @override
  String get changeLanguageTooltip => 'भाषा बदलें';

  @override
  String get agreeToTermsPrefix => 'साइन इन करके, आप हमारी ';

  @override
  String get agreeToTermsAnd => ' और ';

  @override
  String get agreeToTermsSuffix => ' से सहमत होते हैं।';

  @override
  String get signingIn => 'साइन इन किया जा रहा है...';

  @override
  String get continueWithGoogle => 'Google के साथ जारी रखें';

  @override
  String get aboutWebDashboardTitle => 'वेब डैशबोर्ड';

  @override
  String get aboutWebDashboardSubtitle =>
      'Google ड्राइव स्टोरेज, टीम प्रबंधन, रिलीज़ इतिहास';

  @override
  String get aboutFlutterClientTitle => 'फ्लटर क्लाइंट';

  @override
  String get aboutFlutterClientSubtitle =>
      'ग्लासमॉर्फिक यूआई, वन-टैप इंस्टॉल, संस्करण पहचान';

  @override
  String get aboutCliToolTitle => 'CLI टूल';

  @override
  String get aboutCliToolSubtitle =>
      'डिवाइस ऑथ फ्लो, रीयल-टाइम प्रगति, ड्राइव अपलोड स्थिति';

  @override
  String get aboutEmailSupport => 'ईमेल सहायता';

  @override
  String get aboutGithubIssues => 'GitHub मुद्दे';

  @override
  String get aboutDiscordCommunity => 'Discord समुदाय';

  @override
  String get feedbackCategoryBug => 'बग';

  @override
  String get feedbackCategoryFeature => 'सुविधा';

  @override
  String get feedbackCategoryOther => 'अन्य';

  @override
  String get feedbackRateUsQuestion => 'आप हमें क्या रेटिंग देंगे?';

  @override
  String get feedbackSubmitButton => 'प्रतिक्रिया सबमिट करें';

  @override
  String get profileFullName => 'पूरा नाम';

  @override
  String get profileEmail => 'ईमेल';

  @override
  String get profileRole => 'भूमिका';

  @override
  String get supportSubmitButton => 'सहायता अनुरोध सबमिट करें';

  @override
  String get memberStatusPending => 'लंबित';

  @override
  String get roleOwner => 'स्वामी';

  @override
  String get roleDeveloper => 'डेवलपर';

  @override
  String get roleTester => 'परीक्षक';

  @override
  String legalLastUpdated(String date) {
    return 'अंतिम अद्यतन: $date';
  }

  @override
  String get privacyPolicyLastUpdated => '18 जुलाई, 2026';

  @override
  String get privacyPolicyTitle1 => '1. परिचय';

  @override
  String get privacyPolicyPara1_1 =>
      'TestAPK में आपका स्वागत है। हम आपकी गोपनीयता का सम्मान करते हैं और आपके व्यक्तिगत डेटा की सुरक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि जब आप हमारे वेब डैशबोर्ड, मोबाइल एप्लिकेशन और कमांड लाइन इंटरफ़ेस (CLI) का उपयोग करते हैं तो हम आपकी जानकारी को कैसे एकत्र, उपयोग, प्रकट और सुरक्षित करते हैं।';

  @override
  String get privacyPolicyTitle2 => '2. जानकारी जो हम एकत्र करते हैं';

  @override
  String get privacyPolicyPara2_1 =>
      'हम वह जानकारी एकत्र करते हैं जो आप हमारे सेवाओं का उपयोग करते समय सीधे हमें प्रदान करते हैं:';

  @override
  String get privacyPolicyPara2_2 =>
      '• खाता जानकारी: जब आप Google OAuth का उपयोग करके साइन इन करते हैं, तो हमें आपका नाम, ईमेल पता और प्रोफ़ाइल चित्र प्राप्त होता है।';

  @override
  String get privacyPolicyPara2_3 =>
      '• Google ड्राइव एकीकरण: APK स्टोरेज और प्रबंधन को सक्षम करने के लिए, हमारा एप्लिकेशन आपके Google ड्राइव तक पहुंचने की अनुमति का अनुरोध करता है। हम केवल उन फ़ाइलों तक पहुँचते हैं, बनाते हैं और संशोधित करते हैं जो TestAPK एप्लिकेशन द्वारा बनाई गई हैं या उसके माध्यम से अपलोड की गई हैं (drive.file स्कोप का उपयोग करके)। हम आपके Google ड्राइव में किसी अन्य फ़ाइल तक नहीं पहुँचते हैं या उन्हें नहीं पढ़ते हैं।';

  @override
  String get privacyPolicyPara2_4 =>
      '• एप्लिकेशन मेटाडेटा: हम आपके द्वारा अपलोड की जाने वाली APK फ़ाइलों के बारे में मेटाडेटा (जैसे पैकेज का नाम, संस्करण कोड, संस्करण का नाम और रिलीज़ नोट्स) एकत्र करते हैं ताकि उन्हें आपके डैशबोर्ड और मोबाइल ऐप में प्रदर्शित किया जा सके।';

  @override
  String get privacyPolicyTitle3 => '3. हम आपकी जानकारी का उपयोग कैसे करते हैं';

  @override
  String get privacyPolicyPara3_1 =>
      'हम एकत्र की गई जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए करते हैं:';

  @override
  String get privacyPolicyPara3_2 =>
      '• आपकी पहचान को प्रमाणित करने और आपके खाते का प्रबंधन करने के लिए।';

  @override
  String get privacyPolicyPara3_3 =>
      '• सीधे आपके अपने Google ड्राइव स्टोरेज में/से APK फ़ाइलों को अपलोड करने, संग्रहीत करने और पुनः प्राप्त करने की सुविधा प्रदान करने के लिए।';

  @override
  String get privacyPolicyPara3_4 =>
      '• आपके डैशबोर्ड और मोबाइल क्लाइंट पर एप्लिकेशन रिलीज़ इतिहास और विवरण प्रदर्शित करने के लिए।';

  @override
  String get privacyPolicyPara3_5 =>
      '• CLI टूल के प्रमाणीकरण और अपलोड फ़्लो का समर्थन करने के लिए।';

  @override
  String get privacyPolicyTitle4 => '4. डेटा साझाकरण और प्रकटीकरण';

  @override
  String get privacyPolicyPara4_1 =>
      'हम आपके व्यक्तिगत डेटा या Google ड्राइव फ़ाइलों को तीसरे पक्षों के साथ बेचते, व्यापार या साझा नहीं करते हैं। सभी APK फ़ाइलें सीधे आपके अपने Google ड्राइव खाते में संग्रहीत की जाती हैं। TestAPK सर्वर केवल डाउनलोड और इंस्टॉलेशन को समन्वित करने के लिए मेटाडेटा (जैसे फ़ाइल आईडी, संस्करण संख्या और रिलीज़ नोट्स) संग्रहीत करता है।';

  @override
  String get privacyPolicyTitle5 => '5. डेटा सुरक्षा';

  @override
  String get privacyPolicyPara5_1 =>
      'हम आपके खाते के मेटाडेटा और प्रमाणीकरण टोकन की सुरक्षा के लिए उद्योग-मानक सुरक्षा उपायों को लागू करते हैं। आपके Google OAuth टोकन सुरक्षित रूप से प्रसारित किए जाते हैं और एन्क्रिप्शन का उपयोग करके संग्रहीत किए जाते हैं।';

  @override
  String get privacyPolicyTitle6 => '6. आपके अधिकार और विकल्प';

  @override
  String get privacyPolicyPara6_1 => 'आपके पास अपने डेटा पर पूर्ण नियंत्रण है:';

  @override
  String get privacyPolicyPara6_2 =>
      '• आप डैशबोर्ड सेटिंग्स के माध्यम से किसी भी समय अपने Google ड्राइव एकीकरण को डिस्कनेक्ट कर सकते हैं।';

  @override
  String get privacyPolicyPara6_3 =>
      '• आप Google खाता अनुमति पृष्ठ पर जाकर अपने Google खाते तक TestAPK की पहुंच को पूरी तरह से रद्द कर सकते हैं।';

  @override
  String get privacyPolicyPara6_4 =>
      '• आप हमसे संपर्क करके अपने TestAPK खाते और संबंधित मेटाडेटा को हटाने का अनुरोध कर सकते हैं।';

  @override
  String get privacyPolicyTitle7 => '7. हमसे संपर्क करें';

  @override
  String get privacyPolicyPara7_1 =>
      'यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न या चिंताएं हैं, तो कृपया हमसे subrata3250das@gmail.com पर संपर्क करें।';

  @override
  String get termsOfServiceLastUpdated => '18 जुलाई, 2026';

  @override
  String get termsOfServiceTitle1 => '1. शर्तों से सहमति';

  @override
  String get termsOfServicePara1_1 =>
      'TestAPK तक पहुँचने या उसका उपयोग करके, आप इन सेवा की शर्तों से बंधे होने के लिए सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।';

  @override
  String get termsOfServiceTitle2 => '2. सेवा का विवरण';

  @override
  String get termsOfServicePara2_1 =>
      'TestAPK डेवलपर्स को एंड्रॉइड एप्लिकेशन पैकेज (APK) होस्ट करने, वितरित करने और प्रबंधित करने के लिए एक प्लेटफ़ॉर्म प्रदान करता है। सेवा में एक वेब डैशबोर्ड, परीक्षण/इंस्टॉलेशन के लिए एक मोबाइल क्लाइंट और व्यक्तिगत अपलोड के लिए एक कमांड लाइन इंटरफ़ेस (CLI) शामिल है।';

  @override
  String get termsOfServiceTitle3 => '3. उपयोगकर्ता खाते और सुरक्षा';

  @override
  String get termsOfServicePara3_1 =>
      'सेवा की कुछ विशेषताओं का उपयोग करने के लिए, आपको Google OAuth का उपयोग करके साइन इन करना होगा। आप अपने खाते के क्रेडेंशियल्स की सुरक्षा बनाए रखने और अपने खाते के तहत होने वाली सभी गतिविधियों के लिए ज़िम्मेदार हैं। आपको अपने खाते के किसी भी अनधिकृत उपयोग के बारे में हमें तुरंत सूचित करना चाहिए।';

  @override
  String get termsOfServiceTitle4 => '4. Google ड्राइव एकीकरण';

  @override
  String get termsOfServicePara4_1 =>
      'हमारी सेवा आपके अपलोड किए गए APK फ़ाइलों को संग्रहीत करने के लिए Google ड्राइव के साथ एकीकृत होती है। अपने Google ड्राइव खाते को लिंक करके, आप TestAPK को एप्लिकेशन द्वारा बनाए गए विशिष्ट फ़ोल्डर के भीतर फ़ाइलें बनाने, पढ़ने और हटाने की अनुमति देते हैं। आप अपने Google ड्राइव में संग्रहीत सभी फ़ाइलों का पूर्ण स्वामित्व और नियंत्रण बनाए रखते हैं।';

  @override
  String get termsOfServiceTitle5 => '5. स्वीकार्य उपयोग';

  @override
  String get termsOfServicePara5_1 =>
      'आप सेवा का उपयोग न करने के लिए सहमत हैं:';

  @override
  String get termsOfServicePara5_2 =>
      '• दुर्भावनापूर्ण सॉफ़्टवेयर, वायरस या उपकरणों को नुकसान पहुंचाने या बाधित करने के लिए डिज़ाइन किए गए किसी भी कोड को अपलोड या वितरित करने के लिए।';

  @override
  String get termsOfServicePara5_3 =>
      '• दूसरों के बौद्धिक संपदा अधिकारों का उल्लंघन करने के लिए।';

  @override
  String get termsOfServicePara5_4 =>
      '• किसी भी लागू स्थानीय, राज्य, राष्ट्रीय या अंतर्राष्ट्रीय कानूनों का उल्लंघन करने के लिए।';

  @override
  String get termsOfServicePara5_5 =>
      '• सेवा या उससे संबंधित प्रणालियों तक अनधिकृत पहुंच प्राप्त करने का प्रयास करने के लिए।';

  @override
  String get termsOfServiceTitle6 => '6. दायित्व की सीमा';

  @override
  String get termsOfServicePara6_1 =>
      'कानून द्वारा अनुमत अधिकतम सीमा तक, TestAPK और उसके डेवलपर्स किसी भी अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या दंडात्मक नुकसान, या मुनाफे या राजस्व के किसी भी नुकसान के लिए उत्तरदायी नहीं होंगे, चाहे वे प्रत्यक्ष या अप्रत्यक्ष रूप से हुए हों, या डेटा, उपयोग, सद्भावना या अन्य अमूर्त नुकसान का कोई भी नुकसान, जो सेवा के आपके उपयोग के परिणामस्वरूप होता है।';

  @override
  String get termsOfServiceTitle7 => '7. शर्तों में बदलाव';

  @override
  String get termsOfServicePara7_1 =>
      'हम किसी भी समय इन सेवा की शर्तों को संशोधित करने या बदलने का अधिकार सुरक्षित रखते हैं। हम इस पृष्ठ पर नई शर्तों को पोस्ट करके आपको किसी भी बदलाव के बारे में सूचित करेंगे। किसी भी बदलाव के बाद सेवा का आपका निरंतर उपयोग नई शर्तों की स्वीकृति माना जाएगा।';

  @override
  String get termsOfServiceTitle8 => '8. हमसे संपर्क करें';

  @override
  String get termsOfServicePara8_1 =>
      'यदि आपके पास इन सेवा की शर्तों के बारे में कोई प्रश्न हैं, तो कृपया हमसे subrata3250das@gmail.com पर संपर्क करें।';
}
