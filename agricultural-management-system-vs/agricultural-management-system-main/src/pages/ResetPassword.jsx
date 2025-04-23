import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResetPassword.css"; // Adjust the path to your CSS file

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query params for email and token
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get("email") || "";
  const tokenFromQuery = queryParams.get("token") || "";

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    token: Yup.string().required("Token is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
        "Password must contain at least one lowercase letter, one digit, and one special character"
      )
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log("Reset password form submitted with values:", values);
    try {
      const payload = {
        email: values.email,
        token: values.token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

      console.log("Submitting reset password request...");
      const response = await api.post("/api/Accounts/ResetPassword", payload);
      console.log("Response from reset password API:", response);
      setSuccessMessage(response.data.message || "Password reset successful");
      setSubmitting(false);
      // Optionally navigate after a delay
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.Message || "Error resetting password");
      } else {
        alert("Error resetting password");
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <Formik
        initialValues={{
          email: emailFromQuery,
          token: tokenFromQuery,
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <Form>
              <div className="form-group">
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
                {errors.email && touched.email && (
                  <div className="error">Error: {errors.email}</div>
                )}
              </div>
              <div className="form-group" style={{ display: "none" }}>
                <Field type="text" name="token" />
                <ErrorMessage name="token" component="div" className="error" />
                {errors.token && touched.token && (
                  <div className="error">Error: {errors.token}</div>
                )}
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="error"
                />
                {errors.newPassword && touched.newPassword && (
                  <div className="error">Error: {errors.newPassword}</div>
                )}
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="error">Error: {errors.confirmPassword}</div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn "
              >
                Reset Password
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
