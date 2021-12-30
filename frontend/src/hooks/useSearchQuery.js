import { useState, useEffect } from "react";
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
