import { useState } from "react";
import { useQuery } from "@apollo/client";

import SearchForm from "./partial/SearchForm";
import DeviceList from "./partial/DeviceList";
import { SEARCH_DEVICES } from "../queries/devices";

const HomePage = () => {
  const [searchOptions, setSearchOptions] = useState({});

  const {
    data: results,
    loading,
    error,
  } = useQuery(SEARCH_DEVICES, {
    variables: {
      search: searchOptions.search || "",
      type: searchOptions.type,
      brand: searchOptions.brand,
    },
  });

  const handleSearch = async (options) => {
    setSearchOptions(options);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />

      <div className="container-lg">
        {loading && <p className="m-0 text-center">Loading...</p>}

        {error && (
          <p className="p-1 m-0 text-center bg-danger rounded b-1">
            {error.message}
          </p>
        )}

        {Object.values(searchOptions).length > 0 && (
          <h3 className="font-sm m-0 mb-05 text-center">
            {results?.devices?.length
              ? `${results.devices.length} result(s)`
              : `No results`}
          </h3>
        )}

        {results?.devices?.length > 0 && (
          <DeviceList devices={results.devices} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
