import React, { Dispatch, SetStateAction } from "react";
import {
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormUnregister,
  UseFormWatch,
} from "react-hook-form";
import Button from "./Button";

export interface IStep<T extends FieldValues> {
  title: string;
  description: string;
  fields: IStepField<T>[];
}

export type IStepField<T extends FieldValues> = (
  data: IStepFieldData<T>
) => JSX.Element;

// !When adding a new field make sure to add it in below Step Renderer function
export interface IStepFieldData<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  unregister: UseFormUnregister<T>;
}

type StepProps<T extends FieldValues> = {
  visible: boolean;
  step: IStep<T>;
  isLast: boolean;
  isFirst: boolean;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

const _Step = <T extends FieldValues>({
  visible,
  step,
  isLast,
  isFirst,
  setActiveStep,
}: StepProps<T>) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    unregister,
  } = useForm();

  const handleSave = (data: any) => {
    if (!isLast) setActiveStep((prev) => prev + 1);
    console.log(data);
  };

  const handleBackPress = () => {
    if (!isFirst) setActiveStep((prev) => prev - 1);
  };

  /**
   * !STEPS RENDER
   */
  const _renderSteps = () => {
    return step.fields.map((field) =>
      field({ register, errors, watch, unregister } as IStepFieldData<T>)
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className={`${visible ? "block" : "hidden"}`}
    >
      <>
        {_renderSteps()}
        <div className="flex gap-4 mt-8 justify-between">
          <Button onClick={handleBackPress} disabled={isFirst}>
            Back
          </Button>
          <Button type="submit">{isLast ? "Submit" : "Save & Next"}</Button>
        </div>
      </>
    </form>
  );
};

export default _Step;
