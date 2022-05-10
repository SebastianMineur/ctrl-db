import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(input: { username: $name, email: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      username
      email
      role {
        id
        name
        type
      }
    }
  }
`;
