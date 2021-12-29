import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="HomePage">
      <form onSubmit={handleSubmit} className="container-md flex column gap-1">
        <h2 className="font-xl mt-1 mb-0">Search devices</h2>

        <input
          ref={searchRef}
          className="bg-white"
          placeholder="Model, manufacturer or type..."
        />

        <div className="flex justify-center align-center gap-1">
          <label>Filters:</label>

          <select className="bg-white">
            <option value="" disabled>
              Type
            </option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
          </select>

          <select className="bg-white">
            <option value="" disabled>
              Manufacturer
            </option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
          </select>
        </div>

        <hr className="my-1" />
      </form>

      <div className="container-lg">
        {searchString && (
          <h3 className="font-sm m-0 mb-05 text-center">
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
                  <div className="flex justify-between">
                    <Link to={`/device/${device.id}`} className="m-0 font-bold">
                      {device.model}
                    </Link>
                    <p className="m-0">{device.type}</p>
                  </div>
                  <p className="m-0">{device.manufacturer.name}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
