import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import * as cls from "classnames";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

import { GET_BRANDS, CREATE_BRAND } from "../../queries/brands";
import css from "./css/CreateBrand.module.css";

const CreateBrand = ({ onCancel, onCreate }) => {
  const [brandName, setBrandName] = useState();
  const [error, setError] = useState();
  const query = useQuery(GET_BRANDS);
  const [mutation, mutationResult] = useMutation(CREATE_BRAND);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      query.data.brands.data.some((b) => {
        return b.attributes.name.toLowerCase() == brandName.toLowerCase();
      })
    ) {
      setError("A brand with this name already exists");
      return;
    }
    mutation({
      variables: { name: brandName },
      onCompleted() {
        if (typeof onCreate === "function") onCreate();
      },
    });
  };

  return (
    <form
      className={cls(
        css.CreateBrand,
        "flex column gap-2 bg-light px-2 py-2 radius-sm"
      )}
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="font-lg m-0">Add new brand</h1>
        <p className="m-0">Brand or manufacturer name.</p>
      </div>

      <div className="flex column">
        <Input
          value={brandName ?? ""}
          onChange={(e) => {
            setBrandName(e.target.value), setError();
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
          disabled={query.loading || mutationResult.loading}
        >
          {query.loading || mutationResult.loading ? (
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

export default CreateBrand;
