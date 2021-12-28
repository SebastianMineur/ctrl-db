const DevicePage = () => {
  return (
    <div className="container-lg">
      <h2 className="font-xl mt-1 mb-0">Create new device</h2>
      <p className="mt-0">
        A device is any product that can receive control commands.
      </p>

      <hr />

      <div className="flex column gap-05">
        <label>Model code</label>
        <input className="bg-white mb-1" />
      </div>

      <div className="flex column gap-05">
        <label>Device name</label>
        <input className="bg-white mb-1" />
      </div>

      <div className="flex column gap-05">
        <label>Manufacturer</label>
        <select className="bg-white mb-1">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
      </div>

      <div className="flex column gap-05">
        <label>Type</label>
        <select className="bg-white">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
      </div>

      <hr className="my-2" />

      <div className="flex justify-center gap-1">
        <button className="">Cancel</button>
        <button className="bg-primary">Submit</button>
      </div>
    </div>
  );
};

export default DevicePage;
