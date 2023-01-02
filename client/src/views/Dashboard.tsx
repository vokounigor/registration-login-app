import { FC, useEffect, useState } from "react";
import { apiRoutes } from "../config/apiRoutes";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import ContainerWrapper from "../components/ContainerWrapper";

// CSS and images
import "./css/dashboard.css";
import DashboardImage from "../assets/images/dashboard.png";

const Dashboard: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(apiRoutes.dashboard);
        const data = await res.data;
        const { firstName, lastName } = data.userInfo;
        setFirstName(firstName);
        setLastName(lastName);
      } catch (err) {
        navigate("/register");
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    try {
      const res = await axios.get(apiRoutes.logout);
      if (res.status === 200) {
        navigate("/register");
      }
    } catch (err) {
      setError("Error logging out. Please try again.");
    }
  };

  return (
    <ContainerWrapper>
      <div className="dashboard-container">
        <h1>
          Welcome {firstName} {lastName}!
        </h1>
        <img src={DashboardImage} alt="dashboard" />
        <button onClick={handleClick} className="logout-button">
          Log Out
        </button>
        {error && <p className="logout-error">{error}</p>}
      </div>
    </ContainerWrapper>
  );
};

export default Dashboard;
