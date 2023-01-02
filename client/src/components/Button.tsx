import { FC } from "react";
import "./css/button.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}

const Button: FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <button className="button-styled" {...props}>
      {text}
    </button>
  );
};

export default Button;
