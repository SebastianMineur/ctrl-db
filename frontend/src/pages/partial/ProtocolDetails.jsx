const Rs232Details = ({ name, details }) => {
  return (
    <div className="bg-white bb-1 p-1">
      {name && <p className="font-md font-bold m-0">{name}</p>}
      <div className="flex flex-wrap gap-2">
        <div>
          <label className="font-xs">Baud rate</label>
          <p className="m-0">{details.baud_rate}</p>
        </div>
        <div>
          <label className="font-xs">Data bits</label>
          <p className="m-0">{details.data_length}</p>
        </div>
        <div>
          <label className="font-xs">Stop bits</label>
          <p className="m-0">{details.stop_bits}</p>
        </div>
        <div>
          <label className="font-xs">Parity</label>
          <p className="m-0">{details.parity}</p>
        </div>
      </div>
    </div>
  );
};

const TcpIpDetails = ({ name, details }) => {
  return (
    <div className="bg-white bb-1 p-1">
      {name && <p className="font-md font-bold m-0">{name}</p>}
      <div className="flex flex-wrap gap-2">
        {details.dhcp ? (
          <div>
            <label className="font-xs">IP address</label>
            <p className="m-0">DHCP</p>
          </div>
        ) : (
          <>
            <div>
              <label className="font-xs">IP address</label>
              <p className="m-0">{details.ip_address}</p>
            </div>
            <div>
              <label className="font-xs">Subnet mask</label>
              <p className="m-0">{details.subnet_mask}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const DETAIL_TYPES = {
  ComponentProtocolDetailsRs232: Rs232Details,
  ComponentProtocolDetailsTcpIp: TcpIpDetails,
};

const ProtocolDetails = (props) => {
  const typename = props?.details?.__typename;
  if (!DETAIL_TYPES?.[typename])
    return <p className="bg-danger">Invalid protocol details!</p>;
  return DETAIL_TYPES[typename](props);
};

export default ProtocolDetails;
