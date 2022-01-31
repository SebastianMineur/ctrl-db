import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query Brands {
    brands {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
