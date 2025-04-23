import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5132/api/Accounts/ForgotPassword', {
        email: values.email,
      });
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setMessage(
        error.response?.data?.Message ||
        'Error sending password reset email. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Field name="email" type="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Send Reset Email
            </button>
          </Form>
        )}
      </Formik>
      <button onClick={() => navigate('/signin')}>Back to Sign In</button>
    </div>
  );
};

export default ForgotPassword;
