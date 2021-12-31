import { useRef } from "react";

const SearchForm = ({ onSearch }) => {
  const searchRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(searchRef.current.value);
  };

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
            Brand
          </option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
      </div>

      <hr className="my-1" />
    </form>
  );
};

export default SearchForm;
