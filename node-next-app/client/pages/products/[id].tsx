import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Row,
  Portion,
  Element,
  Text,
  Heading,
  Card,
  Button,
  CodeBlock,
} from "fictoan-react";
import axios from "axios";
import { ProductsStyled } from "./products.styled";
import { IProduct } from "./../index";
import { useRouter } from "next/router";

export default function SingleProductCheckout() {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(true);
  const [UPIResponse, setUPIResponse] = useState<Record<string, any>>();
  const [mockResponse, setMockResponse] = useState<{ utr: string }>({
    utr: "",
  });
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const {
            data: { product },
          } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${id}`
          );
          setProduct(product);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const createUPILink = async () => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/upi-pay`,
        { id: product?.id }
      );
      setUPIResponse(resp.data);
    } catch (error) {}
  };

  const mockPayment = async () => {
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/mock-payment`,
        {
          UPIResponse: UPIResponse?.paymentLinkResponse,
          id: product?.id,
        }
      );
      console.log(resp, "MOCK RESPONSE");
      setMockResponse(resp.data.data);
    } catch (error) {}
  };

  return (
    <ProductsStyled>
      {loading && (
        <h3 style={{ display: "grid", placeItems: "center" }}>loading...</h3>
      )}
      {product && (
        <Row className="row" gutters="large" sidePadding="large">
          <Portion
            key={product.id}
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
              <Element as="img" src={product.imgUrl} />

              <Element as="div">
                <Heading
                  as="h5"
                  weight="600"
                  className="uppercase-this text-green"
                >
                  {product.productTitle}
                </Heading>
                <Text
                  size="medium"
                  weight="300"
                  className="uppercase-this text-grey"
                >
                  {product.productDesc.slice(0, 30)}
                </Text>
                <Text
                  size="medium"
                  weight="600"
                  className="uppercase-this text-primary"
                >
                  {`$ ${product.productPrice}`}
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
                        href={
                          UPIResponse?.paymentLinkResponse.paymentLink.shortURL
                        }
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
      )}
    </ProductsStyled>
  );
}
