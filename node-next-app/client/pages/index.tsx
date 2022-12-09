import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { IndexStyled } from "./../styles/Index.styled";
import {
  Row,
  Portion,
  Element,
  Text,
  Heading,
  Card,
  Button,
} from "fictoan-react";
import axios from "axios";
import Link from "next/link";
export interface IProduct {
  alt: string;
  brand: string;
  color: string;
  id: string;
  imgUrl: string;
  productDesc: string;
  productPrice: number;
  productTitle: string;
}
export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { productsData },
        } = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <IndexStyled>
      {loading && (
        <h3 style={{ display: "grid", placeItems: "center" }}>loading...</h3>
      )}
      <Row className="row" gutters="large" sidePadding="large">
        {products &&
          products.map((product) => {
            return (
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
                  isFullHeight
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
                  <Link href={`/products/${product.id}`}>
                    <Button kind="primary" shadow="mild">
                      Buy now
                    </Button>
                  </Link>
                </Card>
              </Portion>
            );
          })}
      </Row>
    </IndexStyled>
  );
}
