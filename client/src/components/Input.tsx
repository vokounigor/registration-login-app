import { FC } from "react";
import "./css/input.css";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon: string;
  iconAlt: string;
  spacer?: string;
}

const Input: FC<InputProps> = ({ icon, iconAlt, name, spacer, ...props }) => {
  return (
    <div className="icon-input-spacer" style={{ marginBottom: spacer }}>
      <label htmlFor={name}>
        <img src={icon} alt={iconAlt} />
      </label>
      <input {...props} className="input-styled" name={name} id={name} />
    </div>
  );
};

export default Input;
