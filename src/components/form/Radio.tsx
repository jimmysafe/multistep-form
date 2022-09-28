import React, { InputHTMLAttributes, ReactPortal, useEffect } from "react";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";
import { IStepFieldData } from "./Step";

interface RadioProps<T extends FieldValues>
  extends IStepFieldData<T>,
    InputHTMLAttributes<T> {
  value: string;
  name: Path<T>;
  validate?: RegisterOptions<T>;
  label: string;
}

const Radio = <T extends FieldValues>({
  value,
  name,
  register,
  validate,
  label,
  watch,
  errors,
}: RadioProps<T>) => {
  const val = watch && watch(name);
  const error = errors && (errors[name]?.message as ReactPortal);

  useEffect(() => {
    if (val) console.log("UPDATE DRAFT: ", name, val);
  }, [val]);

  return (
    <>
      <div className="flex justify-between items-center">
        <p>{label}</p>
        <input
          type="radio"
          value={value}
          id={name}
          {...register(name, validate ?? {})}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </>
  );
};

export default Radio;
