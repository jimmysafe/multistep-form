import React from "react";
import Button from "./Button";

type FormType = {
  isFirstStep: boolean;
  isFinalStep: boolean;
  children: React.ReactNode;
  handleNextStep: () => void;
  handleBackStep: () => void;
  handleSubmit: () => void;
};

const Form = ({
  children,
  isFinalStep,
  isFirstStep,
  handleNextStep,
  handleBackStep,
  handleSubmit,
}: FormType) => {
  const handleNextClick = () => {
    if (isFinalStep) return handleSubmit();
    return handleNextStep();
  };

  return (
    <form className="w-full bg-white rounded-md shadow-sm p-4 mx-10">
      {children}
      <div className="flex gap-4 mt-8 justify-between">
        <Button onClick={handleBackStep} disabled={isFirstStep}>
          Back
        </Button>
        <Button onClick={handleNextClick}>
          {isFinalStep ? "Submit" : "Save & Next"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
