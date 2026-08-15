// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for German (`de`).
class AppLocalizationsDe extends AppLocalizations {
  AppLocalizationsDe([String locale = 'de']) : super(locale);

  @override
  String get loginErrorMsg =>
      'Anmeldung fehlgeschlagen. Bitte stellen Sie sicher, dass Sie ein registrierter Tester sind.';

  @override
  String get appName => 'TestAPK';

  @override
  String get loginSubtitle => 'Ihr Portal für Beta-Releases';

  @override
  String get featureBetaTesting => 'Beta-Tests';

  @override
  String get featureApkDownloads => 'APK-Downloads';

  @override
  String get featureReleaseNotes => 'Versionshinweise';

  @override
  String get featureVerifiedBuilds => 'Verifizierte Builds';

  @override
  String get featureSha256 => 'SHA-256 verifiziert';

  @override
  String get infoTitleTesterAccess => 'Nur für Tester';

  @override
  String get infoSubtitleTesterAccess => 'Nur eingeladene Tester können auf App-Releases zugreifen.';

  @override
  String get infoTitleSecureStorage => 'Sicherer Cloud-Speicher';

  @override
  String get infoSubtitleSecureStorage => 'APKs auf Google Drive gespeichert, sicher bereitgestellt.';

  @override
  String get infoTitleAlwaysUpToDate => 'Immer auf dem neuesten Stand';

  @override
  String get infoSubtitleAlwaysUpToDate => 'Sofortiger Zugriff auf die neuesten Builds.';

  @override
  String get loginSigningIn => 'Anmeldung läuft…';

  @override
  String get loginContinueWithGoogle => 'Weiter mit Google';

  @override
  String get loginConfirmation => 'Mit der Anmeldung bestätigen Sie, dass Sie ein autorisierter Tester sind.';

  @override
  String get splashSubtitle => 'Release-Manager für Tester';

  @override
  String get appListErrorFailedToLoad => 'Daten konnten nicht geladen werden';

  @override
  String get appListErrorConnection => 'Verbindungsfehler: ';

  @override
  String get inviteAcceptedMsg => 'Einladung angenommen!';

  @override
  String get inviteAcceptFailedMsg => 'Einladung konnte nicht angenommen werden';

  @override
  String get inviteRejectedMsg => 'Einladung abgelehnt';

  @override
  String get inviteRejectFailedMsg => 'Einladung konnte nicht abgelehnt werden';

  @override
  String get errorPrefix => 'Fehler: ';

  @override
  String get appListEmptyTitle => 'Sie wurden noch keiner\nApp hinzugefügt.';

  @override
  String get appListEmptySubtitle => 'Bitten Sie einen Entwickler, Sie als Tester einzuladen.';

  @override
  String get signOutTooltip => 'Abmelden';

  @override
  String get labelLatestVersion => 'Neueste Version';

  @override
  String get none => 'Keine';

  @override
  String get tabReleases => 'Releases';

  @override
  String get tabMembers => 'Mitglieder';

  @override
  String get noReleasesMsg => 'Noch keine Releases';

  @override
  String get teamMembersTitle => 'Teammitglieder';

  @override
  String get teamMembersSubtitle => 'Zu dieser Anwendung eingeladene Mitarbeiter.';

  @override
  String get noMembersMsg => 'Noch keine Mitglieder';

  @override
  String get buildPrefix => 'Build #';

  @override
  String get releaseDetailsTitle => 'Release-Details';

  @override
  String get sectionDetails => 'DETAILS';

  @override
  String get sectionUploadedBy => 'HOCHGELADEN VON';

  @override
  String get sectionReleaseNotes => 'VERSIONSHINWEISE';

  @override
  String get sectionPermissionsPrefix => 'BERECHTIGUNGEN (';

  @override
  String get unknownDate => 'Unbekanntes Datum';

  @override
  String get labelBuildNumber => 'Build-Nummer';

  @override
  String get labelMinSdk => 'Min. SDK';

  @override
  String get apiPrefix => 'API ';

  @override
  String get labelTargetSdk => 'Ziel-SDK';

  @override
  String get labelSize => 'Größe';

  @override
  String get downloadFailedMsg => 'Download fehlgeschlagen (';

  @override
  String get downloadedMsg => 'Heruntergeladen: ';

  @override
  String get launchFailedMsg => 'Anwendung konnte nicht gestartet werden';

  @override
  String get launchErrorMsg => 'Fehler beim Starten der App: ';

  @override
  String get downloadingMsg => 'Herunterladen… ';

  @override
  String get installUpdateBtnLabel => 'Update installieren';

  @override
  String get updateBtnLabel => 'Aktualisieren';

  @override
  String get openAppBtnLabel => 'App öffnen';

  @override
  String get installApkBtnLabel => 'APK installieren';

  @override
  String get downloadApkBtnLabel => 'APK herunterladen';

  @override
  String get retryBtnLabel => 'Wiederholen';

  @override
  String get declineBtnLabel => 'Ablehnen';

  @override
  String get acceptBtnLabel => 'Akzeptieren';

  @override
  String get errorInstallCancelled =>
      'Installation abgebrochen: Bitte erteilen Sie die Berechtigung zur Installation der App.';

  @override
  String get errorInstallConflictingVersion =>
      'Installation fehlgeschlagen: Eine widersprüchliche Version der App ist bereits installiert.';

  @override
  String get errorInstallInvalidApk => 'Installation fehlgeschlagen: Die APK-Datei ist ungültig oder beschädigt.';

  @override
  String get errorInstallInsufficientStorage => 'Installation failed: Unzureichender Speicherplatz auf dem Gerät.';

  @override
  String get errorInstallStartFailed => 'Installation konnte nicht gestartet werden';

  @override
  String get errorInstallPrefix => 'Installationsfehler: ';

  @override
  String get feedbackSubmitTitle => 'Feedback senden';

  @override
  String get feedbackCategoryLabel => 'KATEGORIE';

  @override
  String get feedbackRatingLabel => 'BEWERTUNG';

  @override
  String get feedbackTitleLabel => 'TITEL';

  @override
  String get feedbackDescriptionLabel => 'BESCHREIBUNG';

  @override
  String get feedbackTitleHint => 'Kurze Zusammenfassung Ihres Feedbacks';

  @override
  String get feedbackTitleRequired => 'Titel ist erforderlich';

  @override
  String get feedbackDescriptionHint => 'Geben Sie Details zu Ihren Erfahrungen, Fehlern oder Funktionsanfragen an...';

  @override
  String get feedbackDescriptionRequired => 'Beschreibung ist erforderlich';

  @override
  String get feedbackSuccessMsg => 'Vielen Dank für Ihr Feedback!';

  @override
  String get feedbackErrorMsg => 'Feedback konnte nicht gesendet werden';

  @override
  String get supportTitle => 'Support kontaktieren';

  @override
  String get supportSubjectLabel => 'BETREFF';

  @override
  String get supportMessageLabel => 'NACHRICHT';

  @override
  String get supportSubjectHint => 'Worum geht es?';

  @override
  String get supportSubjectRequired => 'Betreff ist erforderlich';

  @override
  String get supportMessageHint => 'Beschreiben Sie Ihr Problem oder Ihre Frage im Detail...';

  @override
  String get supportMessageRequired => 'Nachricht ist erforderlich';

  @override
  String get supportSuccessMsg => 'Support-Anfrage erfolgreich gesendet!';

  @override
  String get supportErrorMsg => 'Support-Anfrage konnte nicht gesendet werden';

  @override
  String get aboutTitle => 'Über TestAPK';

  @override
  String get aboutVersion => 'Version 1.0.0+3';

  @override
  String get aboutDescription => 'Eine moderne, sichere und selbstgehostete APK-Release-Management-Plattform.';

  @override
  String get aboutPlatformInfoLabel => 'PLATTFORMINFORMATIONEN';

  @override
  String get aboutSupportChannelsLabel => 'SUPPORTKANÄLE';

  @override
  String get aboutLaunchError => 'Konnte nicht gestartet werden ';

  @override
  String get labelSendFeedback => 'Feedback senden';

  @override
  String get labelTermsOfService => 'Nutzungsbedingungen';

  @override
  String get labelPrivacyPolicy => 'Datenschutzerklärung';

  @override
  String get labelAboutTestApk => 'Über TestAPK';

  @override
  String get deleteAccountLabel => 'Konto löschen';

  @override
  String get profileTitle => 'Profil';

  @override
  String get signOutLabel => 'Abmelden';

  @override
  String get signOutConfirmTitle => 'Abmelden';

  @override
  String get signOutConfirmMessage => 'Sind Sie sicher, dass Sie sich von Ihrem Konto abmelden möchten?';

  @override
  String get deleteLabel => 'Löschen';

  @override
  String get deleteAccountConfirmTitle => 'Konto löschen?';

  @override
  String get deleteAccountConfirmMessage =>
      'Sind Sie sicher, dass Sie Ihr Konto löschen möchten? Diese Aktion ist dauerhaft und kann nicht rückgängig gemacht werden.';

  @override
  String get deleteAccountSuccessMsg => 'Konto erfolgreich gelöscht';

  @override
  String get deleteAccountErrorMsg => 'Konto konnte nicht gelöscht werden';

  @override
  String get errorUnexpected => 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';

  @override
  String get errorTimeout => 'Verbindung abgelaufen. Bitte überprüfen Sie Ihre Internetverbindung.';

  @override
  String get errorSessionExpired => 'Sitzung abgelaufen. Bitte melden Sie sich erneut an.';

  @override
  String get errorServerError => 'Serverfehler. Bitte versuchen Sie es später noch einmal.';

  @override
  String get errorNoInternet => 'Keine Internetverbindung. Bitte überprüfen Sie Ihre Netzwerkeinstellungen.';

  @override
  String get errorRequestCancelled => 'Anfrage wurde abgebrochen.';

  @override
  String get errorRequestFailedPrefix => 'Anfrage fehlgeschlagen: ';

  @override
  String get errorBadRequest => 'Ungültige Anfrage. Bitte überprüfen Sie Ihre Eingabe.';

  @override
  String get errorForbidden => 'Zugriff verweigert. Sie haben keine Berechtigung, diese Aktion auszuführen.';

  @override
  String get selectLanguage => 'Sprache auswählen';

  @override
  String get saveLanguage => 'Speichern';

  @override
  String get english => 'Englisch';

  @override
  String get spanish => 'Spanisch';

  @override
  String get portuguese => 'Portugiesisch';

  @override
  String get hindi => 'Hindi';

  @override
  String get french => 'Französisch';

  @override
  String get german => 'Deutsch';

  @override
  String get japanese => 'Japanisch';

  @override
  String get chinese => 'Chinesisch';

  @override
  String get arabic => 'Arabisch';

  @override
  String get cancel => 'Abbrechen';

  @override
  String get pendingInvitationsPrefix => 'AUSSTEHENDE EINLADUNGEN (';

  @override
  String get myApplications => 'MEINE ANWENDUNGEN';

  @override
  String get noApplicationsMsg => 'Noch keine akzeptierten Anwendungen.';

  @override
  String get changeLanguageTooltip => 'Sprache ändern';

  @override
  String get agreeToTermsPrefix => 'Mit der Anmeldung stimmen Sie unseren ';

  @override
  String get agreeToTermsAnd => ' und unserer ';

  @override
  String get agreeToTermsSuffix => ' zu.';

  @override
  String get signingIn => 'Anmeldung läuft...';

  @override
  String get continueWithGoogle => 'Weiter mit Google';

  @override
  String get aboutWebDashboardTitle => 'Web-Dashboard';

  @override
  String get aboutWebDashboardSubtitle => 'Google Drive-Speicher, Teamverwaltung, Release-Verlauf';

  @override
  String get aboutFlutterClientTitle => 'Flutter-Client';

  @override
  String get aboutFlutterClientSubtitle => 'Glassmorphic UI, Ein-Klick-Installation, Versionserkennung';

  @override
  String get aboutCliToolTitle => 'CLI-Tool';

  @override
  String get aboutCliToolSubtitle => 'Geräte-Authentifizierungsfluss, Echtzeit-Fortschritt, Drive-Upload-Status';

  @override
  String get aboutEmailSupport => 'E-Mail-Support';

  @override
  String get aboutGithubIssues => 'GitHub-Probleme';

  @override
  String get aboutDiscordCommunity => 'Discord-Community';

  @override
  String get feedbackCategoryBug => 'Bug';

  @override
  String get feedbackCategoryFeature => 'Feature';

  @override
  String get feedbackCategoryOther => 'Sonstiges';

  @override
  String get feedbackRateUsQuestion => 'Wie würden Sie uns bewerten?';

  @override
  String get feedbackSubmitButton => 'Feedback senden';

  @override
  String get profileFullName => 'Vollständiger Name';

  @override
  String get profileEmail => 'E-Mail';

  @override
  String get profileRole => 'Rolle';

  @override
  String get supportSubmitButton => 'Support-Anfrage senden';

  @override
  String get memberStatusPending => 'Ausstehend';

  @override
  String get roleOwner => 'Inhaber';

  @override
  String get roleDeveloper => 'Entwickler';

  @override
  String get roleTester => 'Tester';

  @override
  String legalLastUpdated(String date) {
    return 'Zuletzt aktualisiert: $date';
  }

  @override
  String get privacyPolicyLastUpdated => '18. Juli 2026';

  @override
  String get privacyPolicyTitle1 => '1. Einführung';

  @override
  String get privacyPolicyPara1_1 =>
      'Willkommen bei TestAPK. Wir respektieren Ihre Privatsphäre und verpflichten uns, Ihre personenbezogenen Daten zu schützen. Diese Datenschutzerklärung erklärt, wie wir Ihre Informationen erfassen, verwenden, weitergeben und schützen, wenn Sie unser Web-Dashboard, unsere mobile Anwendung und unsere Befehlszeilenschnittstelle (CLI) nutzen.';

  @override
  String get privacyPolicyTitle2 => '2. Informationen, die wir erfassen';

  @override
  String get privacyPolicyPara2_1 =>
      'Wir erfassen Informationen, die Sie uns bei der Nutzung unserer Dienste direkt zur Verfügung stellen:';

  @override
  String get privacyPolicyPara2_2 =>
      '• Kontoinformationen: Wenn Sie sich über Google OAuth anmelden, erhalten wir Ihren Namen, Ihre E-Mail-Adresse und Ihr Profilbild.';

  @override
  String get privacyPolicyPara2_3 =>
      '• Google Drive-Integration: Um die APK-Speicherung und -Verwaltung zu ermöglichen, fordert unsere Anwendung die Erlaubnis an, auf Ihr Google Drive zuzugreifen. Wir greifen nur auf Dateien zu, erstellen und ändern diese, die von der TestAPK-Anwendung erstellt oder über diese hochgeladen wurden (unter Verwendung des Bereichs drive.file). Wir greifen nicht auf andere Dateien in Ihrem Google Drive zu.';

  @override
  String get privacyPolicyPara2_4 =>
      '• Anwendungs-Metadaten: Wir erfassen Metadaten über die von Ihnen hochgeladenen APK-Dateien (wie Paketname, Versionscode, Versionsname und Versionshinweise), um sie in Ihrem Dashboard und Ihrer mobilen App anzuzeigen.';

  @override
  String get privacyPolicyTitle3 => '3. Wie wir Ihre Informationen verwenden';

  @override
  String get privacyPolicyPara3_1 => 'Wir verwenden die erfassten Informationen für folgende Zwecke:';

  @override
  String get privacyPolicyPara3_2 => '• Um Ihre Identität zu authentifizieren und Ihr Konto zu verwalten.';

  @override
  String get privacyPolicyPara3_3 =>
      '• Um das Hochladen, Speichern und Abrufen von APK-Dateien direkt in/aus Ihrem eigenen Google Drive-Speicher zu erleichtern.';

  @override
  String get privacyPolicyPara3_4 =>
      '• Um den Release-Verlauf und Details der Anwendung auf Ihrem Dashboard und mobilen Client anzuzeigen.';

  @override
  String get privacyPolicyPara3_5 => '• Um die Authentifizierungs- und Upload-Flows des CLI-Tools zu unterstützen.';

  @override
  String get privacyPolicyTitle4 => '4. Weitergabe und Offenlegung von Daten';

  @override
  String get privacyPolicyPara4_1 =>
      'Wir verkaufen, handeln oder teilen Ihre personenbezogenen Daten oder Google Drive-Dateien nicht mit Dritten. Alle APK-Dateien werden direkt in Ihrem eigenen Google Drive-Konto gespeichert. Der TestAPK-Server speichert nur Metadaten (wie Datei-IDs, Versionsnummern und Versionshinweise), um Downloads und Installationen zu koordinieren.';

  @override
  String get privacyPolicyTitle5 => '5. Datensicherheit';

  @override
  String get privacyPolicyPara5_1 =>
      'Wir implementieren branchenübliche Sicherheitsmaßnahmen, um Ihre Kontometadaten und Authentifizierungstoken zu schützen. Ihre Google OAuth-Token werden sicher übertragen und verschlüsselt gespeichert.';

  @override
  String get privacyPolicyTitle6 => '6. Ihre Rechte und Entscheidungen';

  @override
  String get privacyPolicyPara6_1 => 'Sie haben die volle Kontrolle über Ihre Daten:';

  @override
  String get privacyPolicyPara6_2 =>
      '• Sie können Ihre Google Drive-Integration jederzeit über die Dashboard-Einstellungen trennen.';

  @override
  String get privacyPolicyPara6_3 =>
      '• Sie können den Zugriff von TestAPK auf Ihr Google-Konto vollständig widerrufen, indem Sie die Seite für Google-Kontoberechtigungen besuchen.';

  @override
  String get privacyPolicyPara6_4 =>
      '• Sie können die Löschung Ihres TestAPK-Kontos und der zugehörigen Metadaten beantragen, indem Sie uns kontaktieren.';

  @override
  String get privacyPolicyTitle7 => '7. Kontaktieren Sie uns';

  @override
  String get privacyPolicyPara7_1 =>
      'Wenn Sie Fragen oder Bedenken zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte unter subrata3250das@gmail.com.';

  @override
  String get termsOfServiceLastUpdated => '18. Juli 2026';

  @override
  String get termsOfServiceTitle1 => '1. Zustimmung zu den Bedingungen';

  @override
  String get termsOfServicePara1_1 =>
      'Durch den Zugriff auf oder die Nutzung von TestAPK erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie unsere Dienste bitte nicht.';

  @override
  String get termsOfServiceTitle2 => '2. Beschreibung des Dienstes';

  @override
  String get termsOfServicePara2_1 =>
      'TestAPK bietet eine Plattform für Entwickler zum Hosten, Verteilen und Verwalten von Android-Anwendungspaketen (APKs). Der Dienst umfasst ein Web-Dashboard, einen mobilen Client für Tests/Installationen und eine Befehlszeilenschnittstelle (CLI) für automatisierte Uploads.';

  @override
  String get termsOfServiceTitle3 => '3. Benutzerkonten und Sicherheit';

  @override
  String get termsOfServicePara3_1 =>
      'Um bestimmte Funktionen des Dienstes nutzen zu können, müssen Sie sich über Google OAuth anmelden. Sie sind für die Wahrung der Sicherheit Ihrer Kontodaten und für alle Aktivitäten verantwortlich, die unter Ihrem Konto stattfinden. Sie müssen uns unverzüglich über jede unbefugte Nutzung Ihres Kontos informieren.';

  @override
  String get termsOfServiceTitle4 => '4. Google Drive-Integration';

  @override
  String get termsOfServicePara4_1 =>
      'Unser Dienst lässt sich in Google Drive integrieren, um Ihre hochgeladenen APK-Dateien zu speichern. Durch die Verknüpfung Ihres Google Drive-Kontos erteilen Sie TestAPK die Berechtigung, Dateien in dem von der Anwendung erstellten spezifischen Ordner zu erstellen, zu lesen und zu löschen. Sie behalten das volle Eigentum und die Kontrolle über alle in Ihrem Google Drive gespeicherten Dateien.';

  @override
  String get termsOfServiceTitle5 => '5. Zulässige Nutzung';

  @override
  String get termsOfServicePara5_1 => 'Sie erklären sich damit einverstanden, den Dienst nicht zu nutzen, um:';

  @override
  String get termsOfServicePara5_2 =>
      '• Schadsoftware, Viren oder Code hochzuladen oder zu verbreiten, der dazu bestimmt ist, Geräte zu beschädigen oder zu stören.';

  @override
  String get termsOfServicePara5_3 => '• Die geistigen Eigentumsrechte anderer zu verletzen.';

  @override
  String get termsOfServicePara5_4 =>
      '• Gegen geltende lokale, staatliche, nationale oder internationale Gesetze zu verstoßen.';

  @override
  String get termsOfServicePara5_5 =>
      '• Zu versuchen, unbefugten Zugriff auf den Dienst oder seine zugehörigen Systeme zu erlangen.';

  @override
  String get termsOfServiceTitle6 => '6. Haftungsbeschränkung';

  @override
  String get termsOfServicePara6_1 =>
      'Soweit gesetzlich zulässig, haften TestAPK und seine Entwickler nicht für indirekte, zufällige, besondere, Folgeschäden oder Strafschadensersatz oder für entgangene Gewinne oder Einnahmen, die direkt oder indirekt entstehen, oder für Datenverlust, Nutzungsausfall, Goodwill-Verlust oder andere immaterielle Verluste, die sich aus Ihrer Nutzung des Dienstes ergeben.';

  @override
  String get termsOfServiceTitle7 => '7. Änderungen der Bedingungen';

  @override
  String get termsOfServicePara7_1 =>
      'Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern oder zu ersetzen. Wir werden Sie über Änderungen informieren, indem wir die neuen Bedingungen auf dieser Seite veröffentlichen. Ihre fortgesetzte Nutzung des Dienstes nach Änderungen stellt die Annahme der neuen Bedingungen dar.';

  @override
  String get termsOfServiceTitle8 => '8. Kontaktieren Sie uns';

  @override
  String get termsOfServicePara8_1 =>
      'Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns bitte unter subrata3250das@gmail.com.';

  @override
  String get faqTitle => 'Häufig gestellte Fragen';

  @override
  String get faqQuestion1 => 'Was ist TestAPK?';

  @override
  String get faqAnswer1 =>
      'TestAPK ist eine moderne, sichere und selbstgehostete APK-Release-Management-Plattform, mit der Entwickler Beta-Builds direkt an Tester verteilen können.';

  @override
  String get faqQuestion2 => 'Wie installiere ich Updates?';

  @override
  String get faqAnswer2 =>
      'Sie können die neuesten APK-Releases direkt aus der App-Liste herunterladen und installieren. Stellen Sie sicher, dass Sie die Installation aus unbekannten Quellen zulassen, wenn Sie dazu aufgefordert werden.';

  @override
  String get faqQuestion3 => 'Wo werden die APK-Dateien gespeichert?';

  @override
  String get faqAnswer3 =>
      'Alle APK-Dateien werden sicher im Google Drive des Entwicklers gespeichert, was eine vollständige Kontrolle und das Eigentum an den Daten gewährleistet.';

  @override
  String get faqQuestion4 => 'Wie erhalte ich Zugriff auf eine App?';

  @override
  String get faqAnswer4 =>
      'Sie müssen vom App-Besitzer oder -Entwickler als Tester eingeladen werden. Sobald Sie eingeladen wurden, erhalten Sie eine Einladung in der App-Liste, die Sie annehmen können.';

  @override
  String get faqQuestion5 => 'Sind meine Daten sicher?';

  @override
  String get faqAnswer5 =>
      'Ja, TestAPK verwendet Google OAuth für eine sichere Authentifizierung und greift nicht auf andere Dateien in Ihrem Google Drive zu als auf die von der App erstellten.';

  @override
  String get faqQuestion6 => 'Wo lade ich die APK hoch?';

  @override
  String get faqAnswer6 =>
      'Sie können APKs über das Web-Dashboard unter https://testapk.clipboux.online/ oder mit dem TestAPK-CLI-Tool hochladen.';

  @override
  String get maintenanceTitle => 'Systemwartung';

  @override
  String get maintenanceDescription =>
      'Wir führen derzeit geplante Systemaktualisierungen durch, um Leistung und Sicherheit zu verbessern. Wir sind in Kürze wieder online.';

  @override
  String get maintenanceCheckAgain => 'Erneut prüfen';

  @override
  String get maintenanceStillActive =>
      'Das System wird derzeit noch gewartet. Bitte versuchen Sie es später noch einmal.';

  @override
  String get maintenanceCheckFailed => 'Systemstatus konnte nicht überprüft werden. Bitte versuchen Sie es erneut.';

  @override
  String get maintenanceChecking => 'Prüfung...';

  @override
  String get updateRequiredTitle => 'Update erforderlich';

  @override
  String get updateRequiredDescription =>
      'Diese Version der App wird nicht mehr unterstützt. Bitte aktualisieren Sie auf die neueste Version, um fortzufahren.';

  @override
  String get updateNowBtnLabel => 'Jetzt aktualisieren';

  @override
  String get downloadLinkNotConfigured => 'Download-Link ist nicht konfiguriert.';

  @override
  String downloadLinkLaunchError(String link) {
    return 'Download-Link konnte nicht gestartet werden: $link';
  }

  @override
  String get updateAvailableTitle => 'Update verfügbar';

  @override
  String get updateAvailableDescription => 'Eine neue Version der App ist verfügbar. Möchten Sie jetzt aktualisieren?';

  @override
  String get laterBtnLabel => 'Später';
}
