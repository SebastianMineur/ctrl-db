import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import Button from "../components/Button";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import CreateBrand from "./partial/CreateBrand";
import CreateType from "./partial/CreateType";

import { GET_BRANDS } from "../queries/brands";
import { CREATE_DEVICE } from "../queries/devices";
import { GET_DEVICE_TYPES } from "../queries/device-types";
import { plus } from "../assets/icons";

const CreateDevicePage = () => {
  const [model, setModel] = useState();
  const [brand, setBrand] = useState();
  const [type, setType] = useState();
  const brandsQuery = useQuery(GET_BRANDS);
  const typesQuery = useQuery(GET_DEVICE_TYPES);
  const [deviceMutation] = useMutation(CREATE_DEVICE);
  const navigate = useNavigate();

  const [showCreateBrand, setShowCreateBrand] = useState();
  const [showCreateType, setShowCreateType] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    deviceMutation({
      variables: { model, brand, device_type: type },
      onCompleted(data) {
        navigate(data.createDevice.data.id);
      },
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setModel(null);
    setBrand(null);
    setType(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="container-lg"
      >
        <h2 className="font-xl mt-1 mb-0">Create new device</h2>
        <p className="mt-0">
          A device can be any piece of hardware capable of receiving control
          commands.
        </p>

        <hr />

        <div className="flex column gap-05">
          <label>Model</label>
          <input
            value={model ?? ""}
            onChange={(e) => setModel(e.target.value)}
            className="bg-white mb-1"
            required
          />
        </div>

        <div className="flex column gap-05">
          <label>Brand</label>
          <div className="flex gap-1 mb-1">
            <select
              required
              className="bg-white flex-grow"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            >
              <option value=""></option>
              {brandsQuery.data?.brands.data.map((brand) => (
                <option value={brand.id} key={brand.id}>
                  {brand.attributes.name}
                </option>
              ))}
            </select>

            <Button
              type="button"
              variant="outline"
              color="primary"
              onClick={() => setShowCreateBrand(true)}
            >
              <Icon icon={plus} size="1.5em" />
            </Button>
          </div>
        </div>

        <div className="flex column gap-05">
          <label>Type</label>
          <div className="flex gap-1 mb-1">
            <select
              required
              className="bg-white flex-grow"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value=""></option>
              {typesQuery.data?.deviceTypes.data.map((type) => (
                <option value={type.id} key={type.id}>
                  {type.attributes.name}
                </option>
              ))}
            </select>

            <Button
              type="button"
              variant="outline"
              color="primary"
              onClick={() => setShowCreateType(true)}
            >
              <Icon icon={plus} size="1.5em" />
            </Button>
          </div>
        </div>

        <hr className="my-2" />

        <div className="flex justify-center gap-1">
          <Button type="reset" variant="outline" color="danger">
            Reset
          </Button>
          <Button type="submit" variant="filled" color="primary">
            Create
          </Button>
        </div>
      </form>

      {showCreateBrand && (
        <Modal onClick={() => setShowCreateBrand(false)}>
          <div className="container-md">
            <CreateBrand
              onCancel={() => setShowCreateBrand(false)}
              onCreate={async () => {
                await brandsQuery.refetch();
                setShowCreateBrand(false);
              }}
            />
          </div>
        </Modal>
      )}

      {showCreateType && (
        <Modal onClick={() => setShowCreateType(false)}>
          <div className="container-md">
            <CreateType
              onCancel={() => setShowCreateType(false)}
              onCreate={async () => {
                await typesQuery.refetch();
                setShowCreateType(false);
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreateDevicePage;
