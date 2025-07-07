import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import * as Yup from "yup";
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";
import api from "../../services/api";
import {jwtDecode} from "jwt-decode"; // ✅ NEW: Import jwt-decode
import "../App.css";
import logo from "../assets/images/logo.png"; // Adjust the path to your logo
import "./Signup.css";

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
email: Yup.string().email("Invalid email format").required("Email is required"), // Added email validation   
 password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await api.post("/api/Accounts/Login", {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const token = response.data.token;

        // ✅ Decode the token to get user role and id
        console.log(" token:", token);
        const decoded = jwtDecode(token);
        console.log("Decoded user data:", decoded);
        // const userId = decoded.id;
        // const userRole = decoded.role;
// ✅ Extract user ID and role
      const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const userRole = Array.isArray(roles) ? roles[0] : roles; // use first role if array
        // ✅ Store token and userId
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", userRole);

        // ✅ Navigate based on role
        switch (userRole) {
          case "Farmer":
            navigate("/");
            break;
          case "AgriculturalExpert":
            navigate("/expert-dashboard");
            break;
          // case "SystemAdministrator":
          //   navigate("/admin-dashboard");
          //   break;
          // default:
          //   navigate("/");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("email or password is incorrect.");
      } else {
        alert("An error occurred while signing in. Please try again.");
      }
      console.error("Login error:", error);
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
       <h1 className="text-success mt-4">Login</h1>
      </div>

      <div className="signin-wrapper">
      
        {/* Right Section for the Sign-In Form */}
        <div className="right-section">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* email Field */}
                <div className="form-group">
                  <Field name="email" placeholder="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  Sign In
                </button>
                <p className="py-3">
                  Forgot your password?{" "}
                  <a
                    href="/forget-password"
                    className="text-success d-inline text-decoration-none"
                  >
                    click here
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
