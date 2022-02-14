import { gql } from "@apollo/client";

export const GET_COMMANDS_BY_PROTOCOL = gql`
  query Commands($protocol: ID!) {
    commands(filters: { protocol: { id: { eq: $protocol } } }) {
      data {
        id
        attributes {
          description
          code
        }
      }
    }
  }
`;

export const CREATE_COMMAND = gql`
  mutation CreateCommand($id: ID!, $desc: String!, $code: String!) {
    createCommand(data: { protocol: $id, description: $desc, code: $code }) {
      data {
        id
        attributes {
          description
          code
        }
      }
    }
  }
`;
