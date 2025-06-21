import React from 'react';
import './TeamSection.css';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

// Using images from your existing assets
import member1 from '../assets/images/Aboutus/2 (4).jpg';
import member2 from '../assets/images/Aboutus/3 (6).jpg';
import member3 from '../assets/images/Aboutus/3 (5).jpg';




const teamMembers = [
  {
    id: 1,
    name: "alyaa",
    role: "Founder & CEO",
    bio: "With over 15 years in sustainable agriculture, Shimaa leads our mission to transform farming practices worldwide.",
    image: member1,
    social: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
      email: "mailto:Shimaa@agromind.com"
    }
  },
  {
    id: 2,
    name: "Ahmed",
    role: "Head of Research",
    bio: "Farah's innovative research in crop science has led to breakthrough developments in sustainable farming techniques.",
    image: member2,
    social: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
      email: "mailto:Farah@agromind.com"
    }
  },
  {
    id: 3,
    name: "Mazen",
    role: "Agricultural Specialist",
    bio: "Sara brings hands-on farming experience and a deep understanding of ecological balance to our projects.",
    image: member3,
    social: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
      email: "mailto:Sara@agromind.com"
    }
  }
]

const TeamSection = () => {
  return (
    <div className="team-section">
      <div className="container">
        <div className="team-header" data-aos="fade-up">
          <h6 className="team-subtitle">Our Farmers</h6>
          <h2 className="team-title">Meet The Team Behind Agromind</h2>
          <div className="team-divider"></div>
          <p className="team-description">
            Our diverse team of experts combines decades of experience in agriculture, 
            technology, and sustainability to drive innovation in farming practices.
          </p>
        </div>

        <div className="row team-members-container">
          {teamMembers.map((member) => (
            <div className="col-lg-3 col-md-6 col-sm-12" key={member.id} data-aos="fade-up" data-aos-delay={(member.id - 1) * 100}>
              <div className="team-member">
                <div className="member-image-container">
                  <img src={member.image} alt={member.name} className="member-image" />
                  <div className="member-social">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaLinkedin />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaTwitter />
                    </a>
                    <a href={member.social.email} className="social-icon">
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TeamSection;








