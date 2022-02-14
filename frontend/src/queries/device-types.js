import { gql } from "@apollo/client";

export const GET_DEVICE_TYPES = gql`
  query DeviceTypes {
    deviceTypes {
      id
      name
    }
  }
`;

export const CREATE_DEVICE_TYPE = gql`
  mutation CreateDeviceType($name: String!) {
    createDeviceType(data: { name: $name }) {
      id
      name
    }
  }
`;
