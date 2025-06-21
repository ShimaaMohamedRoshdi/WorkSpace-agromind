import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import './Contact.css';
import farmerImage from '../assets/images/contactus/10 (1).png'
import plantDecoration from '../assets/images/contactus/16.png';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    message: Yup.string().required('Please tell us about your project')
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    setSubmitted(true);
    resetForm();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 data-aos="fade-up">Contact Us</h1>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="200">
            <Link to="/" className="breadcrumb-link">Home</Link> &gt; <span className="breadcrumb-current">Contact</span>
          </div>
        </div>
      </div>

      <div className="contact-container">
        {/* Farmer Character Image */}
        <div className="farmer-image-container" data-aos="fade-up">
          <img src={farmerImage} alt="Farmer" className="farmer-image" />
        </div>

        <div className="contact-form-section" data-aos="fade-right">
          <div className="form-header">
            <h2>Have Questions?</h2>
            <h3>Send us a message</h3>
          </div>
          
          <Formik
            initialValues={{ name: '', email: '', phone: '', message: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-group">
                <Field type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <Field type="email" name="email" placeholder="Email*" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-group">
                  <Field type="text" name="phone" placeholder="Phone" />
                  <ErrorMessage name="phone" component="div" className="error" />
                </div>
              </div>
              
              <div className="form-group">
                <Field as="textarea" name="message" placeholder="Tell Us About Project *" rows="5" />
                <ErrorMessage name="message" component="div" className="error" />
              </div>
              
              <button type="submit" className="submit-btn">
                <span>Get In Touch</span>
              </button>
              
              {submitted && <div className="success-message">Your message has been sent successfully!</div>}
            </Form>
          </Formik>
        </div>
        
        <div className="contact-info-section" data-aos="fade-left">
          <h2>Contact Information</h2>
          <p>Agromind is your trusted partner for agricultural solutions. We're dedicated to empowering farmers with innovative tools and expert guidance to maximize crop yields and sustainability.</p>
          
          <div className="info-item">
            <h3>Hotline</h3>
            <div className="info-content">
              <FaPhone className="icon" />
              <span>+20 01066585154</span>
            </div>
          </div>
          
          <div className="info-item">
            <h3>Our Location</h3>
            <div className="info-content">
              <FaMapMarkerAlt className="icon" />
              <span>Cairo, Nasr City</span>
            </div>
          </div>
          
          <div className="info-item">
            <h3>Official Email</h3>
            <div className="info-content">
              <FaEnvelope className="icon" />
              <span>GraduationProject2025@gmail.com</span>
            </div>
          </div>

          {/* Plant Decoration Image */}
          <img src={plantDecoration} alt="Plant Decoration" className="plant-decoration" />
        </div>
      </div>
    </div>
  );
};

export default Contact
