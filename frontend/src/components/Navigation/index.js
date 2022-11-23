import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation() {
	const loggedInUser = useSelector((state) => state.session.user);
	let sessionNavLinks;
	if (loggedInUser === null) {
		sessionNavLinks = (
			<>
				<LoginFormModal className='nav-text nav-item' to='/login' />
				{/* <NavLink className='nav-text nav-item' to='/login'> */}
				{/* Login */}
				{/* </NavLink> */}

				<SignupFormModal className='nav-text nav-item' to='/signup' />
				{/* <NavLink className='nav-text nav-item' to='/signup'>
					Sign Up
				</NavLink> */}
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
						<p className='nav-text-title nav-item'>SoundCloud Project</p>
						<NavLink className='nav-text nav-item' to='/'>
							Home
						</NavLink>
						<NavLink className='nav-text nav-item' to='/songs'>
							Songs
						</NavLink>
						<NavLink className='nav-text nav-item' to='/albums'>
							Albums
						</NavLink>
						{sessionNavLinks}
					</ul>
					</nav>
					{/* <div className='navigation-background'> <img src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_b@2x-7e5ff471.jpg' alt='nav pic'></img></div> */}

				</div>

	);
}

export default Navigation;
