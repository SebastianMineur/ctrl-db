import { useState } from "react";

import Button from "../../components/Button";
import Icon from "../../components/Icon";
import ProtocolDetails from "./ProtocolDetails";
import { plus } from "../../assets/icons";
import css from "./css/Protocols.module.css";
import TabList from "../../components/TabList";
import CommandList from "./CommandList";

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
            {protocol.attributes.connection.data.attributes.name}
          </Button>
        ))}
        <Button className="col-primary px-1" onClick={() => {}}>
          <Icon icon={plus} size="1.5em" className="" />
        </Button>
      </TabList>

      {protocols?.length > 0 && (
        <div className={css.ProtocolsList}>
          <ProtocolDetails
            name={protocols[selectedIndex].attributes.name}
            details={protocols[selectedIndex].attributes.details[0]}
          />

          <CommandList
            commands={protocols[selectedIndex].attributes.commands.data}
          />
        </div>
      )}
    </>
  );
};

export default Protocols;
