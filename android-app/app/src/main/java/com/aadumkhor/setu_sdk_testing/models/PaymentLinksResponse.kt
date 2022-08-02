package com.aadumkhor.setu_sdk_testing.models

data class PaymentLinksResponse(
    val status: Int,
    val success: Boolean,
    val data: PaymentLinksData
)

data class PaymentLinksData(
    val name: String,
    val platformBillID: String,
    val paymentLink: PaymentLink
)

data class PaymentLink(
    val shortURL: String,
    val upiID: String,
    val upiLink: String
)