from flask import Flask,render_template,request,redirect
from setu import Deeplink
from setu.contract import SetuAPIException

app = Flask(__name__)

def linkgen(billAmt):
    billAmt = int(billAmt)
    dl = Deeplink(
    scheme_id="c4f57443-dc1e-428f-8c4e-e5fd531057d2",
    secret="5b288618-473f-4193-ae1b-8c42f223798e",
    product_instance_id="861023031961584801",
    auth_type="OAUTH",
    mode="SANDBOX",
    )
    try:
        link = dl.create_payment_link(
            amount_value = billAmt * 100,
            biller_bill_id = "test_transaction_1234",
            amount_exactness = "EXACT",
            payee_name = "Python SDK Test",
            transaction_note = "Testing Transaction",
        )
    except SetuAPIException as e:
        return "Error !"
    
    return link.payment_link.short_url

@app.route('/')
def hello():
    return f'<h1>Hello, World! Go to /upi route</h1>'

@app.route('/upi' , methods =["GET", "POST"])
def upi():
    if request.method == "POST":
       bill_amount = request.form.get("amount")
       url = linkgen(bill_amount)
       return f'<h1>The URL for {bill_amount} Rupees is : {url}</h1>'

    return render_template('upi.html')

if __name__ == "__main__":
    app.run(debug=True)