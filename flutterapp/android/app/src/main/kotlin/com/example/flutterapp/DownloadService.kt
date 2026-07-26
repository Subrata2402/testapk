package com.testapk.app

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Binder
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat

class DownloadService : Service() {
    private val binder = LocalBinder()

    inner class LocalBinder : Binder() {
        fun getService(): DownloadService = this@DownloadService
    }

    override fun onBind(intent: Intent?): IBinder {
        return binder
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action
        val id = intent?.getIntExtra("id", 1) ?: 1
        val title = intent?.getStringExtra("title") ?: "Downloading"
        val contentText = intent?.getStringExtra("contentText") ?: ""
        val progress = intent?.getIntExtra("progress", 0) ?: 0
        val max = intent?.getIntExtra("max", 100) ?: 100
        val indeterminate = intent?.getBooleanExtra("indeterminate", false) ?: false

        if (action == "START" || action == "UPDATE") {
            showProgressNotification(id, title, contentText, progress, max, indeterminate)
        } else if (action == "STOP") {
            stopForeground(STOP_FOREGROUND_REMOVE)
            stopSelf()
        }

        return START_NOT_STICKY
    }

    private fun showProgressNotification(id: Int, title: String, contentText: String, progress: Int, max: Int, indeterminate: Boolean) {
        val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val channelId = "download_progress"

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "Download Progress",
                NotificationManager.IMPORTANCE_LOW
            )
            manager.createNotificationChannel(channel)
        }

        val builder = NotificationCompat.Builder(this, channelId)
            .setContentTitle(title)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setOngoing(true)
            .setOnlyAlertOnce(true)

        builder.setContentText(contentText)
        if (indeterminate) {
            builder.setProgress(0, 0, true)
        } else {
            builder.setProgress(max, progress, false)
        }

        startForeground(id, builder.build())
    }
}
