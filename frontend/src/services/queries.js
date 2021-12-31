import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query {
    brands {
      data {
        id
        attributes {
          name
          devices {
            data {
              id
              attributes {
                model
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_DEVICES = gql`
  query {
    devices {
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

export const GET_ME = gql`
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

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const SEARCH_DEVICES = gql`
  query searchDevices($search: String!) {
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

export const CREATE_DEVICE = gql`
  mutation createDevice($model: String!, $device_type: ID!, $brand: ID!) {
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

export const GET_DEVICE_TYPES = gql`
  query {
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
