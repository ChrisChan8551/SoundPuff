// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
	const dispatch = useDispatch();
	const loggedInUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	if (loggedInUser?.id) return <Redirect to='/' />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
				return setErrors(['Invalid username or password']);
			}
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='login-container'>
				<label className='login-label-form'>
					Username or Email
					<input
						className='input-form'
						type='text'
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label className='login-label-form'>
					Password
					<input
						className='input-form'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<button className='login-button-font-modal' type='submit'>
					Sign In
				</button>
				<ul className='login-ul'>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			</div>
		</form>
	);
}

export default LoginForm;
