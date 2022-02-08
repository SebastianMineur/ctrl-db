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

export const CREATE_BRAND = gql`
  mutation CreateBrand($name: String!) {
    createBrand(data: { name: $name }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
