import 'package:flutter/services.dart';
import 'package:flutterapp/core/constants.dart';

class ConfigService {
  static const MethodChannel _channel = MethodChannel(kMethodChannelName);

  static Future<void> getBaseUrl() async {
    try {
      final String baseUrl = await _channel.invokeMethod("getBaseUrl");
      kApiBaseUrl = baseUrl;
    } catch (e) {
      throw Exception("Failed to get base URL: $e");
    }
  }
}
