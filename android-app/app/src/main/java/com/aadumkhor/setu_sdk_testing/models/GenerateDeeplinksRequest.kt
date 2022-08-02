package com.aadumkhor.setu_sdk_testing.models

data class GenerateDeeplinksRequest(
    val amountExactness: String,
    val billerBillID: String,
    val expiryDate: String?,
    val name: String?,
    val amount: Amount
)

data class Amount(
    val currencyCode: String?,
    val value: Int // in paisa
)