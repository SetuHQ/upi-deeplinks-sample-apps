import styled from "styled-components";
import { lighten, darken } from "polished";

import { defaultColours } from "fictoan-react";

import { siteColors } from "./../../styles/siteColors";

export const HeaderStyled = styled.header`
  background-color: White;
  position: relative;
  z-index: 50000;

  @media screen and (max-width: 900px) {
    padding: 8px 0;
  }

  .site-logo {
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
    gap: 0.5rem;
  }

  .link {
    font-size: 1.4rem;
  }
  svg {
    width: 1.8rem !important;
  }
`;
