
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import farmerImg from "../assets/images/s-testi.png";

// const FarmerSection = () => {
//   return (
//     <div className="container-fluid py-5">
//       <div className="row d-flex align-items-center">
        
//         {/* Left Image Section - Fade In from Left */}
//         <div 
//           className="col-lg-6 position-relative p-0"
//           data-aos="fade-right"
//         >
//           <img
//             src={farmerImg}
//             alt="Farmer"
//             className="img-fluid"
//             style={{
//               width: "100%",
//               height: "auto",
//               borderRadius: "20px",
//               objectFit: "cover",
//             }}
//           />
//         </div>

//         {/* Right Text Section - Fade In from Right */}
//         <div 
//           className="col-lg-5"
//           data-aos="fade-left"
//         >
//           <h6 className="text-success fw-bold">Meet The Farmer</h6>
//           <h2 className="fw-bold text-dark">We Are Dedicated Farmers</h2>
//           <p className="text-secondary">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales faucibus commodo.
//             Proin vehicula massa id congue rutrum, ex libero sodales ex, cursus euismod purus.
//           </p>

//           {/* Decorative Divider */}
//           <div className="d-flex align-items-center my-3">
//             <span className="text-warning" style={{ fontSize: "24px" }}>🌿</span>
//             <div className="flex-grow-1 border-bottom border-warning mx-2"></div>
//           </div>

//           {/* Quote Section */}
//           <blockquote className="fst-italic text-dark">
//             “Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth,
//             good morals, and happiness. Farmers are the embodiment of hard work, dedication, and resilience.”
//           </blockquote>
//           <p className="fw-bold text-dark">DONALD CHRISTOPHER - TALK</p>
//           <p className="text-muted">Farm Owner Donald Farm Happiness</p>

//           {/* Button - Zoom In Effect */}
//           <button 
//             className="btn btn-success rounded-pill px-4 py-2"
//             data-aos="zoom-in"
//           >
//             View All The Farmers <span className="ms-2">➤</span>
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default FarmerSection;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import farmerImg from "../assets/images/s-testi.png";

const FarmerSection = () => {
  return (
    <div className="container-fluid py-5">
      <div className="row d-flex align-items-center">
        
        {/* Left Image Section - Fade In from Left */}
        <div 
          className="col-lg-6 position-relative p-0"
          data-aos="fade-right"
        >
          <img
            src={farmerImg}
            alt="Farmer"
            className="img-fluid"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "20px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right Text Section - Fade In from Right */}
        <div 
          className="col-lg-5"
          data-aos="fade-left"
        >
          <h6 className="text-success fw-bold">Meet The Farmer</h6>
          <h2 className="fw-bold text-dark">We Are Dedicated Farmers</h2>
          <p className="text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales faucibus commodo.
            Proin vehicula massa id congue rutrum, ex libero sodales ex, cursus euismod purus.
          </p>

          {/* Decorative Divider */}
          <div className="d-flex align-items-center my-3">
            <span className="text-warning" style={{ fontSize: "24px" }}>🌿</span>
            <div className="flex-grow-1 border-bottom border-warning mx-2"></div>
          </div>

          {/* Quote Section */}
          <blockquote className="fst-italic text-dark">
            “Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth,
            good morals, and happiness. Farmers are the embodiment of hard work, dedication, and resilience.”
          </blockquote>
          <p className="fw-bold text-dark">DONALD CHRISTOPHER - TALK</p>
          <p className="text-muted">Farm Owner Donald Farm Happiness</p>

          {/* Button - Zoom In Effect */}
          <button 
            className="btn btn-success rounded-pill px-4 py-2"
            data-aos="zoom-in"
          >
            View All The Farmers <span className="ms-2">➤</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FarmerSection;
