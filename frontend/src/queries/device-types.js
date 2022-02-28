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
    createDeviceType(input: { data: { name: $name } }) {
      deviceType {
        id
        name
      }
    }
  }
`;
