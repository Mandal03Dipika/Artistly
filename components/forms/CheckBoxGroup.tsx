"use client";
import { FieldComponentProps } from "@/types";

const CheckBoxGroup = <T extends Record<string, any>>({
  label,
  name,
  options = [],
  register,
  error,
}: FieldComponentProps<T>) => (
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

export default CheckBoxGroup;
