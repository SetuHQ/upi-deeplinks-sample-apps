package com.aadumkhor.setu_sdk_testing.models


data class OAuthTokenResponse(
    val status: Int?,
    val success: Boolean?,
    val data: OAuthData?

)

data class OAuthData(
    val expiresIn: Int?,
    val token: String?
)