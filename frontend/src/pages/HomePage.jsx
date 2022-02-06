import { useState } from "react";
import SearchForm from "./partials/SearchForm";
import DeviceList from "./partials/DeviceList";
import { useQuery } from "@apollo/client";
import { SEARCH_DEVICES } from "../queries/devices";
import "./HomePage.css";

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
    <div className="HomePage">
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
            {results?.devices?.data?.length
              ? `${results.devices.data.length} result(s)`
              : `No results`}
          </h3>
        )}

        {results?.devices?.data?.length > 0 && (
          <DeviceList devices={results.devices.data} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
