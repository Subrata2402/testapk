import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class StorageService {
  StorageService._();
  static final StorageService instance = StorageService._();

  final _storage = const FlutterSecureStorage();

  static const _tokenKey = 'jwt_token';
  static const _languageKey = 'selected_language';

  Future<void> saveToken(String token) => _storage.write(key: _tokenKey, value: token);

  Future<String?> getToken() => _storage.read(key: _tokenKey);

  Future<void> deleteToken() => _storage.delete(key: _tokenKey);

  Future<void> saveLanguage(String languageCode) => _storage.write(key: _languageKey, value: languageCode);

  Future<String?> getLanguage() => _storage.read(key: _languageKey);
}
