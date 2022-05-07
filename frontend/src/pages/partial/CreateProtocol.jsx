import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Button from "../../components/Button";
import Input from "../../components/Input";
import ProtocolDetailsForm from "./ProtocolDetailsForm";

import { GET_INTERFACES } from "../../queries/interfaces";
import { CREATE_PROTOCOL } from "../../queries/protocols";

const CreateProtocol = ({ deviceId, onCreate }) => {
  const interfacesQuery = useQuery(GET_INTERFACES);
  const [createProtocol] = useMutation(CREATE_PROTOCOL);

  const [interfaceId, setInterfaceId] = useState();
  const [selectedType, setSelectedType] = useState();
  const [version, setVersion] = useState();
  const [formData, setFormData] = useState();

  useEffect(() => {
    if (!interfacesQuery.data) return;
    setSelectedType(
      interfacesQuery.data.interfaces.find(
        (interfaceType) => interfaceType.id == interfaceId
      )
    );
  }, [interfaceId]);

  const onFormChange = (data) => {
    setFormData({
      version: Number(version),
      interface: Number(interfaceId),
      device: Number(deviceId),
      details: {
        __typename: selectedType.details_component,
        ...data,
      },
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    createProtocol({
      variables: formData,
      onCompleted(result) {
        console.log(result);
        onCreate();
      },
    });
  };

  return (
    <form className="bg-white p-1 flex column gap-1" onSubmit={submitForm}>
      <h4 className="font-md font-bold m-0">Create protocol</h4>

      <div className="flex flex-wrap gap-1">
        <div className="flex column">
          <label className="font-xs">Interface</label>
          <select
            className="bg-white"
            value={interfaceId || ""}
            onChange={(e) => setInterfaceId(e.target.value)}
            required
          >
            <option value=""></option>
            {interfacesQuery.data?.interfaces.map((interfaceType) => (
              <option value={interfaceType.id} key={interfaceType.id}>
                {interfaceType.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex column flex-grow">
          <label className="font-xs">
            Name <span className="font-normal col-light">(optional)</span>
          </label>
          <Input
            className="bg-white"
            onChange={(e) => setVersion(e.target.value)}
          />
        </div>
      </div>

      {selectedType && (
        <ProtocolDetailsForm
          type={selectedType.details_component}
          onChange={onFormChange}
        />
      )}

      <div className="w-100 flex justify-center gap-1">
        <Button type="submit" variant="filled" color="success">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateProtocol;
