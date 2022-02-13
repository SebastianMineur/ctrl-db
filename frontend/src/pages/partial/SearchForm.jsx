import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BRANDS } from "../../queries/brands";
import { GET_DEVICE_TYPES } from "../../queries/device-types";

const SearchForm = ({ onSearch }) => {
  const searchRef = useRef();
  const [searchText, setSearchText] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedBrand, setSelectedBrand] = useState();

  const typesQuery = useQuery(GET_DEVICE_TYPES);
  const brandsQuery = useQuery(GET_BRANDS);

  const typeOptions = typesQuery.data?.deviceTypes.data;
  const brandOptions = brandsQuery.data?.brands.data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchText == searchRef.current.value) return;
    setSearchText(searchRef.current.value);
  };

  useEffect(() => {
    onSearch({
      search: searchText || undefined,
      type: selectedType || undefined,
      brand: selectedBrand || undefined,
    });
  }, [searchText, selectedType, selectedBrand]);

  return (
    <form onSubmit={handleSubmit} className="container-md flex column gap-1">
      <h2 className="font-xl mt-1 mb-0">Search devices</h2>

      <input
        ref={searchRef}
        className="bg-white"
        placeholder="Model, brand or type..."
      />

      <div className="flex justify-center align-center gap-1">
        <label>Filters:</label>

        <select
          className="bg-white"
          value={selectedType || ""}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Any type</option>
          {typeOptions?.map((deviceType) => (
            <option value={deviceType.id} key={deviceType.id}>
              {deviceType.attributes.name}
            </option>
          ))}
        </select>

        <select
          className="bg-white"
          value={selectedBrand || ""}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Any brand</option>
          {brandOptions?.map((brand) => (
            <option value={brand.id} key={brand.id}>
              {brand.attributes.name}
            </option>
          ))}
        </select>
      </div>

      <hr className="my-1" />
    </form>
  );
};

export default SearchForm;
