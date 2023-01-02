import { FC, PropsWithChildren } from "react";
import "./css/formWrapper.css";

const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex-wrapper">
      <div className="container container__wrapper content-flex">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
