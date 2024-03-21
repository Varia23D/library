import React from "react";
import { Link } from "react-router-dom";
import './404-page.css';
import varialogo from './varialogo.png';

const NotFoundPage = () => 
    <div className="NotFound-Container">
        <img className="NotFound-logo" src={varialogo} alt="Varialogo" />
        <h2 className="NotFound-h2">404 Page not found</h2>
        <Link className="NotFound-Link" to='/'>Back to homepage</Link>
    </div>

export default NotFoundPage;