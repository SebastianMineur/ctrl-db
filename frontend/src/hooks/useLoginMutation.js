import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const query = gql`
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

const unwrap = (data) => data.data.login;

export const useLoginMutation = () => {
  const [data, setData] = useState();
  const [originalMutation, results] = useMutation(query);

  // Wrap original mutation so we can unwrap the data envelope
  const mutate = async (options) => {
    try {
      const response = await originalMutation(options);
      const unwrapped = unwrap(response);
      setData(unwrapped);
      return unwrapped;
    } catch (error) {
      setData(null);
      throw error;
    }
  };

  return [mutate, { ...results, data }];
};
