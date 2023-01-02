import { FC } from "react";
import ContainerWrapper from "../components/ContainerWrapper";

// CSS and images
import "./css/error.css";
import ErrorImage from "../assets/images/error.png";

const Error: FC = () => {
  return (
    <ContainerWrapper>
      <div className="error-wrapper">
        <h1>Error: 404</h1>
        <h3>Whoops! The requested page does not exist.</h3>
        <img src={ErrorImage} alt="an error occurred" />
        <p>
          Return back to{" "}
          <a href="/" className="home-link">
            Home page
          </a>
        </p>
      </div>
    </ContainerWrapper>
  );
};

export default Error;
