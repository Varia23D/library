import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userData } from '../helpers/userStorage';
import axios from 'axios';

const RequirePhoneNumber = ({ children }) => {
	const navigate = useNavigate();
	const currentUser = userData();

	useEffect(() => {
		const checkUserPhone = async () => {
		try {
										// Make an API call to check if phone number is available
			const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/users/me`, {
			headers: {
				Authorization: `Bearer ${currentUser.jwt}`,
			},
			});
			if (!response.data.phone) {
			navigate('/account-settings');	// Navigate to settings if phone number is missing
			}
		}
		catch (error) {
			console.error('Error fetching user data:', error);
			navigate('/login');
		}
		};

		if (currentUser.jwt) {
		checkUserPhone();
		}
		else {
		navigate('/login');
		}
	}, [navigate, currentUser]);

	return currentUser.jwt ? children : null;	// Render children if JWT is available, otherwise render null
};

export default RequirePhoneNumber;
