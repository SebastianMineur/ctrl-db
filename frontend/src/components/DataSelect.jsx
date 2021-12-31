const Select = ({ data, ...rest }) => {
  return (
    <select {...rest}>
      <option value="" disabled></option>
      {data?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.attributes.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
