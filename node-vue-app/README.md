# upi-deeplinks-sample-app made using Node and Vue

## Preview
<img width="1131" alt="Screenshot 2022-12-22 at 1 12 52 PM" src="https://user-images.githubusercontent.com/76595361/209083136-55da0e9e-5272-4889-9ab4-ad935af7e2e1.png">


Sending Setu’s UPI payment links via Backend to frontend.

Customers can make payment for desired product using upi.

## How to

### Setup UPI Deeplink with Setu

Follow this [documentation](https://docs.setu.co/payments/upi-deeplinks/quickstart) or directly go to the [bridge](https://bridge.setu.co/) to setup UPI Deeplinks with Setu. At the end of it, you would be able to get sandbox credentials, `Merchant ID(productID)`, `SCHEME ID` and `Secret` for your product.

Add the following values in `.env` file in *SERVER FOLDER*

`NODE_ENV`= development
`PORT`= 4000
`SCHEME_ID`= XYZ
`SECRET`= XYZ
`PRODUCT_ID`= XYZ

Add the following values in `.env` file in *CLIENT FOLDER*

`VITE_API_ENDPOINT`= http://localhost:4000


### Running the app

#### Install dependencies in both client and server folders

`yarn install`

#### Start server

`yarn run dev`
