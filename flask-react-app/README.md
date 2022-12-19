# upi-deeplinks-sample-app made using Flask and React.

Sending Setu’s UPI payment links via Backend to frontend.

## How to

### Setup UPI Deeplink with Setu

Follow this [documentation](https://docs.setu.co/payments/upi-deeplinks/quickstart) or directly go to the [bridge](https://bridge.setu.co/) to setup UPI Deeplinks with Setu. At the end of it, you would be able to get sandbox credentials, `Merchant ID(productID)`, `SCHEME ID` and `Secret` for your product.

Create and add the following values in `.flaskenv` file in *SERVER FOLDER*

`FLASK_APP`=base.py<br/>

`FLASK_DEBUG`=1<br/>

`SCHEME_ID`= XYZ<br/>

`SECRET`= XYZ<br/>

`PRODUCT_ID`= XYZ<br/>

Add the following values in `.env` file in *CLIENT FOLDER*

`VITE_API_ENDPOINT`= http://localhost:4000



### Running the app


#### Install dependencies Python(server)

Make sure you have Pip installed and then in the project directory, you can run:<br/>

For mac/unix users:<br/>
`python3 -m venv env`<br/>

`source env/bin/activate`<br/>

For windows users: <br/>`py -m venv env`<br/>

`.\env\Scripts\activate`<br/>

`pip install -r requirements.txt`

#### Start server(flask)

`flask run -p 4000`

#### Install dependencies React(client)

`yarn install`

#### Start server(react)

`yarn dev`
