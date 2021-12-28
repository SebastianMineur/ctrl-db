const baseUrl = `//${import.meta.env.VITE_API_URL}`;

const schema = {
  manufacturers: {
    requests: {
      getAll: {
        query: "{ manufacturers { data { id, attributes { name } } } }",
        process: (data) =>
          data.data.manufacturers.data.map((manufacturer) => {
            return { id: manufacturer.id, ...manufacturer.attributes };
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
                manufacturer {
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
        process: (data) => {
          const device = data.data.device.data;
          const manufacturer = device.attributes.manufacturer.data;
          return {
            id: device.id,
            ...device.attributes,
            manufacturer: {
              id: manufacturer.id,
              ...manufacturer.attributes,
            },
          };
        },
      },
      getAll: {
        query:
          "{ devices { data { id, attributes { model, type, manufacturer { data { id, attributes { name } } } } } } }",
        process: (data) =>
          data.data.devices.data.map((device) => {
            const manufacturer = device.attributes.manufacturer.data;
            return {
              id: device.id,
              ...device.attributes,
              manufacturer: {
                id: manufacturer.id,
                ...manufacturer.attributes,
              },
            };
          }),
      },
    },
  },
};

const request = async (req, vars) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQwNjkwNTMyLCJleHAiOjE2NDMyODI1MzJ9.3SSc3riKuJJBajaY9cEI5HHGcHO1JEASlf3sG4lD3pM",
    },
    body: JSON.stringify({
      query: req.query,
      variables: vars,
    }),
  });
  const data = await response.json();
  return req.process(data);
};

export const getManufacturers = async () => {
  return await request(schema.manufacturers.requests.getAll);
};

export const getDevice = async (id) => {
  return await request(schema.devices.requests.getOne, { id });
};

export const getDevices = async () => {
  return await request(schema.devices.requests.getAll);
};
