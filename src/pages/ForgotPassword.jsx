import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../services/api";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  console.log("Forget Password Page Rendered");

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await api.post("/api/Accounts/SendEmail", { email: values.email });
      setMessage(response.data.message || "Password reset link sent successfully.");
      setError('');
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Forgot Password</h2>
      <Formik
        initialValues={{ email: "" }} // Initial form values
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="form-control"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <button type="submit" className="submit-btn">Send Reset Link</button>
        </Form>
      </Formik>

      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgetPassword;
