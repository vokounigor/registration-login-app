import { FC, FormEvent, useState } from "react";
import axios from "../config/axios";
import { apiRoutes } from "../config/apiRoutes";
import { AxiosError } from "axios";
import Input from "../components/Input";
import EmailIcon from "../assets/icons/email.png";
import Button from "../components/Button";

const LandingPage: FC = () => {
  const [password, setPassword] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [inputMail, setInputMail] = useState<String>("");

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || !email) return;

    try {
      const res = await axios.post(apiRoutes.login, { email, password });
      const data = await res.data;

      res.status === 200 && console.log(data);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.code, err.message, err.response?.status);
    }
  };

  const handleLogout = () => {
    axios.get(apiRoutes.logout).then((res) => console.log(res));
  };

  const getDashboard = () => {
    axios.get(apiRoutes.dashboard).then((res) => console.log(res));
  };

  return (
    <div>
      <form method="POST">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleClick}>
          Login
        </button>
      </form>
      <br />
      <button onClick={handleLogout}>Logout</button>
      <br />
      <button onClick={getDashboard}>Dashboard</button>
      <br />
      <br />
      <br />
      <Input
        type="email"
        name="email"
        icon={EmailIcon}
        iconAlt="email icon"
        onChange={(e) => setInputMail(e.target.value)}
        placeholder="Your email address"
      />
      <Button text="Register" />
    </div>
  );
};

export default LandingPage;
