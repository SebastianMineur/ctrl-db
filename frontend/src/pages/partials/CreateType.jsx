import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

import {
  GET_DEVICE_TYPES,
  CREATE_DEVICE_TYPE,
} from "../../queries/device-types";
import "./css/CreateType.css";

const CreateType = ({ onCancel, onCreate }) => {
  const [typeName, setTypeName] = useState();
  const [error, setError] = useState();
  const query = useQuery(GET_DEVICE_TYPES);
  const [mutate, mutation] = useMutation(CREATE_DEVICE_TYPE);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      query.data.deviceTypes.data.some((b) => {
        return b.attributes.name.toLowerCase() == typeName.toLowerCase();
      })
    ) {
      setError("A type with this name already exists");
      return;
    }
    mutate({
      variables: { name: typeName },
      onCompleted() {
        if (typeof onCreate === "function") onCreate();
      },
    });
  };

  return (
    <form
      className="CreateType flex column gap-2 bg-light px-2 py-2 radius-sm"
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="font-lg m-0">Add new device type</h1>
        <p className="m-0">Type of device.</p>
      </div>

      <div className="flex column">
        <Input
          value={typeName ?? ""}
          onChange={(e) => {
            setTypeName(e.target.value), setError();
          }}
          className="bg-white"
          required
          error={error}
        />
      </div>

      <div className="flex justify-center gap-1">
        <Button
          type="reset"
          variant="outline"
          color="light"
          onClick={() => {
            if (typeof onCancel === "function") onCancel();
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="filled"
          color="primary"
          disabled={query.loading || mutation.loading}
        >
          {query.loading || mutation.loading ? (
            <>
              <Spinner /> Creating
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateType;
