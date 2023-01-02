import { FC, FormEvent, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

// Css and images
import "./css/registration.css";
import FirstNameIcon from "../assets/icons/first-name.png";
import LastNameIcon from "../assets/icons/last-name.png";
import EmailIcon from "../assets/icons/email.png";
import PasswordIcon from "../assets/icons/password.png";
import RegistrationImage from "../assets/images/register.png";

const Registration: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // TODO: Validation
  const handleSubmit = (e: FormEvent) => {
	e.preventDefault();
	console.log(firstName, lastName, email, password);
	console.log("Submit action");
  }

  return (
    <div className="flex-wrapper">
      <div className="container container__wrapper content-flex">
        <div className="registration-form__wrapper">
          <h1 className="registration-form__title">Sign up</h1>
          <form method="POST">
            <Input
              type="text"
              name="firstName"
              icon={FirstNameIcon}
              iconAlt="first name"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              spacer="25px"
            />
            <Input
              type="text"
              name="lastName"
              icon={LastNameIcon}
              iconAlt="last name"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              spacer="25px"
            />
            <Input
              type="email"
              name="email"
              icon={EmailIcon}
              iconAlt="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              spacer="25px"
            />
            <Input
              type="password"
              name="password"
              icon={PasswordIcon}
              iconAlt="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              spacer="25px"
            />
            <Button
              type="submit"
              text="Register"
              style={{ width: "100%", fontSize: "18px" }}
			  onClick={handleSubmit}
            />
          </form>
          <p className="registration-form__bottom-text">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
        <div className="image-container">
          <img
            src={RegistrationImage}
            alt="register"
            className="image-container__image"
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
