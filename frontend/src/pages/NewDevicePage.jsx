import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import Button from "../components/Button";
import DataSelect from "../components/DataSelect";
import { GET_BRANDS } from "../queries/brands";
import { CREATE_DEVICE } from "../queries/devices";
import { GET_DEVICE_TYPES } from "../queries/device-types";

const NewDevicePage = () => {
  const [model, setModel] = useState();
  const [brand, setBrand] = useState();
  const [type, setType] = useState();
  const brandsQuery = useQuery(GET_BRANDS);
  const typesQuery = useQuery(GET_DEVICE_TYPES);
  const [deviceMutation] = useMutation(CREATE_DEVICE);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    deviceMutation({
      variables: { model, brand, device_type: type },
      onCompleted(data) {
        navigate(data.createDevice.data.id);
      },
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setModel(null);
    setBrand(null);
    setType(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="container-lg"
    >
      <h2 className="font-xl mt-1 mb-0">Create new device</h2>
      <p className="mt-0">
        A device can be any piece of hardware capable of receiving control
        commands.
      </p>

      <hr />

      <div className="flex column gap-05">
        <label>Model</label>
        <input
          value={model ?? ""}
          onChange={(e) => setModel(e.target.value)}
          className="bg-white mb-1"
          required
        />
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
          required
        />
      </div>

      <div className="flex column gap-05">
        <label>Type</label>
        <DataSelect
          data={typesQuery.data?.deviceTypes.data}
          value={type ?? ""}
          onChange={(e) => {
            setType(e.target.value);
          }}
          className="bg-white mb-1"
          required
        />
      </div>

      <hr className="my-2" />

      <div className="flex justify-center gap-1">
        <Button type="reset" variant="outline" color="danger">
          Reset
        </Button>
        <Button type="submit" variant="filled" color="primary">
          Create
        </Button>
      </div>
    </form>
  );
};

export default NewDevicePage;
