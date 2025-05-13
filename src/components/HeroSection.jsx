
// import "../App.css";
// import React, { useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import heroImg from "../assets/images/break-page.png";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const HeroSection = () => {
//   useEffect(() => {
//     AOS.init({ duration: 800, easing: "ease-out", once: true }); // Faster animation
//   }, []);

//   return (
//     <div
//       className="hero-section d-flex align-items-center text-center text-white"
//       style={{
//         background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${heroImg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "70vh",
//         position: "relative",
//       }}
//     >
//       <div className="container">
//         <h1 className="animated-text" data-aos="fade-up">
//           THE BEST AGRICULTURE <br /> HARVEST IN THE WORLD
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
import "../App.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import heroImg from "../assets/images/break-page.png";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: false }); // Animation triggers every time
  }, []);

  return (
    <div
      className="hero-section d-flex align-items-center text-center text-white"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
        position: "relative",
      }}
    >
      <div className="container">
        <h1 className="animated-text" data-aos="fade-up">
          THE BEST AGRICULTURE <br /> HARVEST IN THE WORLD
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
