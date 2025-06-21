import React, { useEffect } from 'react';
import TeamSection from '../components/TeamSection';
import HeroSectionTeam from '../components/HeroSectionTeam';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TeamSectionPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: false });
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="team-section-page">
      {/* Hero Section */}
      <HeroSectionTeam />
      
    
      
      {/* Team Section Component */}
      <TeamSection />
      
    
    </div>
  );
};

export default TeamSectionPage
