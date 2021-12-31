import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const SEARCH = gql`
  query SearchDevices($search: String!) {
    devices(
      filters: {
        or: [
          { model: { containsi: $search } }
          { type: { containsi: $search } }
          { brand: { name: { containsi: $search } } }
        ]
      }
    ) {
      data {
        id
        attributes {
          model
          type
          brand {
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
    const brand = device.attributes.brand.data;
    return {
      id: device.id,
      ...device.attributes,
      brand: {
        id: brand.id,
        ...brand.attributes,
      },
    };
  });
};

export const useSearchQuery = (options) => {
  const onCompleted = options.onCompleted;
  const [data, setData] = useState();

  const results = useQuery(SEARCH, {
    ...options,
    onCompleted(data) {
      if (onCompleted) {
        onCompleted(unwrap(data));
      }
    },
  });

  useEffect(() => {
    setData(results.data ? unwrap(results.data) : null);
  }, [results.data]);

  return { ...results, data };
};
