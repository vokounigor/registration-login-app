import { ChangeEvent, FC, FormEvent, useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import FormWrapper from "../components/FormWrapper";
import { validateEmail, validatePassword } from "../utils/validators";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../config/apiRoutes";
import { AxiosError } from "axios";

// Css and images
import "./css/registration.css";
import EmailIcon from "../assets/icons/email.png";
import PasswordIcon from "../assets/icons/password.png";
import LoginImage from "../assets/images/login.png";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>("");

  // Check if a user is already logged in
  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.post(apiRoutes.login, {});
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
    checkLogin();
    // eslint-disable-next-line
  }, []);

  const clearValidationErrors = () => {
    setValidationErrors({ password: false, email: false });
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Prevent submit when something is empty
    if (!email || !password) return;
    // Prevent submitting faulty values
    if (validationErrors.email || validationErrors.password) return;

    clearValidationErrors();
    try {
      const res = await axios.post(apiRoutes.login, {
        email,
        password,
      });
      // User logged in successfully
      if (res.status === 200) {
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

      if (hasErrorCode && errorData.code === "404.0.1") {
        setSubmitError("No user with that email exists.");
        return;
      }

      if (hasErrorCode && errorData.code === "401.0.1") {
        setSubmitError("Incorrect password provided.");
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
    <FormWrapper>
      <div className="registration-form__wrapper">
        <h1 className="registration-form__title">Sign in</h1>
        {submitError && <h3 className="submit-error">{submitError}</h3>}
        <form method="POST">
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
            text="Sign in"
            style={{ width: "100%", fontSize: "18px" }}
            onClick={handleSubmit}
          />
        </form>
        <p className="registration-form__bottom-text">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
      <div className="image-container">
        <img src={LoginImage} alt="login" className="image-container__image" />
      </div>
    </FormWrapper>
  );
};

export default Login;
