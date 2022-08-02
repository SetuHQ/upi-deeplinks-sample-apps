package com.aadumkhor.setu_sdk_testing.services

import com.aadumkhor.setu_sdk_testing.models.GenerateDeeplinksRequest
import com.aadumkhor.setu_sdk_testing.models.GenerateTokenRequest
import com.aadumkhor.setu_sdk_testing.models.OAuthTokenResponse
import com.aadumkhor.setu_sdk_testing.models.PaymentLinksResponse
import retrofit2.Response
import retrofit2.http.*

interface UPIDeeplinks {
    @POST("/api/v2/auth/token")
    suspend fun generateOAuthToken(@Body body: GenerateTokenRequest): Response<OAuthTokenResponse>

    @POST("/api/{version}/payment-links")
    suspend fun generatePaymentLink(
        @Path("version") version: String,
        @Header("X-Setu-Product-Instance-ID") productInstanceID: String,
        @Header("Content-Type") contentType: String,
        @Header("Authorization") token: String,
        @Body request: GenerateDeeplinksRequest
    ): Response<PaymentLinksResponse>
}