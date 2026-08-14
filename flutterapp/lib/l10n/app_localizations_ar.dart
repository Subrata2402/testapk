// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Arabic (`ar`).
class AppLocalizationsAr extends AppLocalizations {
  AppLocalizationsAr([String locale = 'ar']) : super(locale);

  @override
  String get loginErrorMsg =>
      'فشل تسجيل الدخول. يرجى التأكد من أنك مختبر مسجل.';

  @override
  String get appName => 'TestAPK';

  @override
  String get loginSubtitle => 'بوابتك إلى الإصدارات التجريبية';

  @override
  String get featureBetaTesting => 'الاختبار التجريبي';

  @override
  String get featureApkDownloads => 'تنزيلات APK';

  @override
  String get featureReleaseNotes => 'ملاحظات الإصدار';

  @override
  String get featureVerifiedBuilds => 'إصدارات موثقة';

  @override
  String get featureSha256 => 'موثق بـ SHA-256';

  @override
  String get infoTitleTesterAccess => 'وصول المختبرين فقط';

  @override
  String get infoSubtitleTesterAccess =>
      'يمكن للمختبرين المدعوين فقط الوصول إلى إصدارات التطبيق.';

  @override
  String get infoTitleSecureStorage => 'تخزين سحابي آمن';

  @override
  String get infoSubtitleSecureStorage =>
      'يتم تخزين ملفات APK على Google Drive وتسليمها بأمان.';

  @override
  String get infoTitleAlwaysUpToDate => 'محدث دائماً';

  @override
  String get infoSubtitleAlwaysUpToDate => 'وصول فوري إلى أحدث الإصدارات.';

  @override
  String get loginSigningIn => 'جاري تسجيل الدخول…';

  @override
  String get loginContinueWithGoogle => 'المتابعة باستخدام Google';

  @override
  String get loginConfirmation => 'بتسجيل الدخول، فإنك تؤكد أنك مختبر معتمد.';

  @override
  String get splashSubtitle => 'مدير الإصدارات للمختبرين';

  @override
  String get appListErrorFailedToLoad => 'فشل تحميل البيانات';

  @override
  String get appListErrorConnection => 'خطأ في الاتصال: ';

  @override
  String get inviteAcceptedMsg => 'تم قبول الدعوة!';

  @override
  String get inviteAcceptFailedMsg => 'فشل قبول الدعوة';

  @override
  String get inviteRejectedMsg => 'تم رفض الدعوة';

  @override
  String get inviteRejectFailedMsg => 'فشل رفض الدعوة';

  @override
  String get errorPrefix => 'خطأ: ';

  @override
  String get appListEmptyTitle => 'لم يتم إضافتك بعد\nإلى أي تطبيق.';

  @override
  String get appListEmptySubtitle => 'اطلب من المطور دعوتك كمختبر.';

  @override
  String get signOutTooltip => 'تسجيل الخروج';

  @override
  String get labelLatestVersion => 'أحدث إصدار';

  @override
  String get none => 'لا يوجد';

  @override
  String get tabReleases => 'الإصدارات';

  @override
  String get tabMembers => 'الأعضاء';

  @override
  String get noReleasesMsg => 'لا توجد إصدارات بعد';

  @override
  String get teamMembersTitle => 'أعضاء الفريق';

  @override
  String get teamMembersSubtitle => 'المتعاونون المدعوون إلى هذا التطبيق.';

  @override
  String get noMembersMsg => 'لا يوجد أعضاء بعد';

  @override
  String get buildPrefix => 'إصدار رقم ';

  @override
  String get releaseDetailsTitle => 'تفاصيل الإصدار';

  @override
  String get sectionDetails => 'التفاصيل';

  @override
  String get sectionUploadedBy => 'تم الرفع بواسطة';

  @override
  String get sectionReleaseNotes => 'ملاحظات الإصدار';

  @override
  String get sectionPermissionsPrefix => 'الأذونات (';

  @override
  String get unknownDate => 'تاريخ غير معروف';

  @override
  String get labelBuildNumber => 'رقم الإصدار';

  @override
  String get labelMinSdk => 'الحد الأدنى لـ SDK';

  @override
  String get apiPrefix => 'API ';

  @override
  String get labelTargetSdk => 'SDK المستهدف';

  @override
  String get labelSize => 'الحجم';

  @override
  String get downloadFailedMsg => 'فشل التنزيل (';

  @override
  String get downloadedMsg => 'تم التنزيل: ';

  @override
  String get launchFailedMsg => 'فشل تشغيل التطبيق';

  @override
  String get launchErrorMsg => 'خطأ أثناء تشغيل التطبيق: ';

  @override
  String get downloadingMsg => 'جاري التنزيل… ';

  @override
  String get installUpdateBtnLabel => 'تثبيت التحديث';

  @override
  String get updateBtnLabel => 'تحديث';

  @override
  String get openAppBtnLabel => 'فتح التطبيق';

  @override
  String get installApkBtnLabel => 'تثبيت APK';

  @override
  String get downloadApkBtnLabel => 'تنزيل APK';

  @override
  String get retryBtnLabel => 'إعادة المحاولة';

  @override
  String get declineBtnLabel => 'رفض';

  @override
  String get acceptBtnLabel => 'قبول';

  @override
  String get errorInstallCancelled =>
      'تم إلغاء التثبيت: يرجى منح الإذن لتثبيت التطبيق.';

  @override
  String get errorInstallConflictingVersion =>
      'فشل التثبيت: هناك إصدار متعارض من التطبيق مثبت بالفعل.';

  @override
  String get errorInstallInvalidApk => 'فشل التثبيت: ملف APK غير صالح أو تالف.';

  @override
  String get errorInstallInsufficientStorage =>
      'فشل التثبيت: مساحة تخزين غير كافية على الجهاز.';

  @override
  String get errorInstallStartFailed => 'فشل بدء التثبيت';

  @override
  String get errorInstallPrefix => 'خطأ في التثبيت: ';

  @override
  String get feedbackSubmitTitle => 'إرسال الملاحظات';

  @override
  String get feedbackCategoryLabel => 'الفئة';

  @override
  String get feedbackRatingLabel => 'التقييم';

  @override
  String get feedbackTitleLabel => 'العنوان';

  @override
  String get feedbackDescriptionLabel => 'الوصف';

  @override
  String get feedbackTitleHint => 'ملخص موجز لملاحظاتك';

  @override
  String get feedbackTitleRequired => 'العنوان مطلوب';

  @override
  String get feedbackDescriptionHint =>
      'قدم تفاصيل حول تجربتك أو الخطأ أو طلب الميزة...';

  @override
  String get feedbackDescriptionRequired => 'الوصف مطلوب';

  @override
  String get feedbackSuccessMsg => 'شكراً لملاحظاتك!';

  @override
  String get feedbackErrorMsg => 'فشل إرسال الملاحظات';

  @override
  String get supportTitle => 'الاتصال بالدعم';

  @override
  String get supportSubjectLabel => 'الموضوع';

  @override
  String get supportMessageLabel => 'الرسالة';

  @override
  String get supportSubjectHint => 'بخصوص ماذا هذا الطلب؟';

  @override
  String get supportSubjectRequired => 'الموضوع مطلوب';

  @override
  String get supportMessageHint => 'صف مشكلتك أو سؤالك بالتفصيل...';

  @override
  String get supportMessageRequired => 'الرسالة مطلوبة';

  @override
  String get supportSuccessMsg => 'تم إرسال طلب الدعم بنجاح!';

  @override
  String get supportErrorMsg => 'فشل إرسال طلب الدعم';

  @override
  String get aboutTitle => 'حول TestAPK';

  @override
  String get aboutVersion => 'الإصدار 1.0.0+3';

  @override
  String get aboutDescription =>
      'منصة حديثة وآمنة وذاتية الاستضافة لإدارة إصدارات APK.';

  @override
  String get aboutPlatformInfoLabel => 'معلومات المنصة';

  @override
  String get aboutSupportChannelsLabel => 'قنوات الدعم';

  @override
  String get aboutLaunchError => 'تعذر تشغيل ';

  @override
  String get labelSendFeedback => 'إرسال الملاحظات';

  @override
  String get labelTermsOfService => 'شروط الخدمة';

  @override
  String get labelPrivacyPolicy => 'سياسة الخصوصية';

  @override
  String get labelAboutTestApk => 'حول TestAPK';

  @override
  String get deleteAccountLabel => 'حذف الحساب';

  @override
  String get profileTitle => 'الملف الشخصي';

  @override
  String get signOutLabel => 'تسجيل الخروج';

  @override
  String get signOutConfirmTitle => 'تسجيل الخروج';

  @override
  String get signOutConfirmMessage =>
      'هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟';

  @override
  String get deleteLabel => 'حذف';

  @override
  String get deleteAccountConfirmTitle => 'حذف الحساب؟';

  @override
  String get deleteAccountConfirmMessage =>
      'هل أنت متأكد أنك تريد حذف حسابك؟ هذا الإجراء دائم ولا يمكن التراجع عنه.';

  @override
  String get deleteAccountSuccessMsg => 'تم حذف الحساب بنجاح';

  @override
  String get deleteAccountErrorMsg => 'فشل حذف الحساب';

  @override
  String get errorUnexpected => 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';

  @override
  String get errorTimeout =>
      'انتهت مهلة الاتصال. يرجى التحقق من اتصالك بالإنترنت.';

  @override
  String get errorSessionExpired =>
      'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.';

  @override
  String get errorServerError =>
      'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.';

  @override
  String get errorNoInternet =>
      'لا يوجد اتصال بالإنترنت. يرجى التحقق من إعدادات الشبكة.';

  @override
  String get errorRequestCancelled => 'تم إلغاء الطلب.';

  @override
  String get errorRequestFailedPrefix => 'فشل الطلب: ';

  @override
  String get errorBadRequest => 'طلب غير صالح. يرجى التحقق من المدخلات.';

  @override
  String get errorForbidden =>
      'تم رفض الوصول. ليس لديك إذن للقيام بهذا الإجراء.';

  @override
  String get selectLanguage => 'اختر اللغة';

  @override
  String get saveLanguage => 'حفظ';

  @override
  String get english => 'الإنجليزية';

  @override
  String get spanish => 'الإسبانية';

  @override
  String get portuguese => 'البرتغالية';

  @override
  String get hindi => 'الهندية';

  @override
  String get french => 'الفرنسية';

  @override
  String get german => 'الألمانية';

  @override
  String get japanese => 'اليابانية';

  @override
  String get chinese => 'الصينية';

  @override
  String get arabic => 'العربية';

  @override
  String get cancel => 'إلغاء';

  @override
  String get pendingInvitationsPrefix => 'الدعوات المعلقة (';

  @override
  String get myApplications => 'تطبيقاتي';

  @override
  String get noApplicationsMsg => 'لا توجد تطبيقات مقبولة بعد.';

  @override
  String get changeLanguageTooltip => 'تغيير اللغة';

  @override
  String get agreeToTermsPrefix => 'بتسجيل الدخول، فإنك توافق على ';

  @override
  String get agreeToTermsAnd => ' و ';

  @override
  String get agreeToTermsSuffix => ' الخاصة بنا.';

  @override
  String get signingIn => 'جاري تسجيل الدخول...';

  @override
  String get continueWithGoogle => 'المتابعة باستخدام Google';

  @override
  String get aboutWebDashboardTitle => 'لوحة التحكم على الويب';

  @override
  String get aboutWebDashboardSubtitle =>
      'تخزين Google Drive، إدارة الفريق، سجل الإصدارات';

  @override
  String get aboutFlutterClientTitle => 'عميل Flutter';

  @override
  String get aboutFlutterClientSubtitle =>
      'واجهة مستخدم زجاجية، تثبيت بنقرة واحدة، كشف الإصدار';

  @override
  String get aboutCliToolTitle => 'أداة CLI';

  @override
  String get aboutCliToolSubtitle =>
      'خطوات مصادقة الجهاز، تقدم في الوقت الفعلي، حالة رفع الملفات على Drive';

  @override
  String get aboutEmailSupport => 'الدعم عبر البريد الإلكتروني';

  @override
  String get aboutGithubIssues => 'مشاكل GitHub';

  @override
  String get aboutDiscordCommunity => 'مجتمع Discord';

  @override
  String get feedbackCategoryBug => 'خطأ';

  @override
  String get feedbackCategoryFeature => 'ميزة';

  @override
  String get feedbackCategoryOther => 'أخرى';

  @override
  String get feedbackRateUsQuestion => 'كيف تقيمنا؟';

  @override
  String get feedbackSubmitButton => 'إرسال الملاحظات';

  @override
  String get profileFullName => 'الاسم الكامل';

  @override
  String get profileEmail => 'البريد الإلكتروني';

  @override
  String get profileRole => 'الدور';

  @override
  String get supportSubmitButton => 'إرسال طلب الدعم';

  @override
  String get memberStatusPending => 'معلق';

  @override
  String get roleOwner => 'المالك';

  @override
  String get roleDeveloper => 'المطور';

  @override
  String get roleTester => 'المختبر';

  @override
  String legalLastUpdated(String date) {
    return 'آخر تحديث: $date';
  }

  @override
  String get privacyPolicyLastUpdated => '18 يوليو 2026';

  @override
  String get privacyPolicyTitle1 => '1. مقدمة';

  @override
  String get privacyPolicyPara1_1 =>
      'مرحبًا بك في TestAPK. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها والكشف عنها وحمايتها عند استخدام لوحة التحكم على الويب وتطبيق الهاتف المحمول وواجهة سطر الأوامر (CLI).';

  @override
  String get privacyPolicyTitle2 => '2. المعلومات التي نجمعها';

  @override
  String get privacyPolicyPara2_1 =>
      'نجمع المعلومات التي تقدمها لنا مباشرة عند استخدام خدماتنا:';

  @override
  String get privacyPolicyPara2_2 =>
      '• معلومات الحساب: عند تسجيل الدخول باستخدام Google OAuth، نتلقى اسمك وبريدك الإلكتروني وصورتك الشخصية.';

  @override
  String get privacyPolicyPara2_3 =>
      '• التكامل مع Google Drive: لتمكين تخزين وإدارة ملفات APK، يطلب تطبيقنا الإذن للوصول إلى Google Drive الخاص بك. نحن نصل فقط إلى الملفات التي تم إنشاؤها بواسطة تطبيق TestAPK أو رفعها من خلاله ونقوم بتعديلها (باستخدام نطاق drive.file). لا نصل إلى أي ملفات أخرى في Google Drive الخاص بك أو نقرأها.';

  @override
  String get privacyPolicyPara2_4 =>
      '• البيانات الوصفية للتطبيق: نجمع بيانات وصفية حول ملفات APK التي تقوم برفعها (مثل اسم الحزمة، رمز الإصدار، اسم الإصدار، وملاحظات الإصدار) لعرضها في لوحة التحكم وتطبيق الهاتف المحمول الخاص بك.';

  @override
  String get privacyPolicyTitle3 => '3. كيف نستخدم معلوماتك';

  @override
  String get privacyPolicyPara3_1 =>
      'نستخدم المعلومات التي نجمعها للأغراض التالية:';

  @override
  String get privacyPolicyPara3_2 => '• للتحقق من هويتك وإدارة حسابك.';

  @override
  String get privacyPolicyPara3_3 =>
      '• لتسهيل رفع وتخزين واسترجاع ملفات APK مباشرة إلى/من مساحة تخزين Google Drive الخاصة بك.';

  @override
  String get privacyPolicyPara3_4 =>
      '• لعرض سجل إصدارات التطبيق وتفاصيله على لوحة التحكم وعميل الهاتف المحمول الخاص بك.';

  @override
  String get privacyPolicyPara3_5 =>
      '• لدعم عمليات المصادقة والرفع الخاصة بأداة CLI.';

  @override
  String get privacyPolicyTitle4 => '4. مشاركة البيانات والكشف عنها';

  @override
  String get privacyPolicyPara4_1 =>
      'نحن لا نبيع أو نتاجر أو نشارك بياناتك الشخصية أو ملفات Google Drive الخاصة بك مع أطراف ثالثة. يتم تخزين جميع ملفات APK مباشرة في حساب Google Drive الخاص بك. يخزن خادم TestAPK فقط البيانات الوصفية (مثل معرفات الملفات، وأرقام الإصدارات، وملاحظات الإصدار) لتنسيق عمليات التنزيل والتثبيت.';

  @override
  String get privacyPolicyTitle5 => '5. أمن البيانات';

  @override
  String get privacyPolicyPara5_1 =>
      'نحن نطبق تدابير أمنية قياسية في الصناعة لحماية البيانات الوصفية لحسابك ورموز المصادقة. يتم نقل رموز Google OAuth الخاصة بك بشكل آمن وتخزينها باستخدام التشفير.';

  @override
  String get privacyPolicyTitle6 => '6. حقوقك وخياراتك';

  @override
  String get privacyPolicyPara6_1 => 'لديك السيطرة الكاملة على بياناتك:';

  @override
  String get privacyPolicyPara6_2 =>
      '• يمكنك فصل تكامل Google Drive في أي وقت من خلال إعدادات لوحة التحكم.';

  @override
  String get privacyPolicyPara6_3 =>
      '• يمكنك إلغاء وصول TestAPK إلى حساب Google الخاص بك تماماً عن طريق زيارة صفحة أذونات حساب Google.';

  @override
  String get privacyPolicyPara6_4 =>
      '• يمكنك طلب حذف حساب TestAPK الخاص بك والبيانات الوصفية المرتبطة به عن طريق الاتصال بنا.';

  @override
  String get privacyPolicyTitle7 => '7. اتصل بنا';

  @override
  String get privacyPolicyPara7_1 =>
      'إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، يرجى الاتصال بنا على subrata3250das@gmail.com.';

  @override
  String get termsOfServiceLastUpdated => '18 يوليو 2026';

  @override
  String get termsOfServiceTitle1 => '1. الموافقة على الشروط';

  @override
  String get termsOfServicePara1_1 =>
      'بالوصول إلى TestAPK أو استخدامه، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.';

  @override
  String get termsOfServiceTitle2 => '2. وصف الخدمة';

  @override
  String get termsOfServicePara2_1 =>
      'يوفر TestAPK منصة للمطورين لاستضافة وتوزيع وإدارة حزم تطبيقات Android (APK). تشمل الخدمة لوحة تحكم على الويب، وعميل هاتف محمول للاختبار/التثبيت، وواجهة سطر أوامر (CLI) للرفع التلقائي.';

  @override
  String get termsOfServiceTitle3 => '3. حسابات المستخدمين والأمان';

  @override
  String get termsOfServicePara3_1 =>
      'لاستخدام ميزات معينة من الخدمة، يجب عليك تسجيل الدخول باستخدام Google OAuth. أنت مسؤول عن الحفاظ على أمان بيانات اعتماد حسابك وعن جميع الأنشطة التي تحدث تحت حسابك. يجب عليك إخطارنا فوراً بأي استخدام غير مصرح به لحسابك.';

  @override
  String get termsOfServiceTitle4 => '4. التكامل مع Google Drive';

  @override
  String get termsOfServicePara4_1 =>
      'تتكامل خدمتنا مع Google Drive لتخزين ملفات APK المرفوعة. بربط حساب Google Drive الخاص بك، فإنك تمنح TestAPK الإذن لإنشاء وقراءة وحذف الملفات داخل المجلد المحدد الذي تم إنشاؤه بواسطة التطبيق. تحتفظ بالملكية والسيطرة الكاملة على جميع الملفات المخزنة في Google Drive الخاص بك.';

  @override
  String get termsOfServiceTitle5 => '5. الاستخدام المقبول';

  @override
  String get termsOfServicePara5_1 => 'أنت توافق على عدم استخدام الخدمة لـ:';

  @override
  String get termsOfServicePara5_2 =>
      '• رفع أو توزيع برامج ضارة أو فيروسات أو أي رمز مصمم لإتلاف الأجهزة أو تعطيلها.';

  @override
  String get termsOfServicePara5_3 => '• انتهاك حقوق الملكية الفكرية للآخرين.';

  @override
  String get termsOfServicePara5_4 =>
      '• انتهاك أي قوانين محلية أو حكومية أو وطنية أو دولية معمول بها.';

  @override
  String get termsOfServicePara5_5 =>
      '• محاولة الحصول على وصول غير مصرح به إلى الخدمة أو الأنظمة المرتبطة بها.';

  @override
  String get termsOfServiceTitle6 => '6. تحديد المسؤولية';

  @override
  String get termsOfServicePara6_1 =>
      'إلى أقصى حد يسمح به القانون، لن يكون TestAPK ومطوروه مسؤولين عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو تأديبية، أو أي خسارة في الأرباح أو الإيرادات، سواء تم تكبدها بشكل مباشر أو غير مباشر، أو أي خسارة في البيانات أو الاستخدام أو السمعة الحسنة أو غيرها من الخسائر غير الملموسة، الناتجة عن استخدامك للخدمة.';

  @override
  String get termsOfServiceTitle7 => '7. التغييرات على الشروط';

  @override
  String get termsOfServicePara7_1 =>
      'نحتفظ بالحق في تعديل أو استبدال شروط الخدمة هذه في أي وقت. سنقوم بإعلامك بأي تغييرات عن طريق نشر الشروط الجديدة على هذه الصفحة. استمرار استخدامك للخدمة بعد أي تغييرات يشكل قبولاً للشروط الجديدة.';

  @override
  String get termsOfServiceTitle8 => '8. اتصل بنا';

  @override
  String get termsOfServicePara8_1 =>
      'إذا كان لديك أي أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا على subrata3250das@gmail.com.';

  @override
  String get faqTitle => 'الأسئلة الشائعة';

  @override
  String get faqQuestion1 => 'ما هو TestAPK؟';

  @override
  String get faqAnswer1 =>
      'TestAPK هو منصة حديثة وآمنة ومستضافة ذاتياً لإدارة إصدارات APK تتيح للمطورين توزيع إصدارات بيتا مباشرة للمختبرين.';

  @override
  String get faqQuestion2 => 'كيف أقوم بتثبيت التحديثات؟';

  @override
  String get faqAnswer2 =>
      'يمكنك تنزيل وتثبيت أحدث إصدارات APK مباشرة من قائمة التطبيقات. تأكد من السماح بالتثبيت من مصادر غير معروفة إذا طلب منك ذلك.';

  @override
  String get faqQuestion3 => 'أين يتم تخزين ملفات APK؟';

  @override
  String get faqAnswer3 =>
      'يتم تخزين جميع ملفات APK بشكل آمن في Google Drive الخاص بالمطور، مما يضمن التحكم الكامل والملكية للبيانات.';

  @override
  String get faqQuestion4 => 'كيف يمكنني الحصول على حق الوصول إلى تطبيق؟';

  @override
  String get faqAnswer4 =>
      'يجب أن يتم دعوتك من قبل مالك التطبيق أو المطور كمختبر. بمجرد دعوتك، ستتلقى دعوة في قائمة التطبيقات لقبولها.';

  @override
  String get faqQuestion5 => 'هل بياناتي آمنة؟';

  @override
  String get faqAnswer5 =>
      'نعم، يستخدم TestAPK نظام Google OAuth للمصادقة الآمنة ولا يصل إلى أي ملفات في Google Drive الخاص بك بخلاف تلك التي تم إنشاؤها بواسطة التطبيق.';

  @override
  String get faqQuestion6 => 'أين أقوم برفع ملف APK؟';

  @override
  String get faqAnswer6 =>
      'يمكنك رفع ملفات APK عبر لوحة التحكم على الويب على https://testapk.clipboux.online/ أو باستخدام أداة TestAPK CLI.';

  @override
  String get maintenanceTitle => 'صيانة النظام';

  @override
  String get maintenanceDescription =>
      'نقوم حاليًا بإجراء تحديثات مجدولة للنظام لتحسين الأداء والأمان. سنعود للعمل قريبًا.';

  @override
  String get maintenanceCheckAgain => 'التحقق مرة أخرى';

  @override
  String get maintenanceStillActive =>
      'النظام لا يزال قيد الصيانة. يرجى المحاولة مرة أخرى لاحقًا.';

  @override
  String get maintenanceCheckFailed =>
      'فشل التحقق من حالة النظام. يرجى المحاولة مرة أخرى.';

  @override
  String get maintenanceChecking => 'جاري التحقق...';
}
