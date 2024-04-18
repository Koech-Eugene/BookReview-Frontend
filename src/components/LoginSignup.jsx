// LoginSignup.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./login.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginSignup = () => {
  const history = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      const response = await fetch("http://localhost:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Redirect to homepage after successful login
        history.push("/home");
      } else {
        // Handle failed login
        setLoginError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      const { username, email, password } = values;
      const response = await fetch("http://localhost:5555/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: username , 
          email: email,
          password: password })
      });
      if (response.ok) {
        // Redirect to homepage after successful signup
        //history.push("/home");
        console.log("good")
      } else {
        // Handle failed signup
        setSignupError("Failed to signup. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSignupError("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-signup">
      <div className="login-form">
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div>
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className={errors.email ? "field-error" : ""}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div>
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className={errors.password ? "field-error" : ""}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              {loginError && <div>{loginError}</div>}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="signup-form">
        <h1>Signup</h1>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div>
                <label>Username</label>
                <Field
                  type="text"
                  name="username"
                  className={errors.username ? "field-error" : ""}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>
              <div>
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className={errors.email ? "field-error" : ""}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div>
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className={errors.password ? "field-error" : ""}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              {signupError && <div>{signupError}</div>}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default LoginSignup;