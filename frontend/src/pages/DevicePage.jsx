import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_DEVICE_FROM_ID } from "../queries/devices";

const DevicePage = () => {
  const { id } = useParams();
  const deviceQuery = useQuery(GET_DEVICE_FROM_ID, { variables: { id } });

  if (!deviceQuery.data) return null;

  const brand =
    deviceQuery.data.device.data.attributes.brand.data.attributes.name;
  const model = deviceQuery.data.device.data.attributes.model;

  return (
    <div className="container-lg">
      <h2 className="font-xl mt-1 mb-0">
        <span className="block font-md">{brand}</span>
        {model}
      </h2>

      <p className="mt-0">
        A device can be any piece of hardware capable of receiving control
        commands.
      </p>
    </div>
  );
};

export default DevicePage;
