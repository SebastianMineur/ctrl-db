import { useEffect, useState } from "react";
import * as cls from "classnames";

import Input from "../../components/Input";

const Rs232Form = ({ onChange }) => {
  const [baudRate, setBaudRate] = useState("");
  const [dataBits, setDataBits] = useState("");
  const [stopBits, setStopBits] = useState("");
  const [parity, setParity] = useState("");

  useEffect(() => {
    onChange({
      baud_rate: Number(baudRate),
      data_bits: Number(dataBits),
      stop_bits: Number(stopBits),
      parity: parity,
    });
  }, [baudRate, dataBits, stopBits, parity]);

  return (
    <div className="flex flex-wrap gap-1">
      <div>
        <label className="font-xs">Baud rate</label>
        <Input
          type="number"
          className={"block bg-white"}
          value={baudRate}
          onChange={(e) => setBaudRate(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-xs">Data bits</label>
        <Input
          type="number"
          className={"block bg-white"}
          value={dataBits}
          onChange={(e) => setDataBits(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-xs">Stop bits</label>
        <Input
          type="number"
          className={"block bg-white"}
          value={stopBits}
          onChange={(e) => setStopBits(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-xs">Parity</label>
        <select
          className="block bg-white"
          value={parity || ""}
          onChange={(e) => setParity(e.target.value)}
          required
        >
          <option value=""></option>
          <option value="None">None</option>
          <option value="Odd">Odd</option>
          <option value="Even">Even</option>
        </select>
      </div>
    </div>
  );
};

const TcpIpForm = ({ onChange }) => {
  const [useDhcp, setUseDhcp] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [subnetMask, setSubnetMask] = useState("");

  useEffect(() => {
    onChange({
      dhcp: useDhcp,
      ip_address: Number(ipAddress),
      subnet_mask: Number(subnetMask),
    });
  }, [useDhcp, ipAddress, subnetMask]);

  return (
    <div className="flex flex-wrap gap-1">
      <div>
        <label className="font-xs">DHCP</label>
        <input
          type="checkbox"
          className="block"
          onChange={() => setUseDhcp(!useDhcp)}
        />
      </div>

      <div>
        <label className="font-xs">IP address</label>
        <Input
          type="text"
          className={cls("block", useDhcp ? "bg-light" : "bg-white")}
          value={useDhcp ? "" : ipAddress}
          placeholder={useDhcp ? "N/A" : ""}
          disabled={useDhcp}
          onChange={(e) => setIpAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="font-xs">Subnet mask</label>
        <Input
          type="text"
          className={cls("block", useDhcp ? "bg-light" : "bg-white")}
          value={useDhcp ? "" : subnetMask}
          placeholder={useDhcp ? "N/A" : ""}
          disabled={useDhcp}
          onChange={(e) => setSubnetMask(e.target.value)}
        />
      </div>
    </div>
  );
};

const ProtocolDetailsForm = ({ type, onChange }) => {
  switch (type) {
    case "ComponentProtocolDetailsRs232":
      return <Rs232Form onChange={onChange} />;
    case "ComponentProtocolDetailsTcpIp":
      return <TcpIpForm onChange={onChange} />;
    default:
      return (
        <p className="bg-danger px-1 py-05 m-0 radius-sm">
          Invalid protocol details!
        </p>
      );
  }
};

export default ProtocolDetailsForm;
