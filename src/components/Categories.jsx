import React from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

import cat2 from "../assets/images/categ3.png";
import cat7 from "../assets/images/categ7.png";
import cat4 from "../assets/images/categ2.png";
import cat1 from "../assets/images/categ1.png";

const categories = [
  { title: "Herbicides", image: cat2, path: "/category/herbicides" },
  {
    title: "Insecticides",
    image: cat4,
    fullWidth: true,
    path: "/category/insecticides",
  },
  {
    title: "Organic Pesticides",
    image: cat7,
    gradient: true,
    path: "/category/organic",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container-fluid py-5 px-md-5 px-3">
      <div className="row">
        {/* Left: Categories */}
        <div className="col-lg-7">
          <div className="d-flex flex-column gap-3">
            <div className="d-flex gap-3">
              <div
                className="cat-box gradient"
                onClick={() => handleClick(categories[0].path)}
                style={{ backgroundImage: `url(${categories[0].image})` }}
              >
                <span>Herbicides</span>
              </div>
            </div>

            <div className="d-flex gap-3">
              <div
                className="cat-box half"
                onClick={() => handleClick(categories[1].path)}
                style={{ backgroundImage: `url(${categories[1].image})` }}
              >
                <span>Insecticides</span>
              </div>
              <div
                className="cat-box half"
                onClick={() => handleClick(categories[2].path)}
                style={{ backgroundImage: `url(${categories[2].image})` }}
              >
                <span>Organic Pesticides</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Description */}
        <div className="col-lg-4 d-flex flex-column justify-content-center mt-4 mt-lg-0">
          <h2 className="fw-bold mb-3">AgroMind for Chemicals</h2>
          <p>
            AgroMind Online is the first platform for selling all kinds of
            agricultural and public health pesticides. AgroMind Chemicals offers
            more than 400 premium products including pesticides, fertilizers,
            and seeds. The company is currently the main distributor and
            representative for major international agricultural chemical
            companies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;




