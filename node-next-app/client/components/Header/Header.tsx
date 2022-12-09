import React, { useState } from "react";
import { Row, Portion, Element, Button, Text, Heading } from "fictoan-react";
import Link from "next/link";
import { HeaderStyled } from "./Header.styled";
import Logo from "../../public/assets/logo.svg";
export const Header = () => {
  return (
    <HeaderStyled>
      <Row
        sidePadding="micro"
        padding="nano"
        gutters="large"
        marginBottom="none"
      >
        <Portion>
          <Element as="div" className="vertically-centre-items push-to-ends">
            {/*  LOGO  =======================================  */}
            <Element as="div" className="">
              <Element as="div" className="site-logo" marginRight="nano">
                <Logo className="logo " />
                <Link className="link" href="/">
                  GOFIN
                </Link>
              </Element>
            </Element>
          </Element>
        </Portion>
      </Row>
    </HeaderStyled>
  );
};
