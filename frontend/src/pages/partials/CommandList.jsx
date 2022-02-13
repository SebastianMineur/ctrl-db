const hexToAscii = (hex) => {
  const arr = [];
  for (let i = 0; i < hex.length; i += 2) {
    const char = hex.slice(i, i + 2);
    arr.push(parseInt(char, 16));
  }
  return String.fromCharCode(...arr);
};

const CommandList = ({ commands }) => {
  return (
    <div className="grid column gap-1 p-1">
      {!commands?.length && <p className="m-0">No commands added</p>}

      {commands?.map((command) => (
        <div key={command.id} className="flex align-center gap-1">
          <label className="m-0">{command.attributes.description}</label>

          <p className="bg-white b-1 radius-sm px-1 pt-025 pb-05 m-0">
            {command.attributes.code}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommandList;
