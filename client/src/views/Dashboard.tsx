import { FC, useEffect, useState } from "react";
import { apiRoutes } from "../config/apiRoutes";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

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
        navigate("/login");
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    try {
      const res = await axios.get(apiRoutes.logout);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError("Error logging out. Please try again.");
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <p>
        Hello {firstName} {lastName}!
      </p>
      <Button text="Logout" onClick={handleClick} />
    </div>
  );
};

export default Dashboard;
