// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return (
		<>
			<button className='profile-button' onClick={openMenu}>
				{/* <i className='fas fa-user-circle' /> */}
				<img
					src='https://img.favpng.com/10/19/0/youtube-video-photography-user-profile-avatar-png-favpng-9GZkYjtixC5rYqPwYxPixQ2kp.jpg'
					alt='profile'
				></img>
			</button>
			{showMenu && (
				<ul className='profile-dropdown'>
					<li>{user.username}</li>
					<li>{user.email}</li>
					<li>
						<button className='logout-button-font' onClick={logout}>
							Sign Out
						</button>
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
