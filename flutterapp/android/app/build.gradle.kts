plugins {
    id("com.android.application")
    // START: FlutterFire Configuration
    id("com.google.gms.google-services")
    id("com.google.firebase.crashlytics")
    // END: FlutterFire Configuration
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.testapk.app"
    compileSdk = 37
    ndkVersion = flutter.ndkVersion

    flavorDimensions += "default"

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildFeatures {
        buildConfig = true
        resValues = true
    }

    defaultConfig {
        applicationId = "com.testapk.app"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    productFlavors {
        create("dev") {
            dimension = "default"
            resValue("string", "app_name", "TestAPK")
            buildConfigField("String", "BASE_URL", "\"https://testapkapi.clipboux.online/api/v1\"")
        }
        create("local") {
            dimension = "default"
            resValue("string", "app_name", "TestAPK")
            buildConfigField("String", "BASE_URL", "\"http://10.0.2.2:3000/api/v1\"")
        }
        create("prod") {
            dimension = "default"
            resValue("string", "app_name", "TestAPK")
            buildConfigField("String", "BASE_URL", "\"https://testapkapi.clipboux.online/api/v1\"")
        }
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = signingConfigs.getByName("debug")
        }
    }
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

flutter {
    source = "../.."
}
