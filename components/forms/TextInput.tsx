"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { FieldComponentProps } from "@/types";

const TextInput = <T extends Record<string, any>>({
  label,
  name,
  register,
  error,
}: FieldComponentProps<T>) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <input
      id={name}
      {...register(name)}
      type="text"
      className={cn(
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white",
        error && "border-red-500 focus:ring-red-500"
      )}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export default TextInput;
