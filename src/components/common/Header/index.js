import React from 'react';
import './style.css';
import logo from '../../../assets/icons/logo_toko.svg'

const Header = ({ type }) => {
    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 headerLogo">
                        <img src={logo} />
                    </div>
                    <div className="col-sm-6">

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
