import { gql } from "@apollo/client";

export const GET_DEVICE_FROM_ID = gql`
  query DeviceFromId($id: ID!) {
    device(id: $id) {
      id
      model
      device_type {
        id
        name
      }
      brand {
        id
        name
      }
      protocols {
        id
        version
        interface {
          id
          name
        }
        details {
          ... on ComponentProtocolDetailsRs232 {
            id
            baud_rate
            data_bits
            stop_bits
            parity
          }
          ... on ComponentProtocolDetailsTcpIp {
            id
            ip_address
            subnet_mask
            dhcp
          }
        }
        commands {
          id
          name
          code
        }
      }
    }
  }
`;

export const GET_DEVICES = gql`
  query Devices {
    devices {
      data {
        id
        attributes {
          model
          device_type {
            data {
              id
              attributes {
                name
              }
            }
          }
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

export const CREATE_DEVICE = gql`
  mutation CreateDevice($model: String!, $device_type: ID!, $brand: ID!) {
    createDevice(
      input: {
        data: { model: $model, device_type: $device_type, brand: $brand }
      }
    ) {
      device {
        id
        model
        device_type {
          id
          name
        }
        brand {
          id
          name
        }
      }
    }
  }
`;

export const SEARCH_DEVICES = gql`
  query SearchDevices($search: String!, $type: ID, $brand: ID) {
    devices(
      where: {
        _or: [
          { model_contains: $search }
          { device_type: { name_contains: $search } }
          { brand: { name_contains: $search } }
        ]
        device_type: { id_eq: $type }
        brand: { id_eq: $brand }
      }
    ) {
      id
      model
      device_type {
        id
        name
      }
      brand {
        id
        name
      }
    }
  }
`;
