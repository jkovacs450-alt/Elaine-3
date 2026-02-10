package com.example.a3

import android.app.WallpaperManager
import android.graphics.BitmapFactory
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import java.lang.Exception

class MainActivity : AppCompatActivity() {

    // Merker: Welches Bild ist als nächstes dran?
    private var useFirstWallpaper = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnSetWallpaper = findViewById<Button>(R.id.btnSetWallpaper)

        btnSetWallpaper.setOnClickListener {
            Toast.makeText(this, "Huso", Toast.LENGTH_LONG).show()
            Log.d("MyApp", "lol")
            setAlternatingWallpaper()
        }
    }

    private fun setAlternatingWallpaper() {
        val wallpaperManager = WallpaperManager.getInstance(this)

        // Entscheiden, welches Bild wir nehmen
        val drawableId = if (useFirstWallpaper) {
            R.drawable.bg_test_one   // erstes Bild
        } else {
            R.drawable.bg_test_two   // zweites Bild
        }

        // Beim nächsten Klick soll das andere Bild dran sein
        useFirstWallpaper = !useFirstWallpaper

        val bitmap = BitmapFactory.decodeResource(resources, drawableId)

        try {
            wallpaperManager.setBitmap(bitmap)
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e("MyApp", "Fehler beim Setzen des Wallpapers: ${e.message}")
        }
    }
    private fun loadScaledBitmap(resID: Int):
            android.graphics.Bitmap {

        val options = BitmapFactory.Options().apply {

            inJustDecodeBounds = true
        }
        BitmapFactory.decodeResource(resources, resID,options)

        options.inJustDecodeBounds = false
        options.inSampleSize = 4

        return BitmapFactory.decodeResource(resources, resID, options)
    }
}