import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  secondary?: boolean;
}

const Button = (props: IButtonProps) => {
  const { secondary, children } = props;

  return (
    <button
      type="button"
      {...props}
      className={`rounded-lg px-5 py-2 text-white font-semibold uppercase text-sm ${
        secondary ? "bg-black" : "bg-blue-600"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
