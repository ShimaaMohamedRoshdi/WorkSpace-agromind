import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../services/api"; // Use shared API instance
// import axios from 'axios'; // Old code, replaced by shared api instance
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";
// import '../App.css';
import logo from "../assets/images/logo.png"; // Adjust the path to your logo
import "./Signup.css";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();

  // Loading state to manage the animation
  const [loading, setLoading] = useState(true);

  // Use useEffect to simulate loading for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading animation after 3 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name must only contain letters")
      .required("First Name is required")
      .test(
        "capitalize",
        "First Name must start with a capital letter",
        (value) => /^[A-Z]/.test(value)
      ),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last Name must only contain letters")
      .required("Last Name is required")
      .test(
        "capitalize",
        "Last Name must start with a capital letter",
        (value) => /^[A-Z]/.test(value)
      ),
    username: Yup.string()
      .matches(
        /^[A-Za-z0-9]+$/,
        "Username must only contain letters and digits"
      )
      .required("Username is required")
      .test(
        "no-spaces",
        "Username can't contain spaces",
        (value) => !/\s/.test(value)
      ),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "Phone number must be 11 digits, start with 01 and second digit 0, 1, or 2"
      )
      .required("Phone Number is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.number()
      .positive("Age must be a positive number")
      .min(18, "Must be at least 18 years old")
      .required("Age is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
        "Password must contain at least one lowercase letter, one digit, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Map frontend fields to backend DTO
      const payload = {
        fname: values.firstName,
        lname: values.lastName,
        userName: values.username,
        email: values.email,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        age: Number(values.age), // Ensure age is sent as a number
        role: values.role, // Should match backend expected values
        password: values.password,
        confirmPassword: values.confirmPassword,
        // Add all required fields for AgriculturalExpert with both PascalCase and camelCase property names
        ...(values.role === "AgriculturalExpert" && {
          PreferedCrops: "General",
          preferedCrops: "General",
          AvailableHours: 0,
          availableHours: 0,
          ExperienceYears: 0,
          experienceYears: 0,
          ExpertRating: 0,
          expertRating: 0,
          RegionCovered: "General",
          regionCovered: "General",
          Specialization: "General",
          specialization: "General",
        }),
      };

      // const response = await axios.post('http://localhost:5132/api/Accounts/Register', payload); // Old code
      const response = await api.post("/api/Accounts/Register", payload); // Updated to use shared api instance and correct baseURL
      console.log("Sign-Up Success:", response.data);
      alert("Sign-Up Successful");
      resetForm();
      navigate("/signin");
    } catch (error) {
      console.error("Error during sign-up:", error);
      // Show full backend error details for debugging
      if (error.response) {
        alert(
          JSON.stringify(error.response.data, null, 2) ||
            "Error during sign-up. Please try again."
        );
      } else {
        alert("Error during sign-up. Please try again.");
      }
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
      <div className=" logo-div">
        {/* <img className=' logo-img' src={logo}/> */}
        <h1 className="text-center mt-2 text-success">SignUp</h1>
      </div>
      <div className="signup-wrapper">
        <div className="left-section">
          <h2>Join Now!</h2>
          <p>Join us today for a smarter farming future!</p>
          <div className="social-buttons">
            <button className="social-btn facebook">
              <FaFacebook size={20} /> Join with Facebook
            </button>
            <button className="social-btn twitter">
              <FaTwitter size={20} /> Join with Twitter
            </button>
            <button className="social-btn google">
              <FaGoogle size={20} /> Join with Google
            </button>
            <button className="social-btn instagram">
              <FaInstagram size={20} /> Join with Instagram
            </button>
          </div>
        </div>

        <div className="right-section">
          {/* <h1>Register</h1> */}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              phoneNumber: "",
              gender: "",
              age: "",
              role: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* First Name & Last Name in the same row */}
                <div className="row">
                  <div className="form-group half-width">
                    <Field name="firstName" placeholder="First Name" />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group half-width">
                    <Field name="lastName" placeholder="Last Name" />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <Field name="username" placeholder="Username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <Field name="email" placeholder="Email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <Field name="phoneNumber" placeholder="Phone Number" />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Gender options in the same row */}
                <div className="row">
                  <div className="form-group gender-options">
                    <label>
                      <Field type="radio" name="gender" value="male" />
                      Male
                    </label>
                    <label>
                      <Field type="radio" name="gender" value="female" />
                      Female
                    </label>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <Field type="number" name="age" placeholder="Age" />
                  <ErrorMessage name="age" component="div" className="error" />
                </div>

                <div className="form-group">
                  <Field as="select" name="role" className="select-field">
                    <option value="">Select Role</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Supplier">Supplier</option>
                    <option value="AgriculturalExpert">
                      AgriculturalExpert
                    </option>
                    <option value="SystemAdministrator">
                      SystemAdministrator
                    </option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="error" />
                </div>

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
                <div className="form-group">
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className=" login-here-div">
        <p className=" m-auto p-3">
          Already Have An Account?
          <Link to="/signin"> Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
