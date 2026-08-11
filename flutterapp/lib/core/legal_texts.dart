import 'package:flutterapp/core/constants.dart';

class LegalSection {
  final String title;
  final List<String> paragraphs;

  const LegalSection({required this.title, required this.paragraphs});
}

class LegalTexts {
  static String get privacyPolicyLastUpdated => kPrivacyPolicyLastUpdated;

  static List<LegalSection> get privacyPolicy => [
    LegalSection(title: kPrivacyPolicyTitle1, paragraphs: [kPrivacyPolicyPara1_1]),
    LegalSection(
      title: kPrivacyPolicyTitle2,
      paragraphs: [kPrivacyPolicyPara2_1, kPrivacyPolicyPara2_2, kPrivacyPolicyPara2_3, kPrivacyPolicyPara2_4],
    ),
    LegalSection(
      title: kPrivacyPolicyTitle3,
      paragraphs: [
        kPrivacyPolicyPara3_1,
        kPrivacyPolicyPara3_2,
        kPrivacyPolicyPara3_3,
        kPrivacyPolicyPara3_4,
        kPrivacyPolicyPara3_5,
      ],
    ),
    LegalSection(title: kPrivacyPolicyTitle4, paragraphs: [kPrivacyPolicyPara4_1]),
    LegalSection(title: kPrivacyPolicyTitle5, paragraphs: [kPrivacyPolicyPara5_1]),
    LegalSection(
      title: kPrivacyPolicyTitle6,
      paragraphs: [kPrivacyPolicyPara6_1, kPrivacyPolicyPara6_2, kPrivacyPolicyPara6_3, kPrivacyPolicyPara6_4],
    ),
    LegalSection(title: kPrivacyPolicyTitle7, paragraphs: [kPrivacyPolicyPara7_1]),
  ];

  static String get termsOfServiceLastUpdated => kTermsOfServiceLastUpdated;

  static List<LegalSection> get termsOfService => [
    LegalSection(title: kTermsOfServiceTitle1, paragraphs: [kTermsOfServicePara1_1]),
    LegalSection(title: kTermsOfServiceTitle2, paragraphs: [kTermsOfServicePara2_1]),
    LegalSection(title: kTermsOfServiceTitle3, paragraphs: [kTermsOfServicePara3_1]),
    LegalSection(title: kTermsOfServiceTitle4, paragraphs: [kTermsOfServicePara4_1]),
    LegalSection(
      title: kTermsOfServiceTitle5,
      paragraphs: [
        kTermsOfServicePara5_1,
        kTermsOfServicePara5_2,
        kTermsOfServicePara5_3,
        kTermsOfServicePara5_4,
        kTermsOfServicePara5_5,
      ],
    ),
    LegalSection(title: kTermsOfServiceTitle6, paragraphs: [kTermsOfServicePara6_1]),
    LegalSection(title: kTermsOfServiceTitle7, paragraphs: [kTermsOfServicePara7_1]),
    LegalSection(title: kTermsOfServiceTitle8, paragraphs: [kTermsOfServicePara8_1]),
  ];
}
