import 'dart:developer' as developer;
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:testapk/core/api_service.dart';
import 'package:testapk/core/storage_service.dart';
import 'package:testapk/models/user_model.dart';
import 'package:testapk/notification_manager.dart';

class AuthService {
  AuthService._();
  static final AuthService instance = AuthService._();

  final _firebaseAuth = FirebaseAuth.instance;

  UserModel? _currentUser;
  UserModel? get currentUser => _currentUser;

  Future<UserModel?> signInWithGoogle() async {
    try {
      final googleProvider = GoogleAuthProvider();
      googleProvider.addScope('email');
      googleProvider.addScope('profile');

      final userCredential = await _firebaseAuth.signInWithProvider(googleProvider);
      
      final credential = userCredential.credential;
      String? idToken;
      if (credential is OAuthCredential) {
        idToken = credential.idToken;
      }
      idToken ??= await userCredential.user?.getIdToken();

      if (idToken == null) {
        developer.log('Google Sign-In failed: No ID token received');
        return null;
      }

      developer.log('Firebase Auth Sign-In success: ${userCredential.user?.email}');

      // Exchange idToken for our JWT
      final response = await ApiService.instance.loginWithGoogle(idToken);

      if (response.statusCode == 200) {
        final body = response.data as Map<String, dynamic>;
        final token = body['token'] as String;
        await StorageService.instance.saveToken(token);

        // Fetch updated user details from /users/me
        try {
          final profileResponse = await ApiService.instance.getUserProfile();
          if (profileResponse.statusCode == 200) {
            final profileBody = profileResponse.data as Map<String, dynamic>;
            _currentUser = UserModel.fromJson(profileBody['data']['user'] as Map<String, dynamic>);
          } else {
            _currentUser = UserModel.fromJson(body['data']['user'] as Map<String, dynamic>);
          }
        } catch (e) {
          developer.log('Error fetching user profile', error: e);
          _currentUser = UserModel.fromJson(body['data']['user'] as Map<String, dynamic>);
        }

        // Send FCM token to server
        await NotificationManager.sendTokenToServer();
        return _currentUser;
      }
      return null;
    } catch (e) {
      developer.log('Google Sign-In Error', error: e);
      return null;
    }
  }

  Future<UserModel?> tryAutoLogin() async {
    final token = await StorageService.instance.getToken();
    if (token == null) return null;

    try {
      final response = await ApiService.instance.getUserProfile();
      if (response.statusCode == 200) {
        final body = response.data as Map<String, dynamic>;
        _currentUser = UserModel.fromJson(body['data']['user'] as Map<String, dynamic>);
        // Send FCM token to server
        await NotificationManager.sendTokenToServer();
        return _currentUser;
      }
    } catch (e) {
      developer.log('Error in auto-login', error: e);
    }
    // Token invalid/expired – clear it
    await StorageService.instance.deleteToken();
    developer.log('Auto-login failed: Token invalid or expired');
    return null;
  }

  Future<void> signOut({bool localOnly = false}) async {
    if (!localOnly) {
      try {
        final token = await FirebaseMessaging.instance.getToken();
        developer.log('Sending FCM token to server for logout: $token');
        await ApiService.instance.logout(token);
      } catch (e) {
        developer.log('Error during sign-out', error: e);
      }
    }
    await _firebaseAuth.signOut();
    await StorageService.instance.deleteToken();
    _currentUser = null;
  }
}
