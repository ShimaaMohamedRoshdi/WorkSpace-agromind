import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSectionAbout from '../components/HeroSectionAbout';
import AboutInfoSection from '../components/AboutInfoSection';
import AboutTimelineSection from '../components/AboutTimelineSection';
import ImpactSection from '../components/ImpactSection';
import TeamSection from '../components/TeamSection';

function About() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: false });
  }, []);

  return (
    <div className="about-page">
      <HeroSectionAbout />
      <AboutInfoSection />
      <AboutTimelineSection />
      <ImpactSection />
      <TeamSection />
      {/* Additional about page content can go here */}
    </div>
  );
}

export default About;



