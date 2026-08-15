import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutterapp/core/constants.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:flutterapp/widgets/custom_snack_bar.dart';
import 'package:flutterapp/core/storage_service.dart';
import 'package:flutterapp/core/navigation.dart';
import 'package:flutterapp/presentations/maintenance/screens/maintenance_screen.dart';

class ApiClient {
  late final Dio _dio;
  Future<void> Function()? onUnauthorized;

  ApiClient._() {
    _dio = Dio(
      BaseOptions(
        baseUrl: kApiBaseUrl,
        connectTimeout: const Duration(seconds: 15),
        receiveTimeout: const Duration(seconds: 15),
        headers: {'Content-Type': 'application/json'},
      ),
    );

    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await StorageService.instance.getToken();
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          final language = await StorageService.instance.getLanguage();
          if (language != null) {
            options.headers['Accept-Language'] = language;
          }
          return handler.next(options);
        },
        onError: (DioException e, handler) async {
          if (e.response?.statusCode == 503 || (e.response?.data is Map && e.response?.data['maintenance'] == true)) {
            navigatorKey.currentState?.pushAndRemoveUntil(
              MaterialPageRoute(builder: (_) => const MaintenanceScreen()),
              (route) => false,
            );
          }
          if (e.response?.statusCode == 401) {
            if (onUnauthorized != null) {
              await onUnauthorized!();
            }
          }
          _handleDioError(e);
          return handler.next(e);
        },
      ),
    );

    _dio.interceptors.add(
      PrettyDioLogger(
        requestHeader: true,
        requestBody: true,
        responseBody: true,
        responseHeader: false,
        error: true,
        compact: true,
        maxWidth: 90,
      ),
    );
  }

  static final ApiClient instance = ApiClient._();

  String get baseUrl => kApiBaseUrl;

  Dio get dio => _dio;

  Future<Response> get(String path) async {
    return _dio.get(path);
  }

  Future<Response> post(String path, Map<String, dynamic> body) async {
    return _dio.post(path, data: body);
  }

  Future<Response> delete(String path) async {
    return _dio.delete(path);
  }

  void _handleDioError(DioException e) {
    String errorMessage = kErrorUnexpected;

    if (e.response != null) {
      final statusCode = e.response!.statusCode;
      if (statusCode == 503) {
        return;
      }
      if (statusCode == 401) {
        errorMessage = kErrorSessionExpired;
      } else if (statusCode == 400) {
        if (e.response?.data is Map<String, dynamic>) {
          final data = e.response!.data as Map<String, dynamic>;
          errorMessage = data['message'] ?? data['error'] ?? kErrorBadRequest;
        } else {
          errorMessage = kErrorBadRequest;
        }
      } else if (statusCode == 403) {
        if (e.response?.data is Map<String, dynamic>) {
          final data = e.response!.data as Map<String, dynamic>;
          errorMessage = data['message'] ?? data['error'] ?? kErrorForbidden;
        } else {
          errorMessage = kErrorForbidden;
        }
      } else if (statusCode != null && statusCode >= 500) {
        errorMessage = kErrorServerError;
      } else if (e.response?.data is Map<String, dynamic>) {
        final data = e.response!.data as Map<String, dynamic>;
        errorMessage = data['message'] ?? data['error'] ?? '$kErrorRequestFailedPrefix$statusCode';
      } else {
        errorMessage = '$kErrorRequestFailedPrefix$statusCode';
      }
    } else {
      switch (e.type) {
        case DioExceptionType.connectionTimeout:
        case DioExceptionType.sendTimeout:
        case DioExceptionType.receiveTimeout:
          errorMessage = kErrorTimeout;
          break;
        case DioExceptionType.connectionError:
          errorMessage = kErrorNoInternet;
          break;
        case DioExceptionType.cancel:
          errorMessage = kErrorRequestCancelled;
          break;
        case DioExceptionType.unknown:
        default:
          if (e.error is SocketException) {
            errorMessage = kErrorNoInternet;
          } else {
            errorMessage = e.message ?? kErrorUnexpected;
          }
          break;
      }
    }

    final context = navigatorKey.currentContext;
    final overlayState = navigatorKey.currentState?.overlay;
    if (context != null) {
      CustomSnackBar.show(context, errorMessage, type: CustomSnackBarType.error, overlayState: overlayState);
    }
  }
}
