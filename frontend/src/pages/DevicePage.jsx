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

  const device = deviceQuery.data.device.data;
  const modelName = device.attributes.model;
  const brandName = device.attributes.brand.data.attributes.name;
  const typeName = device.attributes.device_type.data.attributes.name;
  const protocols = device.attributes.protocols.data;

  return (
    <div className="container-lg">
      <h2 className="flex column font-xl my-1">
        <span className="font-md">{brandName}</span>
        {modelName}
      </h2>

      <span className="inline-block bg-white b-1 radius-pill pb-025 px-1">
        {typeName}
      </span>

      <h3 className="mb-05">Protocols</h3>
      <ProtocolsView protocols={protocols} />
    </div>
  );
};

export default DevicePage;
