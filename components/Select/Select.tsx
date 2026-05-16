interface SelectProps {
  id: string;
  label: string;
  options: string[];
};

export default function Select({ id, label, options }: SelectProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} defaultValue={options[0]}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}