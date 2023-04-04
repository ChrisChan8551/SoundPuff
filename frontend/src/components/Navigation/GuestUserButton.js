import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function GuestUserButton() {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);

	//demo user info from seeder
	const credential = 'demo@user.io';
	const password = 'password';
	const user = { credential, password };

	const logInGuest = () => {
		return dispatch(sessionActions.login(user)).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	return (
		<>
			<button className='guest-log-in-button' onClick={logInGuest}>
				<i className='fa-regular fa-user'>&nbsp;</i>
				Guest Log In
			</button>
		</>
	);
}

export default GuestUserButton;
