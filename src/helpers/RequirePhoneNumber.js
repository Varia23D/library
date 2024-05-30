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
			const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/users/me`, {
			headers: {
				Authorization: `Bearer ${currentUser.jwt}`,
			},
			});
			if (!response.data.phone) {
			navigate('/account-settings');
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

	return currentUser.jwt ? children : null;
};

export default RequirePhoneNumber;
