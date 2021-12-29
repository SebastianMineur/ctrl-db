import { useRef, useState } from "react";
import { search } from "../services/strapi";
import "./HomePage.css";

const HomePage = () => {
  const searchRef = useRef();
  const [searchString, setSearchString] = useState();
  const [results, setResults] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchRef.current.value === "") {
      return;
    }

    try {
      const response = await search(searchRef.current.value);
      setSearchString(searchRef.current.value);
      setResults(response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="HomePage container-lg">
      <h2 className="font-xl mt-1 mb-0">Find device</h2>

      <p className="mt-0">Search by model, manufacturer or device type.</p>

      <form onSubmit={handleSubmit} className="flex column gap-05">
        <input ref={searchRef} className="bg-white" />
      </form>

      {searchString && (
        <h3 className="font-sm m-0 px-1 py-05 mt-1 text-center">
          {results?.length
            ? `${results.length} result(s) for '${searchRef.current.value}'`
            : `No results for '${searchRef.current.value}'`}
        </h3>
      )}

      {results?.length > 0 && (
        <>
          <div className="ResultsList bg-white rounded b-1">
            {results.map((device) => (
              <div key={device.id} className="SearchResult p-1">
                <p className="m-0 font-bold">{device.manufacturer.name}</p>
                <p className="m-0">{device.model}</p>
                <p className="m-0 font-xs font-bold">{device.type}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
