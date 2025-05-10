import AOS from "aos";
import "aos/dist/aos.css";

// AOS.init({
//   duration: 600, // 🔥 Faster animations (0.6s)
//   offset: 50,    // ⬆️ Trigger animation earlier
//   easing: "ease-in-out", // 🎬 Smooth transitions
// });
AOS.init({ duration: 800, easing: "ease-out", once: false });

import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import About from "./pages/About";
import Market from "./pages/Market";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import Crops from "./pages/Crops";
import CheckOut from "./pages/CheckOut";
import Footer from "./components/Footer";
import FarmEquipment from "./pages/FarmEquipment";
import CropGrowing from "./pages/CropGrowing";
import AnimalHusbandry from "./pages/AnimalHusbandry";
import ProductDetails from "./pages/ProductDetails";

import Order from "./pages/Order";
import ShopPage from "./pages/ShopPage";
import Dashboard from "./pages/ExpertDasboard";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import LandFormPage from "./pages/LandFormPage";
import FeaturedProducts from "./pages/FeaturedProducts";
import Herbicides from "./pages/Herbicides";
import OrganicPesticides from "./pages/OrganicPesticides";
import Fertilizers from "./pages/Fertilizers";
import ShopChemicals from "./pages/ShopChemicals";
import Insecticides from "./pages/insecticides.JSX";
import ShopByCategory from "./pages/ShopByCategory";
import RecommendCrop from "./pages/RecommendCrop";
import RecommendPlan from "./pages/RecommendPlan";

function App() {
  const [order, setOrder] = useState(null);
  return (
    <Router>
      <Navbar />
      {/* <SecondaryNavbar/>
            <div class="wave"></div> */}

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/shopproducts" element={<ShopPage />} />
        <Route path="/shop-by-category" element={<ShopByCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/market" element={<Market />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/checkout" element={<CheckOut />} /> */}
        <Route path="/checkout" element={<CheckOut setOrder={setOrder} />} />
        <Route path="/order" element={<Order order={order} />} />

        <Route path="/wishlist" element={<Wishlist />} />
        {/* <Route path="/order" element={<Order/>} /> */}

        <Route path="/checkout" element={<CheckOut setOrder={() => {}} />} />
        <Route path="/farm-equipment" element={<FarmEquipment />} />
        <Route path="/crop-growing" element={<CropGrowing />} />
        <Route path="/animal-husbandry" element={<AnimalHusbandry />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-land" element={<LandFormPage />} />
        <Route path="/RecommendPlan" element={<RecommendPlan/>} />
        <Route path="/shopChemicals" element={<ShopChemicals />} />

        <Route path="/category/featured" element={<FeaturedProducts />} />
        <Route path="/category/fertilizers" element={<Fertilizers />} />
        <Route path="/category/organic" element={<OrganicPesticides />} />
        <Route path="/category/herbicides" element={<Herbicides />} />
        <Route path="/category/insecticides" element={<Insecticides />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
