// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Spanish Castilian (`es`).
class AppLocalizationsEs extends AppLocalizations {
  AppLocalizationsEs([String locale = 'es']) : super(locale);

  @override
  String get loginErrorMsg => 'Error al iniciar sesión. Asegúrese de ser un evaluador registrado.';

  @override
  String get appName => 'TestAPK';

  @override
  String get loginSubtitle => 'Su puerta de acceso a las versiones beta';

  @override
  String get featureBetaTesting => 'Pruebas Beta';

  @override
  String get featureApkDownloads => 'Descargas de APK';

  @override
  String get featureReleaseNotes => 'Notas de Lanzamiento';

  @override
  String get featureVerifiedBuilds => 'Compilaciones Verificadas';

  @override
  String get featureSha256 => 'SHA-256 Verificado';

  @override
  String get infoTitleTesterAccess => 'Solo Acceso a Evaluadores';

  @override
  String get infoSubtitleTesterAccess => 'Solo los evaluadores invitados pueden acceder a los lanzamientos.';

  @override
  String get infoTitleSecureStorage => 'Almacenamiento en la Nube Seguro';

  @override
  String get infoSubtitleSecureStorage => 'APKs almacenados en Google Drive, entregados de forma segura.';

  @override
  String get infoTitleAlwaysUpToDate => 'Siempre Actualizado';

  @override
  String get infoSubtitleAlwaysUpToDate => 'Acceso instantáneo a las últimas compilaciones.';

  @override
  String get loginSigningIn => 'Iniciando sesión…';

  @override
  String get loginContinueWithGoogle => 'Continuar con Google';

  @override
  String get loginConfirmation => 'Al iniciar sesión, confirma que es un evaluador autorizado.';

  @override
  String get splashSubtitle => 'Gestor de Lanzamientos para Evaluadores';

  @override
  String get appListErrorFailedToLoad => 'Error al cargar los datos';

  @override
  String get appListErrorConnection => 'Error de conexión: ';

  @override
  String get inviteAcceptedMsg => '¡Invitación aceptada!';

  @override
  String get inviteAcceptFailedMsg => 'Error al aceptar la invitación';

  @override
  String get inviteRejectedMsg => 'Invitación rechazada';

  @override
  String get inviteRejectFailedMsg => 'Error al rechazar la invitación';

  @override
  String get errorPrefix => 'Error: ';

  @override
  String get appListEmptyTitle => 'Aún no has sido agregado\na ninguna aplicación.';

  @override
  String get appListEmptySubtitle => 'Pídele a un desarrollador que te invite como evaluador.';

  @override
  String get signOutTooltip => 'Cerrar sesión';

  @override
  String get labelLatestVersion => 'Última Versión';

  @override
  String get none => 'Ninguna';

  @override
  String get tabReleases => 'Lanzamientos';

  @override
  String get tabMembers => 'Miembros';

  @override
  String get noReleasesMsg => 'Aún no hay lanzamientos';

  @override
  String get teamMembersTitle => 'Miembros del Equipo';

  @override
  String get teamMembersSubtitle => 'Colaboradores invitados a esta aplicación.';

  @override
  String get noMembersMsg => 'Aún no hay miembros';

  @override
  String get buildPrefix => 'Compilación #';

  @override
  String get releaseDetailsTitle => 'Detalles del Lanzamiento';

  @override
  String get sectionDetails => 'DETALLES';

  @override
  String get sectionUploadedBy => 'SUBIDO POR';

  @override
  String get sectionReleaseNotes => 'NOTAS DE LANZAMIENTO';

  @override
  String get sectionPermissionsPrefix => 'PERMISOS (';

  @override
  String get unknownDate => 'Fecha desconocida';

  @override
  String get labelBuildNumber => 'Número de Compilación';

  @override
  String get labelMinSdk => 'SDK Mínimo';

  @override
  String get apiPrefix => 'API ';

  @override
  String get labelTargetSdk => 'SDK Objetivo';

  @override
  String get labelSize => 'Tamaño';

  @override
  String get downloadFailedMsg => 'Error de descarga (';

  @override
  String get downloadedMsg => 'Descargado: ';

  @override
  String get launchFailedMsg => 'Error al iniciar la aplicación';

  @override
  String get launchErrorMsg => 'Error al iniciar la aplicación: ';

  @override
  String get downloadingMsg => 'Descargando… ';

  @override
  String get installUpdateBtnLabel => 'Instalar Actualización';

  @override
  String get updateBtnLabel => 'Actualizar';

  @override
  String get openAppBtnLabel => 'Abrir Aplicación';

  @override
  String get installApkBtnLabel => 'Instalar APK';

  @override
  String get downloadApkBtnLabel => 'Descargar APK';

  @override
  String get retryBtnLabel => 'Reintentar';

  @override
  String get declineBtnLabel => 'Rechazar';

  @override
  String get acceptBtnLabel => 'Aceptar';

  @override
  String get errorInstallCancelled => 'Instalación cancelada: Por favor, conceda permiso para instalar la aplicación.';

  @override
  String get errorInstallConflictingVersion =>
      'Error de instalación: Ya existe una versión conflictiva de la aplicación instalada.';

  @override
  String get errorInstallInvalidApk => 'Error de instalación: El archivo APK no es válido o está dañado.';

  @override
  String get errorInstallInsufficientStorage =>
      'Error de instalación: Espacio de almacenamiento insuficiente en el dispositivo.';

  @override
  String get errorInstallStartFailed => 'Error al iniciar la instalación';

  @override
  String get errorInstallPrefix => 'Error de instalación: ';

  @override
  String get feedbackSubmitTitle => 'Enviar Comentarios';

  @override
  String get feedbackCategoryLabel => 'CATEGORÍA';

  @override
  String get feedbackRatingLabel => 'CALIFICACIÓN';

  @override
  String get feedbackTitleLabel => 'TÍTULO';

  @override
  String get feedbackDescriptionLabel => 'DESCRIPCIÓN';

  @override
  String get feedbackTitleHint => 'Breve resumen de sus comentarios';

  @override
  String get feedbackTitleRequired => 'El título es obligatorio';

  @override
  String get feedbackDescriptionHint => 'Proporcione detalles sobre su experiencia, error o solicitud de función...';

  @override
  String get feedbackDescriptionRequired => 'La descripción es obligatoria';

  @override
  String get feedbackSuccessMsg => '¡Gracias por sus comentarios!';

  @override
  String get feedbackErrorMsg => 'Error al enviar comentarios';

  @override
  String get supportTitle => 'Contactar al Soporte';

  @override
  String get supportSubjectLabel => 'ASUNTO';

  @override
  String get supportMessageLabel => 'ASUNTO';

  @override
  String get supportSubjectHint => '¿De qué se trata?';

  @override
  String get supportSubjectRequired => 'El asunto es obligatorio';

  @override
  String get supportMessageHint => 'Describa su problema o pregunta en detalle...';

  @override
  String get supportMessageRequired => 'El mensaje es obligatorio';

  @override
  String get supportSuccessMsg => '¡Solicitud de soporte enviada con éxito!';

  @override
  String get supportErrorMsg => 'Error al enviar la solicitud de soporte';

  @override
  String get aboutTitle => 'Acerca de TestAPK';

  @override
  String get aboutVersion => 'Versión 1.0.0+3';

  @override
  String get aboutDescription =>
      'Una plataforma moderna, segura y autohospedada para la gestión de lanzamientos de APK.';

  @override
  String get aboutPlatformInfoLabel => 'INFORMACIÓN DE LA PLATAFORMA';

  @override
  String get aboutSupportChannelsLabel => 'CANALES DE SOPORTE';

  @override
  String get aboutLaunchError => 'No se pudo iniciar ';

  @override
  String get labelSendFeedback => 'Enviar Comentarios';

  @override
  String get labelTermsOfService => 'Términos de Servicio';

  @override
  String get labelPrivacyPolicy => 'Política de Privacidad';

  @override
  String get labelAboutTestApk => 'Acerca de TestAPK';

  @override
  String get deleteAccountLabel => 'Eliminar Cuenta';

  @override
  String get profileTitle => 'Perfil';

  @override
  String get signOutLabel => 'Cerrar Sesión';

  @override
  String get signOutConfirmTitle => 'Cerrar Sesión';

  @override
  String get signOutConfirmMessage => '¿Está seguro de que desea cerrar sesión en su cuenta?';

  @override
  String get deleteLabel => 'Eliminar';

  @override
  String get deleteAccountConfirmTitle => '¿Eliminar Cuenta?';

  @override
  String get deleteAccountConfirmMessage =>
      '¿Está seguro de que desea eliminar su cuenta? Esta acción es permanente y no se puede deshacer.';

  @override
  String get deleteAccountSuccessMsg => 'Cuenta eliminada con éxito';

  @override
  String get deleteAccountErrorMsg => 'Error al eliminar la cuenta';

  @override
  String get errorUnexpected => 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.';

  @override
  String get errorTimeout => 'Tiempo de conexión agotado. Por favor, compruebe su conexión a internet.';

  @override
  String get errorSessionExpired => 'Sesión expirada. Por favor, inicie sesión de nuevo.';

  @override
  String get errorServerError => 'Error del servidor. Por favor, inténtelo de nuevo más tarde.';

  @override
  String get errorNoInternet => 'Sin conexión a internet. Por favor, compruebe la configuración de su red.';

  @override
  String get errorRequestCancelled => 'La solicitud fue cancelada.';

  @override
  String get errorRequestFailedPrefix => 'Solicitud fallida: ';

  @override
  String get errorBadRequest => 'Solicitud incorrecta. Por favor, compruebe su entrada.';

  @override
  String get errorForbidden => 'Acceso denegado. No tiene permiso para realizar esta acción.';

  @override
  String get selectLanguage => 'Seleccionar Idioma';

  @override
  String get saveLanguage => 'Guardar';

  @override
  String get english => 'Inglés';

  @override
  String get spanish => 'Español';

  @override
  String get portuguese => 'Portugués';

  @override
  String get hindi => 'Hindi';

  @override
  String get french => 'Francés';

  @override
  String get german => 'Alemán';

  @override
  String get japanese => 'Japonés';

  @override
  String get chinese => 'Chino';

  @override
  String get arabic => 'Árabe';

  @override
  String get cancel => 'Cancelar';

  @override
  String get pendingInvitationsPrefix => 'INVITACIONES PENDIENTES (';

  @override
  String get myApplications => 'MIS APLICACIONES';

  @override
  String get noApplicationsMsg => 'Aún no hay aplicaciones aceptadas.';

  @override
  String get changeLanguageTooltip => 'Cambiar Idioma';

  @override
  String get agreeToTermsPrefix => 'Al iniciar sesión, acepta nuestros ';

  @override
  String get agreeToTermsAnd => ' y ';

  @override
  String get agreeToTermsSuffix => '.';

  @override
  String get signingIn => 'Iniciando sesión...';

  @override
  String get continueWithGoogle => 'Continuar con Google';

  @override
  String get aboutWebDashboardTitle => 'Panel Web';

  @override
  String get aboutWebDashboardSubtitle =>
      'Almacenamiento en Google Drive, Gestión de Equipos, Historial de Lanzamientos';

  @override
  String get aboutFlutterClientTitle => 'Cliente Flutter';

  @override
  String get aboutFlutterClientSubtitle => 'Diseño Glassmorphic, Instalación con un Toque, Detección de Versiones';

  @override
  String get aboutCliToolTitle => 'Herramienta CLI';

  @override
  String get aboutCliToolSubtitle =>
      'Flujo de Autenticación de Dispositivos, Progreso en Tiempo Real, Estado de Carga en Drive';

  @override
  String get aboutEmailSupport => 'Soporte por Correo';

  @override
  String get aboutGithubIssues => 'Problemas de GitHub';

  @override
  String get aboutDiscordCommunity => 'Comunidad de Discord';

  @override
  String get feedbackCategoryBug => 'Error';

  @override
  String get feedbackCategoryFeature => 'Función';

  @override
  String get feedbackCategoryOther => 'Otro';

  @override
  String get feedbackRateUsQuestion => '¿Cómo nos calificaría?';

  @override
  String get feedbackSubmitButton => 'Enviar Comentarios';

  @override
  String get profileFullName => 'Nombre Completo';

  @override
  String get profileEmail => 'Correo Electrónico';

  @override
  String get profileRole => 'Rol';

  @override
  String get supportSubmitButton => 'Enviar Solicitud de Soporte';

  @override
  String get memberStatusPending => 'Pendiente';

  @override
  String get roleOwner => 'Propietario';

  @override
  String get roleDeveloper => 'Desarrollador';

  @override
  String get roleTester => 'Probador';

  @override
  String legalLastUpdated(String date) {
    return 'Última actualización: $date';
  }

  @override
  String get privacyPolicyLastUpdated => '18 de julio de 2026';

  @override
  String get privacyPolicyTitle1 => '1. Introducción';

  @override
  String get privacyPolicyPara1_1 =>
      'Bienvenido a TestAPK. Respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta Política de privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando utiliza nuestro panel web, la aplicación móvil y la interfaz de línea de comandos (CLI).';

  @override
  String get privacyPolicyTitle2 => '2. Información que recopilamos';

  @override
  String get privacyPolicyPara2_1 =>
      'Recopilamos información que usted nos proporciona directamente al utilizar nuestros servicios:';

  @override
  String get privacyPolicyPara2_2 =>
      '• Información de la cuenta: cuando inicia sesión con Google OAuth, recibimos su nombre, dirección de correo electrónico y foto de perfil.';

  @override
  String get privacyPolicyPara2_3 =>
      '• Integración con Google Drive: para habilitar el almacenamiento y la gestión de APK, nuestra aplicación solicita permiso para acceder a su Google Drive. Solo accedemos, creamos y modificamos archivos creados por o subidos a través de la aplicación TestAPK (utilizando el alcance drive.file). No accedemos ni leemos ningún otro archivo en su Google Drive.';

  @override
  String get privacyPolicyPara2_4 =>
      '• Metadatos de la aplicación: recopilamos metadatos sobre los archivos APK que sube (como el nombre del paquete, el código de versión, el nombre de la versión y las notas de la versión) para mostrarlos en su panel y en la aplicación móvil.';

  @override
  String get privacyPolicyTitle3 => '3. Cómo usamos su información';

  @override
  String get privacyPolicyPara3_1 => 'Utilizamos la información recopilada para los siguientes fines:';

  @override
  String get privacyPolicyPara3_2 => '• Para autenticar su identidad y gestionar su cuenta.';

  @override
  String get privacyPolicyPara3_3 =>
      '• Para facilitar la subida, almacenamiento y recuperación de archivos APK directamente hacia/desde su propio almacenamiento de Google Drive.';

  @override
  String get privacyPolicyPara3_4 =>
      '• Para mostrar el historial y los detalles de las versiones de la aplicación en su panel y cliente móvil.';

  @override
  String get privacyPolicyPara3_5 => '• Para dar soporte a los flujos de autenticación y subida de la herramienta CLI.';

  @override
  String get privacyPolicyTitle4 => '4. Intercambio y divulgación de datos';

  @override
  String get privacyPolicyPara4_1 =>
      'No vendemos, comercializamos ni compartimos sus datos personales o archivos de Google Drive con terceros. Todos los archivos APK se almacenan directamente en su propia cuenta de Google Drive. El servidor de TestAPK solo almacena metadatos (como IDs de archivos, números de versión y notas de la versión) para coordinar las descargas e instalaciones.';

  @override
  String get privacyPolicyTitle5 => '5. Seguridad de los datos';

  @override
  String get privacyPolicyPara5_1 =>
      'Implementamos medidas de seguridad estándar de la industria para proteger los metadatos de su cuenta y los tokens de autenticación. Sus tokens de Google OAuth se transmiten de forma segura y se almacenan mediante cifrado.';

  @override
  String get privacyPolicyTitle6 => '6. Sus derechos y opciones';

  @override
  String get privacyPolicyPara6_1 => 'Usted tiene el control total sobre sus datos:';

  @override
  String get privacyPolicyPara6_2 =>
      '• Puede desconectar su integración con Google Drive en cualquier momento a través de la configuración del panel.';

  @override
  String get privacyPolicyPara6_3 =>
      '• Puede revocar el acceso de TestAPK a su cuenta de Google por completo visitando la página de permisos de la cuenta de Google.';

  @override
  String get privacyPolicyPara6_4 =>
      '• Puede solicitar la eliminación de su cuenta de TestAPK y los metadatos asociados poniéndose en contacto con nosotros.';

  @override
  String get privacyPolicyTitle7 => '7. Contáctenos';

  @override
  String get privacyPolicyPara7_1 =>
      'Si tiene alguna pregunta o inquietud sobre esta Política de privacidad, comuníquese con nosotros en subrata3250das@gmail.com.';

  @override
  String get termsOfServiceLastUpdated => '18 de julio de 2026';

  @override
  String get termsOfServiceTitle1 => '1. Aceptación de los términos';

  @override
  String get termsOfServicePara1_1 =>
      'Al acceder o utilizar TestAPK, usted acepta estar sujeto a estos Términos de servicio. Si no está de acuerdo con estos términos, no utilice nuestros servicios.';

  @override
  String get termsOfServiceTitle2 => '2. Descripción del servicio';

  @override
  String get termsOfServicePara2_1 =>
      'TestAPK proporciona una plataforma para que los desarrolladores alojen, distribuyan y gestionen paquetes de aplicaciones Android (APK). El servicio incluye un panel web, un cliente móvil para pruebas/instalación y una interfaz de línea de comandos (CLI) para subidas automatizadas.';

  @override
  String get termsOfServiceTitle3 => '3. Cuentas de usuario y seguridad';

  @override
  String get termsOfServicePara3_1 =>
      'Para utilizar ciertas funciones del servicio, debe iniciar sesión con Google OAuth. Usted es responsable de mantener la seguridad de las credenciales de su cuenta y de todas las actividades que ocurran bajo su cuenta. Debe notificarnos de inmediato cualquier uso no autorizado de su cuenta.';

  @override
  String get termsOfServiceTitle4 => '4. Integración con Google Drive';

  @override
  String get termsOfServicePara4_1 =>
      'Nuestro servicio se integra con Google Drive para almacenar sus archivos APK subidos. Al vincular su cuenta de Google Drive, concede permiso a TestAPK para crear, leer y eliminar archivos dentro de la carpeta específica creada por la aplicación. Usted conserva la propiedad y el control total de todos los archivos almacenados en su Google Drive.';

  @override
  String get termsOfServiceTitle5 => '5. Uso aceptable';

  @override
  String get termsOfServicePara5_1 => 'Usted acepta no utilizar el servicio para:';

  @override
  String get termsOfServicePara5_2 =>
      '• Subir o distribuir software malicioso, virus o cualquier código diseñado para dañar o interrumpir dispositivos.';

  @override
  String get termsOfServicePara5_3 => '• Infringir los derechos de propiedad intelectual de terceros.';

  @override
  String get termsOfServicePara5_4 => '• Violar cualquier ley local, estatal, nacional o internacional aplicable.';

  @override
  String get termsOfServicePara5_5 =>
      '• Intentar obtener acceso no autorizado al servicio o a sus sistemas relacionados.';

  @override
  String get termsOfServiceTitle6 => '6. Limitación de responsabilidad';

  @override
  String get termsOfServicePara6_1 =>
      'En la máxima medida permitida por la ley, TestAPK y sus desarrolladores no serán responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo, ni de ninguna pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, o cualquier pérdida de datos, uso, fondo de comercio u otras pérdidas intangibles, que resulten de su uso del servicio.';

  @override
  String get termsOfServiceTitle7 => '7. Cambios en los términos';

  @override
  String get termsOfServicePara7_1 =>
      'Nos reservamos el derecho de modificar o reemplazar estos Términos de servicio en cualquier momento. Le notificaremos cualquier cambio publicando los nuevos términos en esta página. Su uso continuado del servicio después de cualquier cambio constituye la aceptación de los nuevos términos.';

  @override
  String get termsOfServiceTitle8 => '8. Contáctenos';

  @override
  String get termsOfServicePara8_1 =>
      'Si tiene alguna pregunta sobre estos Términos de servicio, comuníquese con nosotros en subrata3250das@gmail.com.';
}
