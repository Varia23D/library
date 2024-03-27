import React, {useState} from "react";
import './ProfileSettingsPage.css';
import axios from "axios";

const ProfileSettingsPage = () => {
    
    const initialUser = {phone:''};
    const [user, setUser] = useState(initialUser);
                      
    const addPhone = async () => {
        try{
            const url = 'http://localhost:1337/api/users-permissions/users/me';
            const result = await axios.put(url, user);       
                if (result){
                    console.log(result);
                    setUser(initialUser);
                    console.log('profile updated successfully');
                    alert('profile updated successfully');
                }
            }
        catch(error){
            console.error(error.message);                  
            alert('profile update unsuccessful: ' + error.message);
        }
    };

    const handleChange = ({target}) => {                              
            const {name, value} = target;                                
            setUser((currentUser) => ({currentUser, [name]:value})); 
        };

    return(
        <>
            <div className="profile_settings">
                <button className="back_button">back</button>
                <h1 className="profile_settings_heading">Edit Profile</h1>

                <div className="profile_settings_input_card">
                    <label>Phone Number</label>
                    <input name="phone" type="tel" value={user.phone} placeholder="enter your phone number" onChange={handleChange}/>
                    <button className="profile_settings_button" onClick={addPhone}>confirm</button>
                    <label>Password</label>
                    <input type="password" placeholder="enter previous password"/>
                    <input type="password" placeholder="enter new password"/>
                    <input type="password" placeholder="confirm new password"/>
                    <button className="profile_settings_button">confirm</button>
                </div>

            </div>
        </>
    );
};
export default ProfileSettingsPage;
