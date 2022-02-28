import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query Brands {
    brands {
      id
      name
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand($name: String!) {
    createBrand(input: { data: { name: $name } }) {
      brand {
        id
        name
      }
    }
  }
`;
