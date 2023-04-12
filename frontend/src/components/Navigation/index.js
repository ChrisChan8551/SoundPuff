import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import GuestUserButton from './GuestUserButton';
import { setSearchbarValue, selectSearchbarValue } from '../../store/searchbar';
import './Navigation.css';

function Navigation() {
	const loggedInUser = useSelector((state) => state.session.user);
	const searchbarValue = useSelector(selectSearchbarValue);
	const location = useLocation();
	const dispatch = useDispatch();
	let sessionNavLinks;
	if (loggedInUser === null) {
		sessionNavLinks = (
			<>
				<SignupFormModal className='nav-text nav-item' to='/signup' />

				<LoginFormModal className='nav-text nav-item' to='/login' />

				<GuestUserButton className='nav-text nav-item' />
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
					<p className='nav-text-title nav-item logo2'>SONG PUFF</p>
					<NavLink className='nav-text nav-item' to='/'>
						Home
					</NavLink>
					<NavLink className='nav-text nav-item' to='/songs'>
						Songs
					</NavLink>
					{loggedInUser && (
						<NavLink
							className='nav-text nav-item'
							to='/songs/current'
						>
							Your Songs
						</NavLink>
					)}
					<NavLink className='nav-text nav-item' to='/albums'>
						Albums
					</NavLink>
					<div
						className={`search_middle ${
							location.pathname === '/songs' ? '' : 'hidden_search'
						}`}
					>
						<input
							type='Text'
							placeholder='Search Song Title'
							value={searchbarValue}
							onChange={(event) => {
								dispatch(setSearchbarValue(event.target.value));
							}}
						/>
					</div>
				</ul>
				{sessionNavLinks}
			</nav>
		</div>
	);
}

export default Navigation;
