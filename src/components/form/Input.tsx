import { InputHTMLAttributes, ReactPortal, useEffect, useState } from "react";
import { RegisterOptions, FieldValues, Path } from "react-hook-form";
import { IStepFieldData } from "./Step";

interface IInput<T extends FieldValues>
  extends IStepFieldData<T>,
    InputHTMLAttributes<T> {
  name: Path<T>;
  label?: string;
  validate?: RegisterOptions<T>;
  draftId?: string;
}

const Input = <T extends FieldValues>(props: IInput<T>) => {
  const { register, name, label, validate, watch, draftId, errors } = props;
  const [timer, setTimer] = useState<any>(null);

  const value = watch && watch(name);
  const error = errors && (errors[name]?.message as ReactPortal);

  /**
   * UPDATE DRAFT on value change (draftId must exists)
   */
  useEffect(() => {
    if (value) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      setTimer(
        setTimeout(() => {
          console.log("UPDATE DRAFT: ", name, value);
        }, 1000)
      );
    }
  }, [value]);

  /**
   * Unregister on unmount.
   */
  useEffect(() => {
    return () => props.unregister && props.unregister(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {label && <p className="mb-1 text-gray-400 text-sm">{label}</p>}
      <input
        className="border border-gray-200 rounded-sm p-2 w-full"
        {...register(name, validate ?? {})}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </>
  );
};

export default Input;
