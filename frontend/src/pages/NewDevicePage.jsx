import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Button from "../components/Button";
import DataSelect from "../components/DataSelect";
import { GET_BRANDS, GET_DEVICE_TYPES } from "../services/queries";

const NewDevicePage = () => {
  const [brand, setBrand] = useState();
  const [deviceType, setDeviceType] = useState();
  const brandsQuery = useQuery(GET_BRANDS);
  const deviceTypesQuery = useQuery(GET_DEVICE_TYPES);

  useEffect(async () => {}, []);

  return (
    <div className="container-lg">
      <h2 className="font-xl mt-1 mb-0">Create new device</h2>
      <p className="mt-0">
        A device can be any piece of hardware capable of receiving control
        commands.
      </p>

      <hr />

      <div className="flex column gap-05">
        <label>Model</label>
        <input className="bg-white mb-1" />
      </div>

      <div className="flex column gap-05">
        <label>Descriptive name</label>
        <input className="bg-white mb-1" />
      </div>

      <div className="flex column gap-05">
        <label>Brand</label>
        <DataSelect
          data={brandsQuery.data?.brands.data}
          value={brand ?? ""}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
          className="bg-white mb-1"
        />
      </div>

      <div className="flex column gap-05">
        <label>Type</label>
        <DataSelect
          data={deviceTypesQuery.data?.deviceTypes.data}
          value={deviceType ?? ""}
          onChange={(e) => {
            setDeviceType(e.target.value);
          }}
          className="bg-white mb-1"
        />
      </div>

      <hr className="my-2" />

      <div className="flex justify-center gap-1">
        <Button variant="outline" color="danger">
          Cancel
        </Button>
        <Button variant="filled" color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default NewDevicePage;
