import { useState } from "react";
import "./App.css";
import { AppStyled } from "./styles/App.styled";
import { Header } from "./components/Header";
import {
  Button,
  Card,
  CodeBlock,
  Element,
  Heading,
  Portion,
  Row,
  Text,
} from "fictoan-react";
import { products } from "./data/products";
import { IUPIResponse } from "./@types/IResponses";

function App() {
  const [UPIResponse, setUPIResponse] = useState<IUPIResponse>();
  const [mockResponse, setMockResponse] = useState<{ utr: string }>();

  const createUPILink = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/upi-pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(products[0]),
        }
      );
      const link = await response.json();
      console.log(link, "SAD");
      setUPIResponse(link.link);
    } catch (error) {
      console.log(error);
    }
  };

  const mockPayment = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/mock-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response: UPIResponse, product: products[0] }),
        }
      );
      const paymentResponse = await response.json();
      setMockResponse(paymentResponse.mock);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppStyled>
      <div className="App">
        <Header />
        <Row className="row" gutters="large" sidePadding="large">
          <Portion
            key={products[0].id}
            desktopSpan="6"
            tabletLandscapeSpan="8"
            tabletPortraitSpan="half"
            mobileSpan="24"
            marginBottom="nano"
          >
            <Card
              className="tagline-card"
              shape="rounded"
              padding="medium"
              bgColour="blue-10"
              borderColor="blue-40"
              //   isFullHeight
            >
              <Element as="img" src={products[0].imgUrl} />

              <Element as="div">
                <Heading
                  as="h5"
                  weight="600"
                  className="uppercase-this text-green"
                >
                  {products[0].productTitle}
                </Heading>
                <Text
                  size="medium"
                  weight="300"
                  className="uppercase-this text-grey"
                >
                  {products[0].productDesc.slice(0, 30)}
                </Text>
                <Text
                  size="medium"
                  weight="600"
                  className="uppercase-this text-primary"
                >
                  {`$ ${products[0].productPrice}`}
                </Text>
              </Element>

              <Button onClick={createUPILink} kind="primary" shadow="mild">
                Pay with UPI
              </Button>
            </Card>
          </Portion>
          <Portion
            desktopSpan="18"
            tabletLandscapeSpan="18"
            tabletPortraitSpan="24"
            mobileSpan="24"
            marginBottom="nano"
          >
            {UPIResponse && (
              <>
                {UPIResponse && (
                  <>
                    <span>
                      This is the PaymentLinkResponse that you get from the
                      upi-deeplinks
                    </span>
                    <CodeBlock
                      style={{ fontSize: "1rem" }}
                      source={UPIResponse}
                      language="javascript"
                    />
                    <Element as="div" marginTop="nano" marginBottom="nano">
                      <a
                        href={UPIResponse?.payment_link.short_url}
                        target={"_blank"}
                        onClick={mockPayment}
                        rel="noreferrer"
                      >
                        Click here to pay using our sandbox
                      </a>
                    </Element>
                    <Element as="div" marginTop="nano" marginBottom="nano">
                      As this is just a sandbox testing edition, Click the below
                      mock payment button to mock the payment
                    </Element>

                    <Button
                      onClick={mockPayment}
                      kind="tertiary"
                      marginTop="nano"
                      marginBottom="nano"
                    >
                      Mock Payment
                    </Button>
                  </>
                )}
                {mockResponse && (
                  <>
                    <CodeBlock
                      source={`UTR: ${mockResponse.utr}`}
                      language="javascript"
                      style={{ fontSize: "1rem" }}
                    />
                  </>
                )}
              </>
            )}
          </Portion>
        </Row>
      </div>
    </AppStyled>
  );
}

export default App;
