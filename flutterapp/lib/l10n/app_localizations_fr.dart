// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for French (`fr`).
class AppLocalizationsFr extends AppLocalizations {
  AppLocalizationsFr([String locale = 'fr']) : super(locale);

  @override
  String get loginErrorMsg => 'Échec de la connexion. Veuillez vous assurer que vous êtes un testeur enregistré.';

  @override
  String get appName => 'TestAPK';

  @override
  String get loginSubtitle => 'Votre portail vers les versions bêta';

  @override
  String get featureBetaTesting => 'Tests bêta';

  @override
  String get featureApkDownloads => 'Téléchargements d\'APK';

  @override
  String get featureReleaseNotes => 'Notes de version';

  @override
  String get featureVerifiedBuilds => 'Versions vérifiées';

  @override
  String get featureSha256 => 'Vérifié SHA-256';

  @override
  String get infoTitleTesterAccess => 'Accès testeur uniquement';

  @override
  String get infoSubtitleTesterAccess => 'Seuls les testeurs invités peuvent accéder aux versions de l\'application.';

  @override
  String get infoTitleSecureStorage => 'Stockage cloud sécurisé';

  @override
  String get infoSubtitleSecureStorage => 'APK stockés sur Google Drive, livrés en toute sécurité.';

  @override
  String get infoTitleAlwaysUpToDate => 'Toujours à jour';

  @override
  String get infoSubtitleAlwaysUpToDate => 'Accès instantané aux dernières versions.';

  @override
  String get loginSigningIn => 'Connexion en cours…';

  @override
  String get loginContinueWithGoogle => 'Continuer avec Google';

  @override
  String get loginConfirmation => 'En vous connectant, vous confirmez que vous êtes un testeur autorisé.';

  @override
  String get splashSubtitle => 'Gestionnaire de versions pour les testeurs';

  @override
  String get appListErrorFailedToLoad => 'Échec du chargement des données';

  @override
  String get appListErrorConnection => 'Erreur de connexion : ';

  @override
  String get inviteAcceptedMsg => 'Invitation acceptée !';

  @override
  String get inviteAcceptFailedMsg => 'Échec de l\'acceptation de l\'invitation';

  @override
  String get inviteRejectedMsg => 'Invitation rejetée';

  @override
  String get inviteRejectFailedMsg => 'Échec du rejet de l\'invitation';

  @override
  String get errorPrefix => 'Erreur : ';

  @override
  String get appListEmptyTitle => 'Vous n\'avez pas encore été ajouté\nà une application.';

  @override
  String get appListEmptySubtitle => 'Demandez à un développeur de vous inviter en tant que testeur.';

  @override
  String get signOutTooltip => 'Se déconnecter';

  @override
  String get labelLatestVersion => 'Dernière version';

  @override
  String get none => 'Aucun';

  @override
  String get tabReleases => 'Versions';

  @override
  String get tabMembers => 'Membres';

  @override
  String get noReleasesMsg => 'Aucune version pour le moment';

  @override
  String get teamMembersTitle => 'Membres de l\'équipe';

  @override
  String get teamMembersSubtitle => 'Collaborateurs invités à cette application.';

  @override
  String get noMembersMsg => 'Aucun membre pour le moment';

  @override
  String get buildPrefix => 'Version n°';

  @override
  String get releaseDetailsTitle => 'Détails de la version';

  @override
  String get sectionDetails => 'DÉTAILS';

  @override
  String get sectionUploadedBy => 'TÉLÉCHARGÉ PAR';

  @override
  String get sectionReleaseNotes => 'NOTES DE VERSION';

  @override
  String get sectionPermissionsPrefix => 'AUTORISATIONS (';

  @override
  String get unknownDate => 'Date inconnue';

  @override
  String get labelBuildNumber => 'Numéro de build';

  @override
  String get labelMinSdk => 'SDK min.';

  @override
  String get apiPrefix => 'API ';

  @override
  String get labelTargetSdk => 'SDK cible';

  @override
  String get labelSize => 'Taille';

  @override
  String get downloadFailedMsg => 'Échec du téléchargement (';

  @override
  String get downloadedMsg => 'Téléchargé : ';

  @override
  String get launchFailedMsg => 'Échec du lancement de l\'application';

  @override
  String get launchErrorMsg => 'Erreur lors du lancement de l\'application : ';

  @override
  String get downloadingMsg => 'Téléchargement… ';

  @override
  String get installUpdateBtnLabel => 'Installer la mise à jour';

  @override
  String get updateBtnLabel => 'Mettre à jour';

  @override
  String get openAppBtnLabel => 'Ouvrir l\'application';

  @override
  String get installApkBtnLabel => 'Installer l\'APK';

  @override
  String get downloadApkBtnLabel => 'Télécharger l\'APK';

  @override
  String get retryBtnLabel => 'Réessayer';

  @override
  String get declineBtnLabel => 'Décliner';

  @override
  String get acceptBtnLabel => 'Accepter';

  @override
  String get errorInstallCancelled =>
      'Installation annulée : veuillez accorder l\'autorisation d\'installer l\'application.';

  @override
  String get errorInstallConflictingVersion =>
      'Échec de l\'installation : une version conflictuelle de l\'application est déjà installée.';

  @override
  String get errorInstallInvalidApk => 'Échec de l\'installation : le fichier APK est invalide ou corrompu.';

  @override
  String get errorInstallInsufficientStorage =>
      'Échec de l\'installation : espace de stockage insuffisant sur l\'appareil.';

  @override
  String get errorInstallStartFailed => 'Échec du démarrage de l\'installation';

  @override
  String get errorInstallPrefix => 'Erreur d\'installation : ';

  @override
  String get feedbackSubmitTitle => 'Envoyer des commentaires';

  @override
  String get feedbackCategoryLabel => 'CATÉGORIE';

  @override
  String get feedbackRatingLabel => 'ÉVALUATION';

  @override
  String get feedbackTitleLabel => 'TITRE';

  @override
  String get feedbackDescriptionLabel => 'DESCRIPTION';

  @override
  String get feedbackTitleHint => 'Bref résumé de vos commentaires';

  @override
  String get feedbackTitleRequired => 'Le titre est requis';

  @override
  String get feedbackDescriptionHint =>
      'Fournissez des détails sur votre expérience, un bug ou une demande de fonctionnalité...';

  @override
  String get feedbackDescriptionRequired => 'La description est requise';

  @override
  String get feedbackSuccessMsg => 'Merci pour vos commentaires !';

  @override
  String get feedbackErrorMsg => 'Échec de l\'envoi des commentaires';

  @override
  String get supportTitle => 'Contacter le support';

  @override
  String get supportSubjectLabel => 'SUJET';

  @override
  String get supportMessageLabel => 'MESSAGE';

  @override
  String get supportSubjectHint => 'De quoi s\'agit-il ?';

  @override
  String get supportSubjectRequired => 'Le sujet est requis';

  @override
  String get supportMessageHint => 'Décrivez votre problème ou votre question en détail...';

  @override
  String get supportMessageRequired => 'Le message est requis';

  @override
  String get supportSuccessMsg => 'Demande de support envoyée avec succès !';

  @override
  String get supportErrorMsg => 'Échec de l\'envoi de la demande de support';

  @override
  String get aboutTitle => 'À propos de TestAPK';

  @override
  String get aboutVersion => 'Version 1.0.0+3';

  @override
  String get aboutDescription => 'Une plateforme de gestion de versions APK moderne, sécurisée et auto-hébergée.';

  @override
  String get aboutPlatformInfoLabel => 'INFORMATIONS SUR LA PLATEFORME';

  @override
  String get aboutSupportChannelsLabel => 'CANAUX DE SUPPORT';

  @override
  String get aboutLaunchError => 'Impossible de lancer ';

  @override
  String get labelSendFeedback => 'Envoyer des commentaires';

  @override
  String get labelTermsOfService => 'Conditions d\'utilisation';

  @override
  String get labelPrivacyPolicy => 'Politique de confidentialité';

  @override
  String get labelAboutTestApk => 'À propos de TestAPK';

  @override
  String get deleteAccountLabel => 'Supprimer le compte';

  @override
  String get profileTitle => 'Profil';

  @override
  String get signOutLabel => 'Se déconnecter';

  @override
  String get signOutConfirmTitle => 'Se déconnecter';

  @override
  String get signOutConfirmMessage => 'Êtes-vous sûr de vouloir vous déconnecter de votre compte ?';

  @override
  String get deleteLabel => 'Supprimer';

  @override
  String get deleteAccountConfirmTitle => 'Supprimer le compte ?';

  @override
  String get deleteAccountConfirmMessage =>
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est permanente et ne peut pas être annulée.';

  @override
  String get deleteAccountSuccessMsg => 'Compte supprimé avec succès';

  @override
  String get deleteAccountErrorMsg => 'Échec de la suppression du compte';

  @override
  String get errorUnexpected => 'Une erreur inattendue est survenue. Veuillez réessayer.';

  @override
  String get errorTimeout => 'Délai de connexion dépassé. Veuillez vérifier votre connexion Internet.';

  @override
  String get errorSessionExpired => 'Session expirée. Veuillez vous reconnecter.';

  @override
  String get errorServerError => 'Erreur du serveur. Veuillez réessayer plus tard.';

  @override
  String get errorNoInternet => 'Pas de connexion Internet. Veuillez vérifier vos paramètres réseau.';

  @override
  String get errorRequestCancelled => 'La requête a été annulée.';

  @override
  String get errorRequestFailedPrefix => 'Échec de la requête : ';

  @override
  String get errorBadRequest => 'Requête incorrecte. Veuillez vérifier votre saisie.';

  @override
  String get errorForbidden => 'Accès refusé. Vous n\'avez pas l\'autorisation d\'effectuer cette action.';

  @override
  String get selectLanguage => 'Choisir la langue';

  @override
  String get saveLanguage => 'Enregistrer';

  @override
  String get english => 'Anglais';

  @override
  String get spanish => 'Espagnol';

  @override
  String get portuguese => 'Portugais';

  @override
  String get hindi => 'Hindi';

  @override
  String get french => 'Français';

  @override
  String get german => 'Allemand';

  @override
  String get japanese => 'Japonais';

  @override
  String get chinese => 'Chinois';

  @override
  String get arabic => 'Arabe';

  @override
  String get cancel => 'Annuler';

  @override
  String get pendingInvitationsPrefix => 'INVITATIONS EN ATTENTE (';

  @override
  String get myApplications => 'MES APPLICATIONS';

  @override
  String get noApplicationsMsg => 'Aucune application acceptée pour le moment.';

  @override
  String get changeLanguageTooltip => 'Changer de langue';

  @override
  String get agreeToTermsPrefix => 'En vous connectant, vous acceptez nos ';

  @override
  String get agreeToTermsAnd => ' et notre ';

  @override
  String get agreeToTermsSuffix => '.';

  @override
  String get signingIn => 'Connexion...';

  @override
  String get continueWithGoogle => 'Continuer avec Google';

  @override
  String get aboutWebDashboardTitle => 'Tableau de bord Web';

  @override
  String get aboutWebDashboardSubtitle => 'Stockage Google Drive, gestion d\'équipe, historique des versions';

  @override
  String get aboutFlutterClientTitle => 'Client Flutter';

  @override
  String get aboutFlutterClientSubtitle =>
      'Interface utilisateur glassmorphic, installation en un clic, détection de version';

  @override
  String get aboutCliToolTitle => 'Outil CLI';

  @override
  String get aboutCliToolSubtitle =>
      'Flux d\'authentification de l\'appareil, progression en temps réel, état de téléchargement Drive';

  @override
  String get aboutEmailSupport => 'Support par e-mail';

  @override
  String get aboutGithubIssues => 'Problèmes GitHub';

  @override
  String get aboutDiscordCommunity => 'Communauté Discord';

  @override
  String get feedbackCategoryBug => 'Bug';

  @override
  String get feedbackCategoryFeature => 'Fonctionnalité';

  @override
  String get feedbackCategoryOther => 'Autre';

  @override
  String get feedbackRateUsQuestion => 'Comment nous évalueriez-vous ?';

  @override
  String get feedbackSubmitButton => 'Envoyer des commentaires';

  @override
  String get profileFullName => 'Nom complet';

  @override
  String get profileEmail => 'E-mail';

  @override
  String get profileRole => 'Rôle';

  @override
  String get supportSubmitButton => 'Envoyer la demande de support';

  @override
  String get memberStatusPending => 'En attente';

  @override
  String get roleOwner => 'Propriétaire';

  @override
  String get roleDeveloper => 'Développeur';

  @override
  String get roleTester => 'Testeur';

  @override
  String legalLastUpdated(String date) {
    return 'Dernière mise à jour : $date';
  }

  @override
  String get privacyPolicyLastUpdated => '18 juillet 2026';

  @override
  String get privacyPolicyTitle1 => '1. Introduction';

  @override
  String get privacyPolicyPara1_1 =>
      'Bienvenue sur TestAPK. Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre tableau de bord Web, notre application mobile et notre interface de ligne de commande (CLI).';

  @override
  String get privacyPolicyTitle2 => '2. Informations que nous collectons';

  @override
  String get privacyPolicyPara2_1 =>
      'Nous collectons les informations que vous nous fournissez directement lors de l\'utilisation de nos services :';

  @override
  String get privacyPolicyPara2_2 =>
      '• Informations sur le compte : lorsque vous vous connectez à l\'aide de Google OAuth, nous recevons votre nom, votre adresse e-mail et votre photo de profil.';

  @override
  String get privacyPolicyPara2_3 =>
      '• Intégration de Google Drive : pour activer le stockage et la gestion des APK, notre application demande l\'autorisation d\'accéder à votre Google Drive. Nous accédons, créons et modifions uniquement les fichiers créés par ou téléchargés via l\'application TestAPK (en utilisant le champ d\'application drive.file). Nous n\'accédons ni ne lisons aucun autre fichier de votre Google Drive.';

  @override
  String get privacyPolicyPara2_4 =>
      '• Métadonnées de l\'application : nous collectons des métadonnées sur les fichiers APK que vous téléchargez (telles que le nom du package, le code de version, le nom de version et les notes de version) afin de les afficher sur votre tableau de bord et votre application mobile.';

  @override
  String get privacyPolicyTitle3 => '3. Comment nous utilisons vos informations';

  @override
  String get privacyPolicyPara3_1 => 'Nous utilisons les informations collectées aux fins suivantes :';

  @override
  String get privacyPolicyPara3_2 => '• Pour authentifier votre identité et gérer votre compte.';

  @override
  String get privacyPolicyPara3_3 =>
      '• Pour faciliter le téléchargement, le stockage et la récupération de fichiers APK directement vers/depuis votre propre espace de stockage Google Drive.';

  @override
  String get privacyPolicyPara3_4 =>
      '• Pour afficher l\'historique et les détails des versions de l\'application sur votre tableau de bord et votre client mobile.';

  @override
  String get privacyPolicyPara3_5 =>
      '• Pour prendre en charge les flux d\'authentification et de téléchargement de l\'outil CLI.';

  @override
  String get privacyPolicyTitle4 => '4. Partage et divulgation des données';

  @override
  String get privacyPolicyPara4_1 =>
      'Nous ne vendons, n\'échangeons ni ne partageons vos données personnelles ou vos fichiers Google Drive avec des tiers. Tous les fichiers APK sont stockés directement sur votre propre compte Google Drive. Le serveur TestAPK stocke uniquement des métadonnées (telles que les identifiants de fichiers, les numéros de version et les notes de version) pour coordonner les téléchargements et les installations.';

  @override
  String get privacyPolicyTitle5 => '5. Sécurité des données';

  @override
  String get privacyPolicyPara5_1 =>
      'Nous mettons en œuvre des mesures de sécurité conformes aux normes de l\'industrie pour protéger les métadonnées de votre compte et vos jetons d\'authentification. Vos jetons Google OAuth sont transmis de manière sécurisée et stockés à l\'aide d\'un cryptage.';

  @override
  String get privacyPolicyTitle6 => '6. Vos droits et choix';

  @override
  String get privacyPolicyPara6_1 => 'Vous avez un contrôle total sur vos données :';

  @override
  String get privacyPolicyPara6_2 =>
      '• Vous pouvez déconnecter votre intégration Google Drive à tout moment via les paramètres du tableau de bord.';

  @override
  String get privacyPolicyPara6_3 =>
      '• Vous pouvez révoquer entièrement l\'accès de TestAPK à votre compte Google en visitant la page des autorisations du compte Google.';

  @override
  String get privacyPolicyPara6_4 =>
      '• Vous pouvez demander la suppression de votre compte TestAPK et des métadonnées associées en nous contactant.';

  @override
  String get privacyPolicyTitle7 => '7. Nous contacter';

  @override
  String get privacyPolicyPara7_1 =>
      'Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, veuillez nous contacter à subrata3250das@gmail.com.';

  @override
  String get termsOfServiceLastUpdated => '18 juillet 2026';

  @override
  String get termsOfServiceTitle1 => '1. Acceptation des conditions';

  @override
  String get termsOfServicePara1_1 =>
      'En accédant ou en utilisant TestAPK, vous acceptez d\'être lié par ces conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser nos services.';

  @override
  String get termsOfServiceTitle2 => '2. Description du service';

  @override
  String get termsOfServicePara2_1 =>
      'TestAPK fournit une plateforme permettant aux développeurs d\'héberger, de distribuer et de gérer des packages d\'applications Android (APK). Le service comprend un tableau de bord Web, un client mobile pour les tests/l\'installation et une interface de ligne de commande (CLI) pour les téléchargements automatisés.';

  @override
  String get termsOfServiceTitle3 => '3. Comptes d\'utilisateurs et sécurité';

  @override
  String get termsOfServicePara3_1 =>
      'Pour utiliser certaines fonctionnalités du service, vous devez vous connecter à l\'aide de Google OAuth. Vous êtes responsable du maintien de la sécurité des identifiants de votre compte et de toutes les activités qui se déroulent sous votre compte. Vous devez nous informer immédiatement de toute utilisation non autorisée de votre compte.';

  @override
  String get termsOfServiceTitle4 => '4. Intégration de Google Drive';

  @override
  String get termsOfServicePara4_1 =>
      'Notre service s\'intègre à Google Drive pour stocker vos fichiers APK téléchargés. En associant votre compte Google Drive, vous autorisez TestAPK à créer, lire et supprimer des fichiers dans le dossier spécifique créé par l\'application. Vous conservez la pleine propriété et le contrôle de tous les fichiers stockés sur votre Google Drive.';

  @override
  String get termsOfServiceTitle5 => '5. Utilisation acceptable';

  @override
  String get termsOfServicePara5_1 => 'Vous acceptez de ne pas utiliser le service pour :';

  @override
  String get termsOfServicePara5_2 =>
      '• Télécharger ou distribuer des logiciels malveillants, des virus ou tout code conçu pour endommager ou perturber les appareils.';

  @override
  String get termsOfServicePara5_3 => '• Enfreindre les droits de propriété intellectuelle d\'autrui.';

  @override
  String get termsOfServicePara5_4 =>
      '• Violer les lois locales, étatiques, nationales ou internationales applicables.';

  @override
  String get termsOfServicePara5_5 =>
      '• Tenter d\'obtenir un accès non autorisé au service ou à ses systèmes associés.';

  @override
  String get termsOfServiceTitle6 => '6. Limitation de responsabilité';

  @override
  String get termsOfServicePara6_1 =>
      'Dans la mesure maximale autorisée par la loi, TestAPK et ses développeurs ne seront pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ni de toute perte de bénéfices ou de revenus, qu\'ils soient encourus directement ou indirectement, ou de toute perte de données, d\'utilisation, de clientèle ou d\'autres pertes intangibles, résultant de votre utilisation du service.';

  @override
  String get termsOfServiceTitle7 => '7. Modification des conditions';

  @override
  String get termsOfServicePara7_1 =>
      'Nous nous réservons le droit de modifier ou de remplacer ces conditions d\'utilisation à tout moment. Nous vous informerons de tout changement en publiant les nouvelles conditions sur cette page. Votre utilisation continue du service après tout changement constitue votre acceptation des nouvelles conditions.';

  @override
  String get termsOfServiceTitle8 => '8. Nous contacter';

  @override
  String get termsOfServicePara8_1 =>
      'Si vous avez des questions concernant ces conditions d\'utilisation, veuillez nous contacter à subrata3250das@gmail.com.';
}
