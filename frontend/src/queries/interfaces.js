import { gql } from "@apollo/client";

export const GET_INTERFACES = gql`
  query Interfaces {
    interfaces {
      id
      name
      details_component
    }
  }
`;

export const CREATE_INTERFACE = gql`
  mutation CreateInterface($name: String!, $details_component: String!) {
    createInterface(
      input: { data: { name: $name, details_component: $details_component } }
    ) {
      interface {
        id
        name
        details_component
      }
    }
  }
`;
