package com.aadumkhor.setu_sdk_testing

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import com.aadumkhor.setu_sdk_testing.models.Amount
import com.aadumkhor.setu_sdk_testing.models.GenerateDeeplinksRequest
import com.aadumkhor.setu_sdk_testing.models.GenerateTokenRequest
import com.aadumkhor.setu_sdk_testing.services.PreferenceManager
import com.aadumkhor.setu_sdk_testing.services.UPIDeeplinks
import kotlinx.coroutines.*
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.net.URL

class MainActivity : AppCompatActivity() {
    companion object {
        const val DEBUG_TAG = "retrofit-debug"
        private val coroutineExceptionHandler = CoroutineExceptionHandler { _, throwable ->
            throwable.printStackTrace()
        }
        val baseURL: URL = URL("https://prod.setu.co")


        // SANDBOX CREDS
//        const val CLIENT_ID = "2e532982-f25f-48a3-9e2d-63a8540d0419"
//        const val SECRET = "7469778b-bcbc-4357-981a-5d59bbe26f83"

        //        PRODUCTION CREDS
        const val CLIENT_ID = BuildConfig.CLIENT_ID
        const val SECRET = BuildConfig.SECRET
        const val PRODUCT_INSTANCE_ID = BuildConfig.PRODUCT_INSTANCE_ID
        const val VERSION = "v2"

//        const val PRODUCT_INSTANCE_ID = "948319124583351510"

        // lateinit vars
        lateinit var preferenceManager: PreferenceManager
        lateinit var retrofit: Retrofit
        lateinit var deeplinksService: UPIDeeplinks
    }

    private val getUpiResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) {
            if (it.resultCode == RESULT_OK) {
                Toast.makeText(applicationContext, "Got result from activity", Toast.LENGTH_SHORT)
                    .show()
            } else {
                Toast.makeText(
                    applicationContext,
                    "Some problem getting result from activity",
                    Toast.LENGTH_SHORT
                )
                    .show()
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val generateToken: Button = findViewById(R.id.button_generate_token)
        val generateDeeplink: Button = findViewById(R.id.button_generate_deeplink)
        preferenceManager = PreferenceManager.getInstance(applicationContext)!!
        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.BODY
        val client = OkHttpClient.Builder().addInterceptor(interceptor).build()

        retrofit = Retrofit.Builder()
            .baseUrl(baseURL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()

        deeplinksService = retrofit.create(UPIDeeplinks::class.java)

        generateToken.setOnClickListener {
            getOAuthToken()
        }

        generateDeeplink.setOnClickListener {
            sendDeeplinkRequest()
        }

    }

    private fun getOAuthToken() {
        var token: String? = null
        Toast.makeText(applicationContext, "Generating token", Toast.LENGTH_SHORT).show()

        CoroutineScope(Dispatchers.IO + coroutineExceptionHandler).launch {
            val response = deeplinksService.generateOAuthToken(
                GenerateTokenRequest(
                    clientID = CLIENT_ID,
                    secret = SECRET
                )
            )

            withContext(Dispatchers.Main) {
                if (response.isSuccessful) {
                    val body = response.body()
                    token = body?.data?.token

                    Log.d(DEBUG_TAG, "Token: $token")

                    // show status of token
                    tokenToast(token)

                    // store it locally
                    storeTokenLocally(token)
                } else {
                    Toast.makeText(
                        applicationContext,
                        "Error while generating tokens",
                        Toast.LENGTH_SHORT
                    ).show()
                    Log.d(DEBUG_TAG, response.toString())
                }
            }
        }
    }

    private fun sendDeeplinkRequest() {
        Toast.makeText(applicationContext, "Generating deeplink", Toast.LENGTH_SHORT).show()

        val token: String? = preferenceManager.getString("token")
        val authToken = "Bearer $token"

        Log.d(DEBUG_TAG, "Authorization: $authToken")

        CoroutineScope(Dispatchers.IO + coroutineExceptionHandler).launch {
            val response = deeplinksService.generatePaymentLink(
                version = VERSION,
                productInstanceID = PRODUCT_INSTANCE_ID,
                contentType = "application/json",
                token = authToken,
                request = GenerateDeeplinksRequest(
                    amount = Amount(currencyCode = "INR", value = 100),
                    amountExactness = "EXACT",
                    billerBillID = "123454321",
                    expiryDate = "2022-07-31T00:00:00Z",
                    name = "Setu SDK Test",
                )
            )

            withContext(Dispatchers.Main) {
                when {
                    response.isSuccessful -> {
                        val body = response.body()

                        Log.d(DEBUG_TAG, body.toString())

                        val upiIntent = Intent(Intent.ACTION_VIEW)
                        upiIntent.data = Uri.parse(body!!.data.paymentLink.upiLink)
//                        val chooser = Intent.createChooser(upiIntent, "Make payment with...")
//                        startActivityForResult(chooser, 1, null);
                        getUpiResult.launch(upiIntent)
                    }
                    response.code() == 401 -> {
                        Toast.makeText(
                            applicationContext,
                            "Unauthenticated request",
                            Toast.LENGTH_SHORT
                        ).show()
                        Log.d(DEBUG_TAG, response.toString())
                    }
                    else -> {
                        Toast.makeText(
                            applicationContext,
                            "Some other error",
                            Toast.LENGTH_SHORT
                        ).show()
                        Log.d(DEBUG_TAG, response.body().toString())
                    }
                }
            }
        }
    }

    private fun tokenToast(token: String?) {
        if (token == null) {
            Toast.makeText(
                applicationContext,
                "Unable to get token from response",
                Toast.LENGTH_SHORT
            ).show()
        } else {
            Toast.makeText(
                applicationContext,
                "Token fetched. Storing to Shared prefs.",
                Toast.LENGTH_SHORT
            ).show()
        }
    }

    private fun storeTokenLocally(token: String?) {
        if (token != null) {
            preferenceManager.setString("token", token)
        }
    }
}