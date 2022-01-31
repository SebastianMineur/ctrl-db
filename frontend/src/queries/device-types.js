import { gql } from "@apollo/client";

export const GET_DEVICE_TYPES = gql`
  query DeviceTypes {
    deviceTypes {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
