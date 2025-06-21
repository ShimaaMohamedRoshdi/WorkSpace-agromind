import React, { useState, useEffect } from 'react';
import './Brands.css';
import { getAllBrands } from '../../ServicesBrand/brandService';

// Import static brand images as fallbacks
// Update paths to use the correct location relative to the src directory
import brand1 from "../assets/images/brands/1 (4).png";
import brand2 from "../assets/images/brands/2 (3).png";
import brand3 from "../assets/images/brands/3 (1).png";
import brand4 from "../assets/images/brands/4 (2).png";
import brand5 from "../assets/images/brands/John_Deere_logo.svg.png";
import brand6 from "../assets/images/brands/Kubota-Logo.png";

// Create an array of fallback brand images with names
const fallbackBrands = [
  { image: brand1, name: "Syngenta" },
  { image: brand2, name: "Bayer" },
  { image: brand3, name: "BASF" },
  { image: brand4, name: "Corteva" },
  { image: brand5, name: "John Deere" },
  { image: brand6, name: "Kubota" }
];

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useApiBrands, setUseApiBrands] = useState(false);

  // Helper function to get image URL from brand object
  const getBrandImageUrl = (brand) => {
    // Try all possible image URL properties
    return brand.logoUrl || brand.pictureUrl || brand.imageUrl || 
           brand.logo || brand.picture || brand.image || 
           brand.brandLogo || brand.brandImage || '';
  };

  // Helper function to get brand name from brand object
  const getBrandName = (brand, index) => {
    return brand.name || brand.brandName || brand.title || 
           `Brand ${index + 1}`;
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await getAllBrands();
        console.log('API response:', data); // Debug: log the API response
        
        if (data && data.length > 0) {
          // Check if brands have image URLs
          const brandsHaveImages = data.some(brand => getBrandImageUrl(brand));
          
          if (brandsHaveImages) {
            setBrands(data);
            setUseApiBrands(true);
          } else {
            console.log('API brands missing images, using fallbacks');
            setBrands(fallbackBrands);
            setUseApiBrands(false);
          }
        } else {
          console.log('Empty API response, using fallbacks');
          setBrands(fallbackBrands);
          setUseApiBrands(false);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
        setBrands(fallbackBrands);
        setUseApiBrands(false);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Duplicate the array to ensure smooth infinite scrolling
  const allBrands = brands.length > 0 ? [...brands, ...brands] : [];

  if (loading) {
    // Show fallback brands while loading
    const loadingBrands = [...fallbackBrands, ...fallbackBrands];
    return (
      <div className="brands-container py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h6 className="text-success fw-bold">TRUSTED BY INDUSTRY LEADERS</h6>
            <h2 className="fw-bold">Our Partners & Sponsors</h2>
            <div className="brand-divider mx-auto"></div>
          </div>
          
          <div className="brands-slider-container">
            <div className="brands-slider">
              {loadingBrands.map((brand, index) => (
                <div key={index} className="brand-item">
                  <img 
                    src={brand.image} 
                    alt={brand.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=Brand';
                    }}
                  />
                  <p className="brand-name">{brand.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="brands-container py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h6 className="text-success fw-bold">TRUSTED BY INDUSTRY LEADERS</h6>
          <h2 className="fw-bold">Our Partners & Sponsors</h2>
          <div className="brand-divider mx-auto"></div>
        </div>
        
        <div className="brands-slider-container">
          <div className="brands-slider">
            {allBrands.map((brand, index) => (
              <div key={index} className="brand-item">
                {useApiBrands ? (
                  <img 
                    src={getBrandImageUrl(brand)} 
                    alt={getBrandName(brand, index)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=Brand';
                    }}
                  />
                ) : (
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=Brand';
                    }}
                  />
                )}
                <p className="brand-name">
                  {useApiBrands 
                    ? getBrandName(brand, index % brands.length)
                    : brand.name
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands
