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

export const CREATE_DEVICE_TYPE = gql`
  mutation CreateDeviceType($name: String!) {
    createDeviceType(data: { name: $name }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
