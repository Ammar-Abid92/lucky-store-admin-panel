import React from 'react';
import './style.css';
import logo from '../../../assets/images/logo-black.png'

const Header = ({ type }) => {
    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="headerLogo">
                        <img src={logo} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
