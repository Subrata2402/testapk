import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_core_platform_interface/test.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutterapp/main.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  setupFirebaseCoreMocks();

  setUpAll(() async {
    await Firebase.initializeApp();
  });

  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const TestApkApp());
    expect(find.byType(MaterialApp), findsOneWidget);
    await tester.pump(const Duration(milliseconds: 2000));
    await tester.pump();
  });
}
