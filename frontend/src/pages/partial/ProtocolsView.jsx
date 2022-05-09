import { useState } from "react";
import { useQuery } from "@apollo/client";

import Button from "../../components/Button";
import Icon from "../../components/Icon";
import TabList from "../../components/TabList";
import ProtocolDetails from "./ProtocolDetails";
import CreateProtocol from "./CreateProtocol";
import CommandList from "./CommandList";

import { useAuthContext } from "../../contexts/AuthContext";
import { plus } from "../../assets/icons";
import css from "./css/Protocols.module.css";
import { GET_PROTOCOLS_FROM_DEVICE } from "../../queries/protocols";

const Protocols = ({ deviceId }) => {
  const { currentUser } = useAuthContext();
  const protocolsQuery = useQuery(GET_PROTOCOLS_FROM_DEVICE, {
    variables: { device: Number(deviceId) },
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const protocols = protocolsQuery.data?.protocols ?? [];

  return (
    <>
      <TabList activeIndex={selectedIndex}>
        {protocols?.length > 0 &&
          protocols.map((protocol, index) => (
            <Button
              key={protocol.id}
              className="col-primary p-1"
              onClick={() => setSelectedIndex(index)}
            >
              {protocol.interface.name}
            </Button>
          ))}

        {currentUser && (
          <Button
            className="col-primary px-1"
            onClick={() => setSelectedIndex(protocols?.length ?? 0)}
          >
            <Icon icon={plus} size="1.5em" className="" />
          </Button>
        )}
      </TabList>

      <div className={css.ProtocolsList}>
        {protocols?.[selectedIndex] && (
          <>
            <ProtocolDetails
              name={protocols[selectedIndex].version}
              details={protocols[selectedIndex].details[0]}
            />

            <CommandList
              protocolId={protocols[selectedIndex].id}
              commands={protocols[selectedIndex].commands}
            />
          </>
        )}

        {selectedIndex === protocols.length && (
          <CreateProtocol
            deviceId={deviceId}
            onCreate={() => protocolsQuery.refetch()}
          />
        )}
      </div>
    </>
  );
};

export default Protocols;
