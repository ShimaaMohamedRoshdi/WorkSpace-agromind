// import React from "react";
// import "./OrganicSection.css"; 
// import img99 from "../assets/images/9 (1).png";

// const OrganicSection = () => {
//   return (
//     <section className="organic-section py-5">
//       <div className="container">
//         <div className="row align-items-center">
//           {/* Image Section with Yellow Square */}
//           <div className="col-md-6 text-center position-relative">
//             <div className="image-container">
//               <div className="background-square "></div>
//               <img src={img99} alt="Grain Bags" className="img-fluid product-image" />
//             </div>
//           </div>

//           {/* Text & Circular Progress Bars */}
//           <div className="col-md-5">
//             <div className="mb-4">
//               <h3 className="fw-bold pt-3">Pure & Organic</h3>
//               <p className="text-muted">
//                 Continued at up to zealously necessary breakfast. Surrounded sir
//                 motionless she end literature. Gay direction neglected but
//                 supported yet her.
//               </p>
//             </div>

//             <div className="mb-4">
//               <h3 className="fw-bold">Always Fresh</h3>
//               <p className="text-muted">
//                 Continued at up to zealously necessary breakfast. Surrounded sir
//                 motionless she end literature. Gay direction neglected but
//                 supported yet her.
//               </p>
//             </div>

//             {/* Circular Progress Bars */}
//             <div className="d-flex align-items-center justify-content-between">
//               <div className="text-center">
//                 <div className="progress-circle">
//                   <span className="progress-text">83%</span>
//                 </div>
//                 <p className="fw-bold mt-2">Organic Solutions</p>
//               </div>

//               <div className="text-center">
//                 <div className="progress-circle">
//                   <span className="progress-text">60%</span>
//                 </div>
//                 <p className="fw-bold mt-2">Quality Agriculture</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OrganicSection;
import React, { useEffect } from "react";
import "./OrganicSection.css"; 
import img99 from "../assets/images/9 (1).png";
import AOS from "aos";
import "aos/dist/aos.css";

const OrganicSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS for animations
  }, []);

  return (
    <section className="organic-section py-5" data-aos="fade-up">
      <div className="container">
        <div className="row align-items-center">
          {/* Image Section with Yellow Square */}
          <div className="col-md-6 text-center position-relative">
            <div className="image-container" data-aos="zoom-in">
              <div className="background-square"></div>
              <img src={img99} alt="Grain Bags" className="img-fluid product-image" />
            </div>
          </div>

          {/* Text & Circular Progress Bars */}
          <div className="col-md-5">
            <div className="mb-4" data-aos="fade-right">
              <h3 className="fw-bold pt-3">Pure & Organic</h3>
              <p className="text-muted">
                Continued at up to zealously necessary breakfast. Surrounded sir
                motionless she end literature. Gay direction neglected but
                supported yet her.
              </p>
            </div>

            <div className="mb-4" data-aos="fade-right">
              <h3 className="fw-bold">Always Fresh</h3>
              <p className="text-muted">
                Continued at up to zealously necessary breakfast. Surrounded sir
                motionless she end literature. Gay direction neglected but
                supported yet her.
              </p>
            </div>

            {/* Circular Progress Bars */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-center" data-aos="flip-left">
                <div className="progress-circle">
                  <span className="progress-text">83%</span>
                </div>
                <p className="fw-bold mt-2">Organic Solutions</p>
              </div>

              <div className="text-center" data-aos="flip-right">
                <div className="progress-circle">
                  <span className="progress-text">60%</span>
                </div>
                <p className="fw-bold mt-2">Quality Agriculture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganicSection;
