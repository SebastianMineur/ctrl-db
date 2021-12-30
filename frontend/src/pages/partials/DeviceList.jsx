import { Link } from "react-router-dom";

const DeviceList = ({ devices }) => {
  return (
    <div className="ResultsList bg-white rounded b-1">
      {devices.map((device) => (
        <div key={device.id} className="SearchResult p-1">
          <div className="flex justify-between">
            <Link to={`/device/${device.id}`} className="m-0 font-bold">
              {device.model}
            </Link>
            <p className="m-0">{device.type}</p>
          </div>
          <p className="m-0">{device.manufacturer.name}</p>
        </div>
      ))}
    </div>
  );
};

export default DeviceList;
