import { gql } from "@apollo/client";

export const GET_PROTOCOLS = gql`
  query Protocols {
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
`;

export const GET_PROTOCOLS_FROM_DEVICE = gql`
  query ProtocolsFromDevice($device: ID!) {
    protocols(where: { device: { id_eq: $device } }) {
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
`;

export const CREATE_PROTOCOL = gql`
  mutation CreateProtocol(
    $interface: ID!
    $device: ID!
    $version: String
    $details: [ProtocolDetailsDynamicZoneInput!]!
  ) {
    createProtocol(
      input: {
        data: {
          interface: $interface
          device: $device
          version: $version
          details: $details
        }
      }
    ) {
      protocol {
        id
        version
        interface {
          id
          name
        }
        device {
          id
          brand {
            id
            name
          }
          model
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
            dhcp
            ip_address
            subnet_mask
          }
        }
      }
    }
  }
`;
