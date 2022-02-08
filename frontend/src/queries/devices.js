import { gql } from "@apollo/client";

export const GET_DEVICE_FROM_ID = gql`
  query DeviceFromId($id: ID) {
    device(id: $id) {
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
      data: { model: $model, device_type: $device_type, brand: $brand }
    ) {
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

export const SEARCH_DEVICES = gql`
  query SearchDevices($search: String!, $type: ID, $brand: ID) {
    devices(
      filters: {
        or: [
          { model: { containsi: $search } }
          { device_type: { name: { containsi: $search } } }
          { brand: { name: { containsi: $search } } }
        ]
        device_type: { id: { eq: $type } }
        brand: { id: { eq: $brand } }
      }
    ) {
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
