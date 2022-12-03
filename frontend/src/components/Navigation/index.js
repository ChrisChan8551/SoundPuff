import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import GuestUserButton from './GuestUserButton';
import './Navigation.css';

function Navigation() {
	const loggedInUser = useSelector((state) => state.session.user);
	let sessionNavLinks;
	if (loggedInUser === null) {
		sessionNavLinks = (
			<>
				<SignupFormModal className='nav-text nav-item' to='/signup' />
				{/* <NavLink className='nav-text nav-item' to='/signup'>
					Sign Up
				</NavLink> */}

				<LoginFormModal className='nav-text nav-item' to='/login' />
				{/* <NavLink className='nav-text nav-item' to='/login'> */}
				{/* Login */}
				{/* </NavLink> */}
				<GuestUserButton className='nav-text nav-item'/>
			</>
		);
	} else if (loggedInUser)
		sessionNavLinks = (
			<>
				<ProfileButton user={loggedInUser} />
			</>
		);
	return (
		<div className='Nav-container'>
			<nav id='navigation-bar'>
				<ul id='all-nav-items'>
					<img
						src='https://cdn-icons-png.flaticon.com/512/148/148828.png'
						className='logo'
						alt='logo'
					></img>
					{/* <img
						src='https://a-v2.sndcdn.com/assets/images/wordmark@2x-8fdb346f.png'
						className='logo2'
						alt='logo2'
					></img> */}
					<p className='nav-text-title nav-item logo2'>SONG PUFF</p>
					<NavLink className='nav-text nav-item' to='/'>
						Home
					</NavLink>
					<NavLink className='nav-text nav-item' to='/songs'>
						Songs
					</NavLink>
					<NavLink className='nav-text nav-item' to='/albums'>
						Albums
					</NavLink>
				</ul>
				{sessionNavLinks}
			</nav>
		</div>
	);
}

export default Navigation;
