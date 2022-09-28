import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import Step, { IStep } from "./components/form/Step";

type MultiStepFormProps<T extends FieldValues> = {
  steps: IStep<T>[];
};

const MultiStepForm = <T extends FieldValues>({
  steps,
}: MultiStepFormProps<T>) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div>
      {steps.map((step, index) => (
        <Step
          key={index}
          visible={activeStep === index}
          step={step}
          setActiveStep={setActiveStep}
          isFirst={activeStep === 0}
          isLast={activeStep === steps.length - 1}
        />
      ))}
    </div>
  );
};

export default MultiStepForm;
