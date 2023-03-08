// frontend/src/components/SignupFormPage/index.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to='/' />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({
					firstName,
					lastName,
					email,
					username,
					password,
				})
			).catch(async (res) => {
				const data = await res.json();
				console.log(data.errors);
				if (data && data.errors) setErrors([data.errors.email]);
			});
		}
		return setErrors([
			'Confirm Password field must be the same as the Password field',
		]);
	};

	return (
		// <div className='background-image'>
		<form onSubmit={handleSubmit}>
			<div className='signup-container'>
				<label className='signup-label-form'>
					First Name
					<input
						className='box_input'
						type='text'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label className='signup-label-form'>
					Last Name
					<input
						className='box_input'
						type='text'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label className='signup-label-form'>
					Email
					<input
						className='box_input'
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className='signup-label-form'>
					Username
					<input
						className='box_input'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className='signup-label-form'>
					Password
					<input
						className='box_input'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className='signup-label-form'>
					Confirm Password
					<input
						className='box_input'
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className='create-button-font-modal' type='submit'>
					Create Account
				</button>
			</div>
			<ul className='signupform-ul'>
				{errors.map((error, idx) => (
					<li className='signup-li-errors' key={idx}>
						{error}
					</li>
				))}
			</ul>
		</form>
		// </div>
	);
}

export default SignupFormPage;
