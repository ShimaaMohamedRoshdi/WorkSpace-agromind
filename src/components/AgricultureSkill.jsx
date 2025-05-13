// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import farmerimg from "../assets/images/s-farm.jpg"; // Replace with your actual image path

// const AgricultureSkill = () => {
//   return (
//     <div className="container py-5">
//       <div className="row align-items-center">
        
//         {/* Left Section - Image with Badge */}
//         <div className="col-md-4 position-relative text-center">
//           <div className="position-relative d-inline-block">
//             {/* Circular Image */}
//             <img
//               src={farmerimg}
//               alt="Farmer"
//               className="img-fluid rounded-circle border border-white shadow-lg"
//               style={{ width: "350px", height: "350px", objectFit: "cover" }}
//             />
//             {/* Experience Badge */}
//             <div className="position-absolute top-0 start-0 bg-success text-white fw-bold text-center rounded-circle d-flex flex-column align-items-center justify-content-center shadow-lg"
//               style={{ width: "140px", height: "140px", transform: "translate(-30%, -30%)" }}>
//               <span className="fs-3">65</span>
//               <span className="fs-6">Years Of Experience</span>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Text & Progress Bars */}
//         <div className="col-md-6 text-center text-md-start">
//           {/* Section Title */}
//           <h5 className="text-warning fw-bold d-flex align-items-center justify-content-center justify-content-md-start">
//             <span className="me-2">🌾</span> Our Agriculture Skill
//           </h5>

//           {/* Main Heading */}
//           <h2 className="text-success fw-bold mt-3">
//             We Believe In Bringing Customers The Best Product
//           </h2>

//           {/* Description */}
//           <p className="text-muted mt-3">
//             Mauris quam tellus, pellentesque ut faucibus pretium, aliquet vitae est. Nulla non lorem metus. Nulla pretium dui a diam faucibus, vehicula efficitur enim maximus. Proin sollicitudin erat eu auctor egestas.
//           </p>

//           {/* Progress Bars */}
//           <div className="mt-4">
//             {/* Organic Solutions */}
//             <p className="fw-bold mb-1">Organic Solutions <span className="float-end">76%</span></p>
//             <div className="progress" style={{ height: "8px" }}>
//               <div className="progress-bar bg-success" style={{ width: "76%" }}></div>
//             </div>

//             {/* Quality Agriculture */}
//             <p className="fw-bold mt-3 mb-1">Quality Agriculture <span className="float-end">95%</span></p>
//             <div className="progress" style={{ height: "8px" }}>
//               <div className="progress-bar bg-success" style={{ width: "95%" }}></div>
//             </div>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default AgricultureSkill;
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import farmerimg from "../assets/images/s-farm.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const AgricultureSkill = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out", once: false });
  }, []);

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        
        {/* Left Section - Image with Badge */}
        <div className="col-md-4 position-relative text-center" data-aos="fade-right">
          <div className="position-relative d-inline-block">
            {/* Circular Image */}
            <img
              src={farmerimg}
              alt="Farmer"
              className="img-fluid rounded-circle border border-white shadow-lg"
              style={{ width: "350px", height: "350px", objectFit: "cover" }}
            />
            {/* Experience Badge */}
            <div className="position-absolute top-0 start-0 bg-success text-white fw-bold text-center rounded-circle d-flex flex-column align-items-center justify-content-center shadow-lg"
              style={{ width: "140px", height: "140px", transform: "translate(-30%, -30%)" }}>
              <span className="fs-3">65</span>
              <span className="fs-6">Years Of Experience</span>
            </div>
          </div>
        </div>

        {/* Right Section - Text & Progress Bars */}
        <div className="col-md-6 text-center text-md-start" data-aos="fade-left">
          {/* Section Title */}
          <h5 className="text-warning fw-bold d-flex align-items-center justify-content-center justify-content-md-start">
            <span className="me-2">🌾</span> Our Agriculture Skill
          </h5>

          {/* Main Heading */}
          <h2 className="text-success fw-bold mt-3">
            We Believe In Bringing Customers The Best Product
          </h2>

          {/* Description */}
          <p className="text-muted mt-3">
            Mauris quam tellus, pellentesque ut faucibus pretium, aliquet vitae est. Nulla non lorem metus. Nulla pretium dui a diam faucibus, vehicula efficitur enim maximus. Proin sollicitudin erat eu auctor egestas.
          </p>

          {/* Progress Bars */}
          <div className="mt-4">
            {/* Organic Solutions */}
            <p className="fw-bold mb-1">Organic Solutions <span className="float-end">76%</span></p>
            <div className="progress" style={{ height: "8px" }}>
              <div className="progress-bar bg-success" style={{ width: "76%" }}></div>
            </div>

            {/* Quality Agriculture */}
            <p className="fw-bold mt-3 mb-1">Quality Agriculture <span className="float-end">95%</span></p>
            <div className="progress" style={{ height: "8px" }}>
              <div className="progress-bar bg-success" style={{ width: "95%" }}></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AgricultureSkill;
