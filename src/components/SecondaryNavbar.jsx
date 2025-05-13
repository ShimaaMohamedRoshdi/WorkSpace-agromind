import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure styles are added in this file

export default function SecondaryNavbar() {
    return (
        <nav className="secondary-navbar">
            <ul className="secondary-navbar-links">
                <li><Link to="/farm-equipment">Farm Equipment</Link></li>
                <li><Link to="/crop-growing">Crop Growing</Link></li>
                <li><Link to="/companies">Brands</Link></li>
            </ul>
        </nav>
    );
}
