import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const SEARCH = gql`
  query SearchDevices($search: String!) {
    devices(
      filters: {
        or: [
          { model: { containsi: $search } }
          { type: { containsi: $search } }
          { manufacturer: { name: { containsi: $search } } }
        ]
      }
    ) {
      data {
        id
        attributes {
          model
          type
          manufacturer {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const unwrap = (data) => {
  return data.devices.data.map((device) => {
    const manufacturer = device.attributes.manufacturer.data;
    return {
      id: device.id,
      ...device.attributes,
      manufacturer: {
        id: manufacturer.id,
        ...manufacturer.attributes,
      },
    };
  });
};

export const useSearchQuery = (options) => {
  const originalOnCompleted = options.onCompleted;
  const originalOnError = options.onError;
  const [data, setData] = useState();

  const results = useQuery(SEARCH, {
    ...options,
    onCompleted(data) {
      const unwrapped = unwrap(data);
      setData(unwrapped);
      if (originalOnCompleted) originalOnCompleted(unwrapped);
    },
    onError(error) {
      setData(null);
      if (originalOnError) originalOnError(error);
    },
  });

  return { ...results, data };
};
