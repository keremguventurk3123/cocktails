import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui secondary pointing menu" style={{height: "10vh", fontSize: "20px"}}>
            <i className="big olive glass martini icon " style={{alignSelf: 'flex-end', marginBottom: "1vh"}}/>
            <Link to="/" className="item">
                Get Your Cocktails
            </Link>
            <div className="right menu">
                <Link to="/streams/my_cocktails" className="item">
                    My Cocktails
                </Link>
                <GoogleAuth />
            </div>
        </div>
    );
}

export default Header;