// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./HealthyLifeSection.css"; // Custom styles
// import blueberry from "../assets/images/11 (1).png";
// import strawberry from "../assets/images/10.png";
// import cabbage from "../assets/images/12.png";
// import maize from "../assets/images/9.png";
// import orange from "../assets/images/13.png";
// import apple from "../assets/images/14 (1).png";

// const HealthyLifeSection = () => {
//   return (
//     <div className="container-fluid healthy-life-section py-5">
//       <div className="row align-items-center">
//         {/* Left Text Section */}
//         <div className="col-md-6 text-center text-md-start">
//           <h1 className="gradient-text">
//             Healthy Life <br />
//             With Fresh <br />
//             Products
//           </h1>
//         </div>

//         {/* Right Icons Section */}
//         <div className="col-md-6 text-center">
//           <div className="row">
//             <div className="col-4">
//               <img src={blueberry} alt="Blueberry" className="fruit-icon" />
//               <p>Blueberry</p>
//             </div>
//             <div className="col-4">
//               <img src={strawberry} alt="Strawberry" className="fruit-icon" />
//               <p>Strawberry</p>
//             </div>
//             <div className="col-4">
//               <img src={cabbage} alt="Cabbage" className="fruit-icon" />
//               <p>Cabbage</p>
//             </div>
//             <div className="col-4">
//               <img src={maize} alt="Maize" className="fruit-icon" />
//               <p>Maize</p>
//             </div>
//             <div className="col-4">
//               <img src={orange} alt="Orange" className="fruit-icon" />
//               <p>Orange</p>
//             </div>
//             <div className="col-4">
//               <img src={apple} alt="Apple" className="fruit-icon" />
//               <p>Apples</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HealthyLifeSection;
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HealthyLifeSection.css"; // Custom styles

import blueberry from "../assets/images/11 (1).png";
import strawberry from "../assets/images/10.png";
import cabbage from "../assets/images/12.png";
import maize from "../assets/images/9.png";
import orange from "../assets/images/13.png";
import apple from "../assets/images/14 (1).png";

import vegetableBg from "../assets/images/11.png"; // Add the bottom-right vegetable illustration

const HealthyLifeSection = () => {
  return (
    <div className="healthy-life-section">
     
      <div className="row g-0">
        {/* Left Text Section */}
        <div className="col-md-6 text-content d-flex align-items-center justify-content-center">
          <h1 className="gradient-text">
            Healthy Life <br />
            With Fresh <br />
            Products
          </h1>
        </div>

        {/* Right Icons Section */}
        <div className="col-md-6 right-section position-relative">
          <div className="icon-grid">
            <div className="icon-box">
              <img src={blueberry} alt="Blueberry" className="fruit-icon" />
              <p>Blueberry</p>
            </div>
            <div className="icon-box">
              <img src={strawberry} alt="Strawberry" className="fruit-icon" />
              <p>Strawberry</p>
            </div>
            <div className="icon-box">
              <img src={cabbage} alt="Cabbage" className="fruit-icon" />
              <p>Cabbage</p>
            </div>
            <div className="icon-box">
              <img src={maize} alt="Maize" className="fruit-icon" />
              <p>Maize</p>
            </div>
            <div className="icon-box">
              <img src={orange} alt="Orange" className="fruit-icon" />
              <p>Orange</p>
            </div>
            <div className="icon-box">
              <img src={apple} alt="Apple" className="fruit-icon" />
              <p>Apples</p>
            </div>
          </div>

          {/* Bottom-right background vegetable illustration */}
          <img src={vegetableBg} alt="Vegetables" className="vegetable-bg w-25" />
        </div>
      </div>
    </div>
  );
};

export default HealthyLifeSection;
