import React from "react";
import { Link } from "react-router-dom";
import '../css/404.css';
import varialogo from '../img/varialogo.png';

const NotFoundPage = () => 
    <div className="NotFound-Container">
        <img className="NotFound-logo" src={varialogo} alt="Varialogo" />
        <h2 className="NotFound-h2">404 Page not found</h2>
        <div>
        <Link className="NotFound-Link" to='/'>Back to homepage</Link>
        </div>
    </div>

export default NotFoundPage;