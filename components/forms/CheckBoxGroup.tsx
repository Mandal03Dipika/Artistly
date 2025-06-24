import { UseFormRegister } from "react-hook-form";

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: string[];
  register: UseFormRegister<any>;
  error?: string;
}

const CheckboxGroup = ({
  label,
  name,
  options = [],
  register,
  error,
}: CheckboxGroupProps) => {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      {options.map((option) => (
        <label key={String(option)} className="block">
          <input
            type="checkbox"
            value={option}
            {...register(name)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;
