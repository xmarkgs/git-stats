import { React } from 'react';
import logo from '../img/Logo.png';

const Header = () => (
    <header>
        <img src={logo} alt="Service Logo" />
        <p className="logoSubText">Your page to find the most common info about GitHub users</p>
    </header>
);

export default Header;