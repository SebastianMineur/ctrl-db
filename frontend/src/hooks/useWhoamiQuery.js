import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query {
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

const unwrap = (data) => {
  try {
    return data.me;
  } catch (error) {
    throw new Error("Invalid data format: " + JSON.stringify(data));
  }
};

export const useWhoamiQuery = (options) => {
  const [data, setData] = useState();
  const onCompleted = options?.onCompleted;

  const results = useQuery(query, {
    ...options,
    onCompleted(data) {
      const unwrapped = unwrap(data);
      if (typeof onCompleted === "function") onCompleted(unwrapped);
      setData(unwrapped);
    },
    onError() {
      // "Log out" on error
      if (typeof onCompleted === "function") onCompleted(null);
      setData(null);
    },
  });

  return { ...results, data };
};
