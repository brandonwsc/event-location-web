import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import PropTypes from "prop-types";
import AdminEventCard from "./AdminEventCard";
import {useCookies} from "react-cookie";

function AdminNavBar(props){
    const [name, setName] = useState("");

    let location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(['userName']);

    function clearToken(){
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
    }
    function logOut(){
        console.log("logOut");
        clearToken();
        window.location.assign("/")
    }

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        setName(username);
    }, []);

    return(

        <nav className="navbar navbar-expand nav-admin shadow shadow-lg border-bottom-1">

            <button className="navbar-toggle btn ">
                <i className="fa fa-chevron-left text-white"></i>
            </button>
            <button className="navbar-toggle btn ">
                <i className="fa fa-chevron-right text-white"></i>
            </button>
            <span className="navbar-toggle nav-item-text d-none d-sm-block"> &nbsp; &nbsp;
                <Link to={location.pathname} className="btn text-white px-0">{location.pathname}</Link>
            </span>


            <ul className="nav navbar-nav ms-auto">
                <li className="mx-1 nav-item ">
                    <Link to="/admin_event" className="nav-item-text">
                        <button className="btn navbar-btn nav-item-text text-white">
                            <i className="fa fa-light fa-calendar mr-2"> <span className='d-none d-lg-inline d-xl-inline'>Events</span>  </i>
                        </button>
                    </Link>
                </li>
                <li className="mx-1 nav-item">
                    <Link to="/admin_user" className="nav-item-text">
                        <button className="btn navbar-btn nav-item-text text-white">
                            <i className="fa fa-light fa-users mr-2"><span className='d-none d-lg-inline d-xl-inline'>User Data</span> </i>
                        </button>
                    </Link>
                </li>
                <button className="btn navbar-btn nav-item-text text-white no-click">
                    <i className="fa fa-light fa-user mr-1"><span className='d-none d-lg-inline d-xl-inline'>Hi!,{name}</span></i>
                </button>
                <button className="btn navbar-btn nav-item-text text-white" onClick={logOut}>
                    <span className='d-none d-lg-inline d-xl-inline'>Log Out</span><i className="fa fa-light fa-sign-out mx-1"></i>
                </button>
            </ul>


        </nav>
    );
}

AdminNavBar.defaultProps = {

};

AdminNavBar.propTypes = {
};

export default AdminNavBar ;