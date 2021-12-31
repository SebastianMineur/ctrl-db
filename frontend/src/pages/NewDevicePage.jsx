import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Button from "../components/Button";
import { GET_BRANDS } from "../services/queries";

const NewDevicePage = () => {
  const [brand, setBrand] = useState();
  const { data: brands } = useQuery(GET_BRANDS);

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
        <select
          value={brand ?? ""}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
          className="bg-white mb-1"
        >
          <option value="" disabled></option>
          {brands?.brands.data.map((brand) => (
            <option key={brand.id}>{brand.attributes.name}</option>
          ))}
        </select>
      </div>

      <div className="flex column gap-05">
        <label>Type</label>
        <select className="bg-white">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
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
