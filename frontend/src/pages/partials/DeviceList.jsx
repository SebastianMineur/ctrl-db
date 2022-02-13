import { Link } from "react-router-dom";
import * as cls from "classnames";
import css from "./css/DeviceList.module.css";

const DeviceList = ({ devices }) => {
  return (
    <div className={cls(css.DeviceList, "bg-white rounded b-1")}>
      {devices.map((device) => (
        <Link
          to={`/device/${device.id}`}
          key={device.id}
          className={cls(css.SearchResult, "p-1")}
        >
          <div className="flex justify-between">
            <p className="m-0 font-bold">{device.attributes.model}</p>
            <p className="m-0">
              {device.attributes.device_type.data.attributes.name}
            </p>
          </div>
          <p className="m-0">{device.attributes.brand.data.attributes.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default DeviceList;
