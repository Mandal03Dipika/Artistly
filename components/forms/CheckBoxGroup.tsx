import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface CheckboxGroupProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options: string[];
  register: UseFormRegister<T>;
  error?: string;
}

const CheckBoxGroup = <T extends FieldValues>({
  label,
  name,
  options = [],
  register,
  error,
}: CheckboxGroupProps<T>) => {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      {options.map((option) => (
        <label key={option} className="block">
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

export default CheckBoxGroup;
