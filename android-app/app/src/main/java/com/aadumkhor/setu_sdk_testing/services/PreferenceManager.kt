package com.aadumkhor.setu_sdk_testing.services

import android.content.Context
import android.content.SharedPreferences
import kotlin.jvm.Synchronized

class PreferenceManager {
    fun setString(key: String?, value: String?) {
        preferences!!.edit().putString(key, value).apply()
    }

    fun getString(key: String?): String? {
        return preferences!!.getString(key, "")
    }

    companion object {
        private var INSTANCE: PreferenceManager? = null
        private var preferences: SharedPreferences? = null
        @Synchronized
        fun getInstance(context: Context): PreferenceManager? {
            if (INSTANCE == null) {
                INSTANCE = PreferenceManager()
                preferences = context.getSharedPreferences("userinfo3", Context.MODE_PRIVATE)
            }
            return INSTANCE
        }
    }
}