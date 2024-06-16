import React from 'react';
import TopNavbar from '../components/TopNavbar';
import Footer from '../components/Footer';
import AccountSettings from '../components/AccountSettings';
import '../css/AccountSettings.css';

const EditProfile = () => {
    return (
        <div className="edit-container">
            <TopNavbar />
            <AccountSettings />
            <Footer />
        </div>
    );
}

export default EditProfile;
