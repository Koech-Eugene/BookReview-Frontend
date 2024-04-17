import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSignup = () => {
  const history = useHistory();
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    dobDay: Yup.number()
      .typeError("Invalid day")
      .min(1, "Day must be between 1 and 31")
      .max(31, "Day must be between 1 and 31")
      .required("Day of Birth is required"),
    dobMonth: Yup.number()
      .typeError("Invalid month")
      .min(1, "Month must be between 1 and 12")
      .max(12, "Month must be between 1 and 12")
      .required("Month of Birth is required"),
    dobYear: Yup.number()
      .typeError("Invalid year")
      .min(1900, "Year must be after 1900")
      .max(new Date().getFullYear(), "Year must be before or equal to current year")
      .required("Year of Birth is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
      const response = await fetch("http://localhost:5555/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        // Redirect to homepage after successful signup
        history.push("/home");
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
      <div className="login">
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label>Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              {loginError && <div>{loginError}</div>}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="signup">
        <h1>Signup</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            dobDay: "",
            dobMonth: "",
            dobYear: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label>First Name</label>
                <Field type="text" name="firstName" />
                <ErrorMessage name="firstName" component="div" />
              </div>
              <div>
                <label>Last Name</label>
                <Field type="text" name="lastName" />
                <ErrorMessage name="lastName" component="div" />
              </div>
              <div>
                <label>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label>Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                <label>Confirm Password</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
              <div>
                <label>Day of Birth</label>
                <Field type="number" name="dobDay" />
                <ErrorMessage name="dobDay" component="div" />
              </div>
              <div>
                <label>Month of Birth</label>
                <Field type="number" name="dobMonth" />
                <ErrorMessage name="dobMonth" component="div" />
              </div>
              <div>
                <label>Year of Birth</label>
                <Field type="number" name="dobYear" />
                <ErrorMessage name="dobYear" component="div" />
              </div>
              {signupError && <div>{signupError}</div>}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default LoginSignup;
