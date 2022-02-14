import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import LoadingPage from "./LoadingPage";
import ProtocolsView from "./partial/ProtocolsView";
import { GET_DEVICE_FROM_ID } from "../queries/devices";

const DevicePage = () => {
  const { id } = useParams();
  const deviceQuery = useQuery(GET_DEVICE_FROM_ID, { variables: { id } });

  if (deviceQuery.loading) return <LoadingPage />;
  if (!deviceQuery.data) return null;

  return (
    <div className="container-lg">
      <h2 className="flex column font-xl my-1">
        <span className="font-md">{deviceQuery.data.device.brand.name}</span>
        {deviceQuery.data.device.model}
      </h2>

      <span className="inline-block bg-white b-1 radius-pill pb-025 px-1">
        {deviceQuery.data.device.device_type.name}
      </span>

      <h3 className="mb-05">Protocols</h3>
      <ProtocolsView protocols={deviceQuery.data.device.protocols} />
    </div>
  );
};

export default DevicePage;
