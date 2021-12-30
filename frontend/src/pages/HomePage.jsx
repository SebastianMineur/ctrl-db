import { useState } from "react";
import SearchForm from "./partials/SearchForm";
import DeviceList from "./partials/DeviceList";
import { useSearchQuery } from "../hooks/useSearchQuery";
import "./HomePage.css";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const {
    data: results,
    loading,
    error,
  } = useSearchQuery({ variables: { search }, skip: !Boolean(search) });

  const handleSearch = async (search) => {
    setSearch(search);
  };

  return (
    <div className="HomePage">
      <SearchForm onSearch={handleSearch} />

      <div className="container-lg">
        {loading && <p className="m-0 text-center">Loading...</p>}

        {error && (
          <p className="p-1 m-0 text-center bg-danger rounded b-1">{error}</p>
        )}

        {Boolean(search) && (
          <h3 className="font-sm m-0 mb-05 text-center">
            {results?.length
              ? `${results.length} result(s) for '${search}'`
              : `No results for '${search}'`}
          </h3>
        )}

        {results?.length > 0 && <DeviceList devices={results} />}
      </div>
    </div>
  );
};

export default HomePage;
