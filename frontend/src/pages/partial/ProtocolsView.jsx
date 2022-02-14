import { useState } from "react";

import Button from "../../components/Button";
import Icon from "../../components/Icon";
import TabList from "../../components/TabList";
import ProtocolDetails from "./ProtocolDetails";
import CommandList from "./CommandList";

import { plus } from "../../assets/icons";
import css from "./css/Protocols.module.css";

const Protocols = ({ protocols }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!protocols?.length) return <p className="m-0">No protocols added</p>;

  return (
    <>
      <TabList activeIndex={selectedIndex}>
        {protocols.map((protocol, index) => (
          <Button
            key={protocol.id}
            className="col-primary p-1"
            onClick={() => setSelectedIndex(index)}
          >
            {protocol.interface.name}
          </Button>
        ))}
        <Button className="col-primary px-1" onClick={() => {}}>
          <Icon icon={plus} size="1.5em" className="" />
        </Button>
      </TabList>

      {protocols?.[selectedIndex] && (
        <div className={css.ProtocolsList}>
          <ProtocolDetails
            name={protocols[selectedIndex].version}
            details={protocols[selectedIndex].details[0]}
          />

          <CommandList
            protocolId={protocols[selectedIndex].id}
            commands={protocols[selectedIndex].commands}
          />
        </div>
      )}
    </>
  );
};

export default Protocols;
