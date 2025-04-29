
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import * as Yup from 'yup';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram } from 'react-icons/fa';
import '../App.css';
import logo from '../assets/images/logo.png'; // Adjust the path to your logo
import './Signup.css';

const Signin = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Form Submitted", values);
      alert("Sign-In Successful");
      
      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Error during sign-in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="square"></div> {/* Customize your loader styles */}
      </div>
    );
  }

  return (
    <div>
      <div className="logo-div">
        <img className="logo-img" src={logo} alt="Logo" />
      </div>

      <div className="signin-wrapper">
        {/* Left Section for Social Sign-In */}
        <div className="left-section">
          <h2>Welcome Back!</h2>
          <p>Sign in to your account</p>
          <div className="social-buttons">
            <button className="social-btn facebook">
              <FaFacebook size={20} /> Sign in with Facebook
            </button>
            <button className="social-btn twitter">
              <FaTwitter size={20} /> Sign in with Twitter
            </button>
            <button className="social-btn google">
              <FaGoogle size={20} /> Sign in with Google
            </button>
            <button className="social-btn instagram">
              <FaInstagram size={20} /> Sign in with Instagram
            </button>
          </div>
        </div>

        {/* Right Section for the Sign-In Form */}
        <div className="right-section">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Username Field */}
                <div className="form-group">
                  <Field name="username" placeholder="Username" />
                  <ErrorMessage name="username" component="div" className="error" />
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <Field name="password" type="password" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting} className="submit-btn">
                  Sign In
                </button>
<p className="py-3">
  Forgot your password?{" "}
  <a href="/reset-password" className="text-success d-inline text-decoration-none">
    Reset here
  </a>
</p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="login-here-div">
        <p className="m-auto p-3">
          Don't have any Account? <Link to="/signup"> Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
