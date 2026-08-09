// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Japanese (`ja`).
class AppLocalizationsJa extends AppLocalizations {
  AppLocalizationsJa([String locale = 'ja']) : super(locale);

  @override
  String get loginErrorMsg => 'サインインに失敗しました。登録済みのテスターであることを確認してください。';

  @override
  String get appName => 'TestAPK';

  @override
  String get loginSubtitle => 'ベータ版リリースへのゲートウェイ';

  @override
  String get featureBetaTesting => 'ベータテスト';

  @override
  String get featureApkDownloads => 'APKダウンロード';

  @override
  String get featureReleaseNotes => 'リリースノート';

  @override
  String get featureVerifiedBuilds => '検証済みビルド';

  @override
  String get featureSha256 => 'SHA-256検証済み';

  @override
  String get infoTitleTesterAccess => 'テスター専用アクセス';

  @override
  String get infoSubtitleTesterAccess => '招待されたテスターのみがアプリのリリースにアクセスできます。';

  @override
  String get infoTitleSecureStorage => '安全なクラウドストレージ';

  @override
  String get infoSubtitleSecureStorage => 'APKはGoogleドライブに保存され、安全に配信されます。';

  @override
  String get infoTitleAlwaysUpToDate => '常に最新';

  @override
  String get infoSubtitleAlwaysUpToDate => '最新のビルドに即座にアクセスできます。';

  @override
  String get loginSigningIn => 'サインイン中…';

  @override
  String get loginContinueWithGoogle => 'Googleで続行';

  @override
  String get loginConfirmation => 'サインインすることにより、承認されたテスターであることを確認したことになります。';

  @override
  String get splashSubtitle => 'テスター向けリリース管理ツール';

  @override
  String get appListErrorFailedToLoad => 'データの読み込みに失敗しました';

  @override
  String get appListErrorConnection => '接続エラー: ';

  @override
  String get inviteAcceptedMsg => '招待を承認しました！';

  @override
  String get inviteAcceptFailedMsg => '招待の承認に失敗しました';

  @override
  String get inviteRejectedMsg => '招待を辞退しました';

  @override
  String get inviteRejectFailedMsg => '招待の辞退に失敗しました';

  @override
  String get errorPrefix => 'エラー: ';

  @override
  String get appListEmptyTitle => 'まだどのアプリにも\n追加されていません。';

  @override
  String get appListEmptySubtitle => '開発者にテスターとして招待するよう依頼してください。';

  @override
  String get signOutTooltip => 'サインアウト';

  @override
  String get labelLatestVersion => '最新バージョン';

  @override
  String get none => 'なし';

  @override
  String get tabReleases => 'リリース';

  @override
  String get tabMembers => 'メンバー';

  @override
  String get noReleasesMsg => 'リリースはまだありません';

  @override
  String get teamMembersTitle => 'チームメンバー';

  @override
  String get teamMembersSubtitle => 'このアプリケーションに招待された共同作業者。';

  @override
  String get noMembersMsg => 'メンバーはまだいません';

  @override
  String get buildPrefix => 'ビルド #';

  @override
  String get releaseDetailsTitle => 'リリース詳細';

  @override
  String get sectionDetails => '詳細';

  @override
  String get sectionUploadedBy => 'アップロード者';

  @override
  String get sectionReleaseNotes => 'リリースノート';

  @override
  String get sectionPermissionsPrefix => '権限 (';

  @override
  String get unknownDate => '不明な日付';

  @override
  String get labelBuildNumber => 'ビルド番号';

  @override
  String get labelMinSdk => '最小SDK';

  @override
  String get apiPrefix => 'API ';

  @override
  String get labelTargetSdk => 'ターゲットSDK';

  @override
  String get labelSize => 'サイズ';

  @override
  String get downloadFailedMsg => 'ダウンロード失敗 (';

  @override
  String get downloadedMsg => 'ダウンロード完了: ';

  @override
  String get launchFailedMsg => 'アプリケーションの起動に失敗しました';

  @override
  String get launchErrorMsg => 'アプリ起動エラー: ';

  @override
  String get downloadingMsg => 'ダウンロード中… ';

  @override
  String get installUpdateBtnLabel => 'アップデートをインストール';

  @override
  String get updateBtnLabel => 'アップデート';

  @override
  String get openAppBtnLabel => 'アプリを開く';

  @override
  String get installApkBtnLabel => 'APKをインストール';

  @override
  String get downloadApkBtnLabel => 'APKをダウンロード';

  @override
  String get retryBtnLabel => '再試行';

  @override
  String get declineBtnLabel => '辞退';

  @override
  String get acceptBtnLabel => '承認';

  @override
  String get errorInstallCancelled =>
      'インストールがキャンセルされました: アプリをインストールする権限を許可してください。';

  @override
  String get errorInstallConflictingVersion =>
      'インストールに失敗しました: 競合するバージョンのアプリが既にインストールされています。';

  @override
  String get errorInstallInvalidApk => 'インストールに失敗しました: APKファイルが無効か破損しています。';

  @override
  String get errorInstallInsufficientStorage =>
      'インストールに失敗しました: デバイスの空き容量が不足しています。';

  @override
  String get errorInstallStartFailed => 'インストールの開始に失敗しました';

  @override
  String get errorInstallPrefix => 'インストールエラー: ';

  @override
  String get feedbackSubmitTitle => 'フィードバックを送信';

  @override
  String get feedbackCategoryLabel => 'カテゴリ';

  @override
  String get feedbackRatingLabel => '評価';

  @override
  String get feedbackTitleLabel => 'タイトル';

  @override
  String get feedbackDescriptionLabel => '説明';

  @override
  String get feedbackTitleHint => 'フィードバックの簡単な要約';

  @override
  String get feedbackTitleRequired => 'タイトルは必須です';

  @override
  String get feedbackDescriptionHint => '体験、バグ、または機能のリクエストに関する詳細を入力してください...';

  @override
  String get feedbackDescriptionRequired => '説明は必須です';

  @override
  String get feedbackSuccessMsg => 'フィードバックをお寄せいただきありがとうございます！';

  @override
  String get feedbackErrorMsg => 'フィードバックの送信に失敗しました';

  @override
  String get supportTitle => 'サポートにお問い合わせ';

  @override
  String get supportSubjectLabel => '件名';

  @override
  String get supportMessageLabel => 'メッセージ';

  @override
  String get supportSubjectHint => 'どのような件についてですか？';

  @override
  String get supportSubjectRequired => '件名は必須です';

  @override
  String get supportMessageHint => '問題または質問の詳細を説明してください...';

  @override
  String get supportMessageRequired => 'メッセージは必須です';

  @override
  String get supportSuccessMsg => 'サポートリクエストが正常に送信されました！';

  @override
  String get supportErrorMsg => 'サポートリクエストの送信に失敗しました';

  @override
  String get aboutTitle => 'TestAPKについて';

  @override
  String get aboutVersion => 'バージョン 1.0.0+3';

  @override
  String get aboutDescription => 'モダンで安全なセルフホスト型APKリリース管理プラットフォーム。';

  @override
  String get aboutPlatformInfoLabel => 'プラットフォーム情報';

  @override
  String get aboutSupportChannelsLabel => 'サポートチャネル';

  @override
  String get aboutLaunchError => '起動できませんでした ';

  @override
  String get labelSendFeedback => 'フィードバックを送信';

  @override
  String get labelTermsOfService => '利用規約';

  @override
  String get labelPrivacyPolicy => 'プライバシーポリシー';

  @override
  String get labelAboutTestApk => 'TestAPKについて';

  @override
  String get deleteAccountLabel => 'アカウントを削除';

  @override
  String get profileTitle => 'プロフィール';

  @override
  String get signOutLabel => 'サインアウト';

  @override
  String get signOutConfirmTitle => 'サインアウト';

  @override
  String get signOutConfirmMessage => 'アカウントからサインアウトしてもよろしいですか？';

  @override
  String get deleteLabel => '削除';

  @override
  String get deleteAccountConfirmTitle => 'アカウントを削除しますか？';

  @override
  String get deleteAccountConfirmMessage =>
      'アカウントを削除してもよろしいですか？この操作は永続的であり、元に戻すことはできません。';

  @override
  String get deleteAccountSuccessMsg => 'アカウントが正常に削除されました';

  @override
  String get deleteAccountErrorMsg => 'アカウントの削除に失敗しました';

  @override
  String get errorUnexpected => '予期しないエラーが発生しました。もう一度お試しください。';

  @override
  String get errorTimeout => '接続がタイムアウトしました。インターネット接続を確認してください。';

  @override
  String get errorSessionExpired => 'セッションの有効期限が切れました。もう一度サインインしてください。';

  @override
  String get errorServerError => 'サーバーエラーが発生しました。後でもう一度お試しください。';

  @override
  String get errorNoInternet => 'インターネットに接続されていません。ネットワーク設定を確認してください。';

  @override
  String get errorRequestCancelled => 'リクエストがキャンセルされました。';

  @override
  String get errorRequestFailedPrefix => 'リクエスト失敗: ';

  @override
  String get errorBadRequest => '不正なリクエストです。入力内容を確認してください。';

  @override
  String get errorForbidden => 'アクセスが拒否されました。この操作を実行する権限がありません。';

  @override
  String get selectLanguage => '言語を選択';

  @override
  String get saveLanguage => '保存';

  @override
  String get english => '英語';

  @override
  String get spanish => 'スペイン語';

  @override
  String get portuguese => 'ポルトガル語';

  @override
  String get hindi => 'ヒンディー語';

  @override
  String get french => 'フランス語';

  @override
  String get german => 'ドイツ語';

  @override
  String get japanese => '日本語';

  @override
  String get chinese => '中国語';

  @override
  String get arabic => 'アラビア語';

  @override
  String get cancel => 'キャンセル';

  @override
  String get pendingInvitationsPrefix => '保留中の招待 (';

  @override
  String get myApplications => 'マイアプリケーション';

  @override
  String get noApplicationsMsg => '承認されたアプリケーションはまだありません。';

  @override
  String get changeLanguageTooltip => '言語を変更';

  @override
  String get agreeToTermsPrefix => 'サインインすることにより、当社の ';

  @override
  String get agreeToTermsAnd => ' および ';

  @override
  String get agreeToTermsSuffix => ' に同意したことになります。';

  @override
  String get signingIn => 'サインイン中...';

  @override
  String get continueWithGoogle => 'Googleで続行';

  @override
  String get aboutWebDashboardTitle => 'Webダッシュボード';

  @override
  String get aboutWebDashboardSubtitle => 'Googleドライブストレージ、チーム管理、リリース履歴';

  @override
  String get aboutFlutterClientTitle => 'Flutterクライアント';

  @override
  String get aboutFlutterClientSubtitle => 'グラスモルフィックUI、ワンタップインストール、バージョン検出';

  @override
  String get aboutCliToolTitle => 'CLIツール';

  @override
  String get aboutCliToolSubtitle => 'デバイス認証フロー、リアルタイムの進行状況、ドライブアップロードステータス';

  @override
  String get aboutEmailSupport => 'メールサポート';

  @override
  String get aboutGithubIssues => 'GitHubイシュー';

  @override
  String get aboutDiscordCommunity => 'Discordコミュニティ';

  @override
  String get feedbackCategoryBug => 'バグ';

  @override
  String get feedbackCategoryFeature => '機能';

  @override
  String get feedbackCategoryOther => 'その他';

  @override
  String get feedbackRateUsQuestion => '評価をお願いします';

  @override
  String get feedbackSubmitButton => 'フィードバックを送信';

  @override
  String get profileFullName => 'フルネーム';

  @override
  String get profileEmail => 'メールアドレス';

  @override
  String get profileRole => '役割';

  @override
  String get supportSubmitButton => 'サポートリクエストを送信';

  @override
  String get memberStatusPending => '保留中';

  @override
  String get roleOwner => 'オーナー';

  @override
  String get roleDeveloper => '開発者';

  @override
  String get roleTester => 'テスター';

  @override
  String legalLastUpdated(String date) {
    return '最終更新日: $date';
  }

  @override
  String get privacyPolicyLastUpdated => '2026年7月18日';

  @override
  String get privacyPolicyTitle1 => '1. はじめに';

  @override
  String get privacyPolicyPara1_1 =>
      'TestAPKへようこそ。私たちはあなたのプライバシーを尊重し、個人データの保護に努めています。このプライバシーポリシーは、当社のWebダッシュボード、モバイルアプリケーション、およびコマンドラインインターフェイス（CLI）を使用する際に、当社がお客様の情報をどのように収集、使用、開示、および保護するかについて説明するものです。';

  @override
  String get privacyPolicyTitle2 => '2. 収集する情報';

  @override
  String get privacyPolicyPara2_1 => '当社は、お客様が当社のサービスを利用する際に直接提供する情報を収集します。';

  @override
  String get privacyPolicyPara2_2 =>
      '• アカウント情報: Google OAuthを使用してサインインすると、名前、メールアドレス、プロフィール写真が提供されます。';

  @override
  String get privacyPolicyPara2_3 =>
      '• Googleドライブの統合: APKの保存と管理を有効にするために、当社のアプリケーションはGoogleドライブへのアクセス許可を要求します。当社は、TestAPKアプリケーションによって作成された、またはTestAPKアプリケーションを介してアップロードされたファイル（drive.fileスコープを使用）のみにアクセス、作成、および変更します。Googleドライブ内の他のファイルにはアクセスも読み取りもしません。';

  @override
  String get privacyPolicyPara2_4 =>
      '• アプリケーションのメタデータ: アップロードされたAPKファイルに関するメタデータ（パッケージ名、バージョンコード、バージョン名、リリースノートなど）を収集し、ダッシュボードとモバイルアプリに表示します。';

  @override
  String get privacyPolicyTitle3 => '3. 情報の使用方法';

  @override
  String get privacyPolicyPara3_1 => '収集した情報は、以下の目的で使用されます。';

  @override
  String get privacyPolicyPara3_2 => '• 本人確認およびアカウント管理のため。';

  @override
  String get privacyPolicyPara3_3 =>
      '• お客様自身のGoogleドライブストレージへのAPKファイルのアップロード、保存、および取得を容易にするため。';

  @override
  String get privacyPolicyPara3_4 =>
      '• ダッシュボードおよびモバイルクライアントにアプリケーションのリリース履歴と詳細を表示するため。';

  @override
  String get privacyPolicyPara3_5 => '• CLIツールの認証およびアップロードフローをサポートするため。';

  @override
  String get privacyPolicyTitle4 => '4. データの共有と開示';

  @override
  String get privacyPolicyPara4_1 =>
      '当社は、お客様の個人データやGoogleドライブのファイルを第三者に販売、取引、または共有することはありません。すべてのAPKファイルは、お客様自身のGoogleドライブアカウントに直接保存されます。TestAPKサーバーは、ダウンロードとインストールを調整するためにメタデータ（ファイルID、バージョン番号、リリースノートなど）のみを保存します。';

  @override
  String get privacyPolicyTitle5 => '5. データのセキュリティ';

  @override
  String get privacyPolicyPara5_1 =>
      '当社は、アカウントのメタデータと認証トークンを保護するために、業界標準のセキュリティ対策を実装しています。Google OAuthトークンは安全に送信され、暗号化されて保存されます。';

  @override
  String get privacyPolicyTitle6 => '6. お客様の権利と選択肢';

  @override
  String get privacyPolicyPara6_1 => 'お客様はご自身のデータを完全に制御できます。';

  @override
  String get privacyPolicyPara6_2 => '• ダッシュボードの設定から、いつでもGoogleドライブの統合を切断できます。';

  @override
  String get privacyPolicyPara6_3 =>
      '• Googleアカウントの権限ページにアクセスして、GoogleアカウントへのTestAPKのアクセス権を完全に無効にすることができます。';

  @override
  String get privacyPolicyPara6_4 =>
      '• お問い合わせいただくことで、TestAPKアカウントおよび関連するメタデータの削除をリクエストできます。';

  @override
  String get privacyPolicyTitle7 => '7. お問い合わせ';

  @override
  String get privacyPolicyPara7_1 =>
      'このプライバシーポリシーに関するご質問やご不明な点がございましたら、subrata3250das@gmail.comまでお問い合わせください。';

  @override
  String get termsOfServiceLastUpdated => '2026年7月18日';

  @override
  String get termsOfServiceTitle1 => '1. 規約への同意';

  @override
  String get termsOfServicePara1_1 =>
      'TestAPKにアクセスまたは使用することにより、これらの利用規約に同意したことになります。これらの規約に同意しない場合は、当社のサービスを使用しないでください。';

  @override
  String get termsOfServiceTitle2 => '2. サービスの説明';

  @override
  String get termsOfServicePara2_1 =>
      'TestAPKは、開発者がAndroidアプリケーションパッケージ（APK）をホスト、配布、および管理するためのプラットフォームを提供します。サービスには、Webダッシュボード、テスト/インストール用のモバイルクライアント、および自動アップロード用のコマンドラインインターフェイス（CLI）が含まれます。';

  @override
  String get termsOfServiceTitle3 => '3. ユーザーアカウントとセキュリティ';

  @override
  String get termsOfServicePara3_1 =>
      'サービスの一部機能を使用するには、Google OAuthを使用してサインインする必要があります。アカウント資格情報のセキュリティを維持すること、およびアカウントの下で行われるすべての活動について、お客様が責任を負います。アカウントの不正使用に気付いた場合は、直ちに当社に通知する必要があります。';

  @override
  String get termsOfServiceTitle4 => '4. Googleドライブの統合';

  @override
  String get termsOfServicePara4_1 =>
      '当社のサービスはGoogleドライブと統合され、アップロードされたAPKファイルを保存します。Googleドライブアカウントをリンクすることにより、アプリケーションによって作成された特定のフォルダー内のファイルを作成、読み取り、および削除する権限をTestAPKに付与したことになります。Googleドライブに保存されているすべてのファイルの完全な所有権と制御権は、お客様が保持します。';

  @override
  String get termsOfServiceTitle5 => '5. 許容される使用方法';

  @override
  String get termsOfServicePara5_1 => 'お客様は、以下の目的でサービスを使用しないことに同意します。';

  @override
  String get termsOfServicePara5_2 =>
      '• 悪意のあるソフトウェア、ウイルス、またはデバイスに損害を与えたり妨害したりするように設計されたコードをアップロードまたは配布すること。';

  @override
  String get termsOfServicePara5_3 => '• 他者の知的財産権を侵害すること。';

  @override
  String get termsOfServicePara5_4 => '• 適用されるローカル、州、国内、または国際的な法律に違反すること。';

  @override
  String get termsOfServicePara5_5 => '• サービスまたはその関連システムへの不正アクセスを試みること。';

  @override
  String get termsOfServiceTitle6 => '6. 免責事項';

  @override
  String get termsOfServicePara6_1 =>
      '法律で認められる最大限の範囲において、TestAPKおよびその開発者は、サービスの使用に起因する間接的、偶発的、特別、結果的、または懲罰的な損害、あるいは直接的または間接的に発生した利益または収益の損失、あるいはデータ、使用、営業権、またはその他の無形の損失について責任を負わないものとします。';

  @override
  String get termsOfServiceTitle7 => '7. 規約の変更';

  @override
  String get termsOfServicePara7_1 =>
      '当社は、いつでもこれらの利用規約を変更または置き換える権利を留保します。変更がある場合は、このページに新しい規約を掲載することでお知らせします。変更の掲載後もサービスの使用を継続することは、新しい規約に同意したことになります。';

  @override
  String get termsOfServiceTitle8 => '8. お問い合わせ';

  @override
  String get termsOfServicePara8_1 =>
      'これらの利用規約についてご質問がある場合は、subrata3250das@gmail.comまでお問い合わせください。';
}
