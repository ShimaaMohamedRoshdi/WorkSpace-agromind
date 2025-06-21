import React, { useEffect } from "react";
import "./AboutTimelineSection.css";
import AOS from "aos";
import "aos/dist/aos.css";

const milestones = [
  { 
    year: "1906", 
    title: "Open Farm",
    description: "Our journey began with a small family farm dedicated to sustainable practices."
  },
  { 
    year: "1920", 
    title: "Farm Remodeling",
    description: "Expanded our facilities and modernized our farming techniques."
  },
  { 
    year: "1925", 
    title: "Grainfarmers Formed",
    description: "Established the Grainfarmers cooperative to support local agriculture."
  },
  { 
    year: "1930", 
    title: "Start of Agriculture",
    description: "Pioneered innovative farming methods that revolutionized local production."
  },
];

const AboutTimelineSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: false });
  }, []);

  return (
    <div className="about-timeline-section container my-5">
      <div className="about-timeline-content" data-aos="fade-up">
        <h6 className="timeline-subtitle">OUR HISTORY</h6>
        <h2 className="timeline-heading">Farming since 1866</h2>
        <p className="timeline-description">
          For over a century, we've been committed to sustainable agriculture and providing the highest quality produce to our community. Our journey reflects our dedication to innovation while honoring traditional farming wisdom.
        </p>
      </div>
      
      <div className="timeline-wrapper" data-aos="fade-up" data-aos-delay="200">
        <div className="timeline-line"></div>
        <div className="timeline-bg-image" />
        
        <div className="timeline-milestones">
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className="timeline-milestone"
              data-aos="fade-up" 
              data-aos-delay={300 + (index * 100)}
            >
              <div className="milestone-circle">
                <div className="milestone-inner-circle"></div>
              </div>
              <div className="milestone-content">
                <div className="milestone-year">{milestone.year}</div>
                <div className="milestone-title">{milestone.title}</div>
                <div className="milestone-description">{milestone.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* <div className="timeline-facts-container" data-aos="fade-up" data-aos-delay="600">
        <div className="row g-4">
          <div className="col-md-3 col-6">
            <div className="timeline-fact">
              <div className="fact-number">120+</div>
              <div className="fact-text">Years of Experience</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="timeline-fact">
              <div className="fact-number">500+</div>
              <div className="fact-text">Acres of Farmland</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="timeline-fact">
              <div className="fact-number">50+</div>
              <div className="fact-text">Organic Products</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="timeline-fact">
              <div className="fact-number">1000+</div>
              <div className="fact-text">Happy Customers</div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AboutTimelineSection;
