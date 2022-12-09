import styled from "styled-components";
import { lighten, darken } from "polished";

import { defaultColours } from "fictoan-react";

export const IndexStyled = styled.article`
  margin-top: 2rem;
  .text-primary {
    color: #3f64d4;
  }
  .tagline-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media all and (max-width: 1200px) {
      justify-content: unset;

      h3 {
        font-size: 2em;
      }

      &:after {
        display: flex;
      }
    }

    img {
      width: 80%;
      margin: 0 auto;
      object-fit: cover;
    }
  }
`;
