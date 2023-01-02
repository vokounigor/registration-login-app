import { ChangeEvent, FC, FormEvent, useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import ContainerWrapper from "../components/ContainerWrapper";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../utils/validators";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../config/apiRoutes";
import { AxiosError } from "axios";

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
  const [validationErrors, setValidationErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>("");

  // Check if a user is already logged in
  useEffect(() => {
    const checkRegister = async () => {
      try {
        await axios.post(apiRoutes.register, {});
      } catch (err) {
        const error = err as AxiosError;
        const errorData = error.response?.data as {
          code: string;
          message: string;
        };

        const hasErrorCode =
          errorData && Object.prototype.hasOwnProperty.call(errorData, "code");

        if (hasErrorCode && errorData.code === "400.0.6") {
          setSubmitError("You are already logged in. Redirecting to dashboard");
          navigate("/");
          return;
        }
      }
    };
    checkRegister();
    // eslint-disable-next-line
  }, []);

  const clearValidationErrors = () => {
    setValidationErrors({
      password: false,
      email: false,
      firstName: false,
      lastName: false,
    });
  };

  const emailValidation = (email: string) => {
    if (!validateEmail(email)) {
      setValidationErrors({ ...validationErrors, email: true });
      return;
    }
    clearValidationErrors();
  };

  const passwordValidation = (password: string) => {
    if (!validatePassword(password)) {
      setValidationErrors({ ...validationErrors, password: true });
      return;
    }
    clearValidationErrors();
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    emailValidation(value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    passwordValidation(value);
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    if (!validateName(value)) {
      setValidationErrors({ ...validationErrors, firstName: true });
      return;
    }
    clearValidationErrors();
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    if (!validateName(value)) {
      setValidationErrors({ ...validationErrors, lastName: true });
      return;
    }
    clearValidationErrors();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Prevent submit when something is empty
    if (!firstName || !lastName || !email || !password) return;
    // Prevent submitting faulty values
    if (validationErrors.email || validationErrors.password) return;

    clearValidationErrors();
    try {
      const res = await axios.post(apiRoutes.register, {
        firstName,
        lastName,
        email,
        password,
      });
      // User was created successfully
      if (res.status === 201) {
        navigate("/");
      }
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as {
        code: string;
        message: string;
      };

      const hasErrorCode =
        errorData && Object.prototype.hasOwnProperty.call(errorData, "code");

      if (hasErrorCode && errorData.code === "400.0.4") {
        setSubmitError("A user with that email address already exists.");
        return;
      }

      if (hasErrorCode && errorData.code === "400.0.6") {
        setSubmitError("You are already logged in. Redirecting to dashboard");
        navigate("/");
        return;
      }

      setSubmitError(
        "An error occurred while submitting data. Please try again."
      );
    }
  };

  return (
    <ContainerWrapper>
      <div className="registration-form__wrapper">
        <h1 className="registration-form__title">Sign up</h1>
        {submitError && <h3 className="submit-error">{submitError}</h3>}
        <form method="POST">
          <Input
            type="text"
            name="firstName"
            icon={FirstNameIcon}
            iconAlt="first name"
            onChange={handleFirstNameChange}
            placeholder="First Name*"
            error={validationErrors.firstName}
            errorText="First name is required"
            spacer="25px"
          />
          <Input
            type="text"
            name="lastName"
            icon={LastNameIcon}
            iconAlt="last name"
            onChange={handleLastNameChange}
            placeholder="Last Name*"
            error={validationErrors.lastName}
            errorText="Last name is required"
            spacer="25px"
          />
          <Input
            type="email"
            name="email"
            icon={EmailIcon}
            iconAlt="email"
            onChange={handleEmailChange}
            placeholder="Email*"
            spacer="25px"
            error={validationErrors.email}
            errorText="Please provide a valid email address"
          />
          <Input
            type="password"
            name="password"
            icon={PasswordIcon}
            iconAlt="password"
            onChange={handlePasswordChange}
            placeholder="Password*"
            spacer="15px"
            error={validationErrors.password}
            errorText="Password should be minimum 6 characters in length"
          />
          <p style={{ fontSize: "12px", marginBottom: "1em" }}>
            * - required field
          </p>
          <Button
            type="submit"
            text="Sign up"
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
    </ContainerWrapper>
  );
};

export default Registration;
