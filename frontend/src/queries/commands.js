import { gql } from "@apollo/client";

export const GET_COMMANDS_BY_PROTOCOL = gql`
  query Commands($protocol: ID!) {
    commands(where: { protocol: { id_eq: $protocol } }) {
      id
      name
      code
    }
  }
`;

export const CREATE_COMMAND = gql`
  mutation CreateCommand($id: ID!, $desc: String!, $code: String!) {
    createCommand(
      input: { data: { protocol: $id, name: $desc, code: $code } }
    ) {
      command {
        id
        name
        code
      }
    }
  }
`;
