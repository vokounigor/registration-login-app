import { FC, useEffect, useRef } from "react";
import "./css/input.css";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon: string;
  iconAlt: string;
  spacer?: string;
  error?: boolean;
  errorText?: string;
}

const Input: FC<InputProps> = ({
  icon,
  iconAlt,
  name,
  spacer,
  error,
  errorText,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      ref.current?.classList.add("form-error");
    } else {
      ref.current?.classList.remove("form-error");
    }
  }, [error, ref]);

  return (
    <div className="icon-input-spacer" style={{ marginBottom: spacer }}>
      <label htmlFor={name}>
        <img src={icon} alt={iconAlt} />
      </label>
      <div ref={ref} className="input-error-wrapper">
        <input {...props} className="input-styled" name={name} id={name} />
        {error && <p>{errorText}</p>}
      </div>
    </div>
  );
};

export default Input;
