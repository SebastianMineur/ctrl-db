import { useEffect } from "react";
import { useState } from "react";
import { getManufacturers } from "../services/strapi";
import Button from "../components/Button";

const NewDevicePage = () => {
  const [manufacturer, setManufacturer] = useState();
  const [manufacturers, setManufacturers] = useState();

  useEffect(async () => {
    setManufacturers(await getManufacturers());
  }, []);

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
        <label>Manufacturer</label>
        <select
          value={manufacturer ? manufacturer : ""}
          onChange={(e) => {
            setManufacturer(e.target.value);
          }}
          className="bg-white mb-1"
        >
          <option value="" disabled></option>
          {manufacturers?.map((m) => (
            <option key={m.id}>{m.name}</option>
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
