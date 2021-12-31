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

const unwrap = (data) => {
  try {
    return data.data.login;
  } catch (error) {
    throw new Error("Invalid data format: " + JSON.stringify(data));
  }
};

export const useLoginMutation = () => {
  const [data, setData] = useState();
  const [originalMutation, results] = useMutation(query);

  // Wrap original mutation so we can unwrap the data envelope
  const mutate = async (options) => {
    // Also delay original onCompleted until we've handled the data
    const onCompleted = options.onCompleted;
    try {
      const response = await originalMutation({
        ...options,
        onCompleted: undefined,
      });
      const unwrapped = unwrap(response);
      if (typeof onCompleted === "function") onCompleted(unwrapped);
      setData(unwrapped);
      return unwrapped;
    } catch (error) {
      throw error;
    }
  };

  return [mutate, { ...results, data }];
};
