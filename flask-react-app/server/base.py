from flask import Flask
from flask import request
from flask import abort
from setu import Deeplink
from setu.contract import SetuAPIException
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin
load_dotenv()

SCHEME_ID = os.getenv("SCHEME_ID")
SECRET = os.getenv("SECRET")
PRODUCT_ID = os.getenv("PRODUCT_ID")

api = Flask(__name__)
CORS(api)

dl = Deeplink(
    scheme_id=SCHEME_ID,
    secret=SECRET,
    product_instance_id=PRODUCT_ID,
    auth_type="JWT",
    mode="SANDBOX",
)


def linkgen(billAmt):
    billAmt = int(billAmt)
    try:
        link = dl.create_payment_link(
            amount_value=billAmt * 100,
            biller_bill_id="test_transaction_1234",
            amount_exactness="EXACT",
            payee_name="Python SDK Test",
            transaction_note="Testing Transaction",
        )
    except SetuAPIException as e:
        return "Error!"

    return link


def mock_func(billAmt, upi_id, platform_bill_id):
    billAmt = int(billAmt)
    try:
        credit_response = dl.trigger_mock_payment(
            billAmt * 100, upi_id, platform_bill_id
        )
        print(credit_response.utr, 'sadsdads')
        settlement_resp = dl.trigger_mock_settlement([credit_response.utr])
        print(settlement_resp, 'sad')

    except SetuAPIException as e:
        return "Error!"

    return credit_response


@api.route('/')
@cross_origin(supports_credentials=True)
def my_profile():
    response_body = {
        "name": "HI!!!",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body


@api.route('/upi-pay', methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def upi():
    if request.method == "POST":
        data = request.get_json()
        bill_amount = data["productPrice"]
        url = linkgen(bill_amount)
        if (url == 'Error!'):
            abort(400)
    response_body = {
        "link": url
    }
    return response_body


@api.route('/mock-payment', methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def mock_pay():
    if request.method == "POST":
        data = request.get_json()
        upi_response = data["response"]
        product = data["product"]
        url = mock_func(product['productPrice'],
                        upi_response['payment_link']["upi_id"], upi_response['platform_bill_id'])
        if (url == 'Error!'):
            abort(400)
    response_body = {
        "mock": url
    }
    return response_body
