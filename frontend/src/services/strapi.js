const baseUrl = `//${import.meta.env.VITE_API_URL}`;

const schema = {
  brands: {
    requests: {
      getAll: {
        query: "{ brands { data { id, attributes { name } } } }",
        unwrap: (data) =>
          data.data.brands.data.map((brand) => {
            return { id: brand.id, ...brand.attributes };
          }),
      },
    },
  },
  devices: {
    requests: {
      getOne: {
        query: `query DeviceFromId($id: ID) {
          device(id: $id) {
            data {
              id,
              attributes {
                model,
                type,
                brand {
                  data {
                    id,
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }`,
        unwrap: (data) => {
          const device = data.data.device.data;
          const brand = device.attributes.brand.data;
          return {
            id: device.id,
            ...device.attributes,
            brand: {
              id: brand.id,
              ...brand.attributes,
            },
          };
        },
      },
      getAll: {
        query:
          "{ devices { data { id, attributes { model, type, brand { data { id, attributes { name } } } } } } }",
        unwrap: (data) =>
          data.data.devices.data.map((device) => {
            const brand = device.attributes.brand.data;
            return {
              id: device.id,
              ...device.attributes,
              brand: {
                id: brand.id,
                ...brand.attributes,
              },
            };
          }),
      },
    },
  },
};

const loginRequest = {
  query: `mutation Login($email: String!, $password: String!) {
    login(input: {
      identifier: $email,
      password: $password
    }) {
      jwt
      user {
        id, username, email
      }
    }
  }`,
  unwrap(data) {
    return data;
  },
};

const searchRequest = {
  query: `query SearchDevices($search: String!) {
    devices(filters: {
      or: [
        { model: { containsi: $search } },
        { type: { containsi: $search } },
        { brand: { name: { containsi: $search } } }
      ]
    }) {
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
  }`,
  unwrap: (data) =>
    data.data.devices.data.map((device) => {
      const brand = device.attributes.brand.data;
      return {
        id: device.id,
        ...device.attributes,
        brand: {
          id: brand.id,
          ...brand.attributes,
        },
      };
    }),
};

const request = async (req, vars) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: req.query,
      variables: vars,
    }),
  });
  const data = await response.json();
  return req.unwrap(data);
};

export const getBrands = async () => {
  return await request(schema.brands.requests.getAll);
};

export const getDevice = async (id) => {
  return await request(schema.devices.requests.getOne, { id });
};

export const getDevices = async () => {
  return await request(schema.devices.requests.getAll);
};

export const login = async (email, password) => {
  return await request(loginRequest, { email, password });
};

export const search = async (search) => {
  return await request(searchRequest, { search });
};
