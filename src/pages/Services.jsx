import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaLightbulb, FaShoppingCart, FaRobot, FaUpload, FaSpinner } from 'react-icons/fa';
import './Services.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Using agriculture-specific images from unsplash.com (which allows hotlinking)
const heroImage = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"; // Beautiful farm landscape
const landDashboardImg = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"; // Farm mapping/aerial view
const farmerPlanImg = "https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"; // Farmer with tablet in field
const planAdoptionImg = "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"; // Planting/seedlings
const expertDashboardImg = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"; // Beautiful agricultural land/farm field
const recommendationEngineImg = "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"; // Smart farming technology
const aiAssistantImg = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"; // Technology in agriculture

const Services = () => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: false });
  }, []);



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setAiResponse(`Based on your question and the image provided, it appears you're dealing with ${Math.random() > 0.5 ? 'leaf blight' : 'nutrient deficiency'}. I recommend applying organic fungicide and ensuring proper irrigation. Monitor the affected plants for the next 7-10 days and adjust treatment as needed.`);
      setShowResponse(true);
      setIsLoading(false);
    }, 2000);
    
    // For actual implementation, you would use:
    // try {
    //   const formData = new FormData();
    //   formData.append('question', question);
    //   if (image) formData.append('image', image);
    //   
    //   const response = await api.post('/api/ai-assistant', formData);
    //   setAiResponse(response.data.answer);
    //   setShowResponse(true);
    // } catch (error) {
    //   console.error('Error getting AI response:', error);
    //   setAiResponse('Sorry, there was an error processing your request. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // Reset form
  const handleReset = () => {
    setQuestion('');
    setImage(null);
    setImagePreview(null);
    setAiResponse('');
    setShowResponse(false);
  };

  return (
    <div className="services-page">
      {/* 1. Hero Section - Simplified */}
      <section className="services-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">Empowering Agriculture with Smart Solutions</h1>
              <p className="hero-subtitle">
                AgroMind provides tools designed for modern farmers and agricultural experts to maximize yield and efficiency.
              </p>
              <Link to="/signup" className="btn btn-success btn-lg mt-3">
                Get Started
              </Link>
            </div>
            <div className="col-lg-5">
              <img src={heroImage} alt="Modern Agriculture" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Our Services" Overview Section */}
      <section className="services-overview">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Our Services</h2>
          <div className="row justify-content-center">
            {/* Card 1 */}
            <div className="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="100">
              <div className="service-card">
                <div className="icon-container">
                  <FaMapMarkerAlt className="service-icon" />
                </div>
                <h3>Custom Farm & Land Management</h3>
                <p>Digitize your farm. Add and manage all your lands in one place to create detailed, personalized crop plans tailored to each specific field.</p>
              
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="200">
              <div className="service-card">
                <div className="icon-container">
                  <FaCalendarAlt className="service-icon" />
                </div>
                <h3>Intelligent Plan Creation</h3>
                <p>Build comprehensive crop plans from scratch. Detail every stage and step, from soil preparation to harvest, with cost estimations and scheduling.</p>
              
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="300">
              <div className="service-card">
                <div className="icon-container">
                  <FaLightbulb className="service-icon" />
                </div>
                <h3>Expert-Driven Recommendations</h3>
                <p>Leverage professional expertise. Get AI-driven or expert-curated crop recommendations based on your specific budget, land, and planting window.</p>
              </div>
            </div>

            {/* Card 4 - AI Crop Assistant */}
            <div className="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="400">
              <div className="service-card">
                <div className="icon-container">
                  <FaRobot className="service-icon" />
                </div>
                <h3>AI Crop Assistant</h3>
                <p>Get instant answers to your farming questions. Upload images of crop issues and receive personalized advice from our advanced AI system.</p>
          
              </div>
            </div>

            {/* Card 5 - E-Commerce */}
            <div className="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="500">
              <div className="service-card">
                <div className="icon-container">
                  <FaShoppingCart className="service-icon" />
                </div>
                <h3>E-Commerce & Supplies</h3>
                <p>Access all the tools and supplies you need. Our integrated shop provides seeds, fertilizers, and equipment to execute your plans perfectly.</p>
                <Link to="/shop-by-category" className="btn btn-outline-success">Go to Shop</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. In-Depth Section: For Our Farmers */}
      <section className="farmer-section" id="farmer-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Tools Built for the Modern Farmer</h2>
          
          {/* Feature 1 */}
          <div className="row feature-row align-items-center">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="feature-content">
                <h3>My Lands Dashboard</h3>
                <p>Your farm's digital headquarters. Easily add, edit, and view all your plots of land. Keep track of size, soil type, and irrigation methods to make informed decisions for each unique field.</p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <img src={landDashboardImg} alt="Land Dashboard" className="feature-image" />
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="row feature-row align-items-center flex-row-reverse">
            <div className="col-lg-5" data-aos="fade-left">
              <div className="feature-content">
                <h3>Personalized Plan Creation</h3>
                <p>Take full control of your season. Our step-by-step plan builder lets you create detailed cultivation strategies for any crop on any of your lands. Define stages, steps, tools, and estimate costs to build a comprehensive roadmap for success.</p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-right">
              <img src={farmerPlanImg} alt="Farmer Plan Creation" className="feature-image" />
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="row feature-row align-items-center">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="feature-content">
                <h3>Plan Adoption & Progress Tracking</h3>
                <p>Don't start from scratch. Adopt a pre-made template from our experts and instantly apply it to your land. Then, use the 'My Plans' dashboard to track your progress, input actual costs and dates, and see your plan come to life.</p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <img src={planAdoptionImg} alt="Plan Adoption and Tracking" className="feature-image" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. In-Depth Section: For Agricultural Experts */}
      <section className="expert-section" id="expert-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">Share Your Expertise, Shape the Future of Farming</h2>
          
          {/* Feature 1 */}
          <div className="row feature-row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="feature-content">
                <h3>Template Creation Dashboard</h3>
                <p>Design the gold standard of crop plans. As an expert, you can create detailed, reusable plan templates that are not tied to any specific land. Your templates serve as best-practice guides for farmers everywhere.</p>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <img src={expertDashboardImg} alt="Expert Dashboard" className="feature-image" />
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="row feature-row align-items-center flex-row-reverse">
            <div className="col-lg-6" data-aos="fade-left">
              <div className="feature-content">
                <h3>Powerful Recommendation Engine</h3>
                <p>Your knowledge powers our platform. The templates you create become the foundation of our recommendation engine, helping farmers make optimal choices based on budget, location, and schedule.</p>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-right">
              <img src={recommendationEngineImg} alt="Recommendation Engine" className="feature-image" />
            </div>
          </div>
        </div>
      </section>

 

   
    </div>
  );
};

export default Services
