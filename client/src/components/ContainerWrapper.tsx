import { FC, PropsWithChildren } from "react";
import "./css/containerWrapper.css";

const ContainerWrapper: FC<
  PropsWithChildren<{ style?: Record<string, string> }>
> = ({ children, style }) => {
  return (
    <div className="flex-wrapper">
      <div style={style} className="container container__wrapper content-flex">
        {children}
      </div>
    </div>
  );
};

export default ContainerWrapper;
