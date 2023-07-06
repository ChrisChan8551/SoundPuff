// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SongsPage from './components/SongsPage';
import HomePage from './components/HomePage';
import AlbumsPage from './components/AlbumsPage';
import AlbumDetailPage from './components/AlbumDetailPage';
import SongDetailPage from './components/SongDetailsPage';
import SongsbyCurrentUser from './components/SongsByCurrentUser';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path='/'>
						<HomePage />
					</Route>
					<Route exact path='/login'>
						<LoginFormPage />
					</Route>
					<Route exact path='/signup'>
						<SignupFormPage />
					</Route>
					<Route exact path='/songs'>
						<SongsPage />
					</Route>
					<Route exact path='/songs/current'>
						<SongsbyCurrentUser />
					</Route>
					<Route exact path='/songs/:songId'>
						<SongDetailPage />
					</Route>
					<Route exact path='/albums'>
						<AlbumsPage />
					</Route>
					<Route exact path='/albums/:albumId'>
						<AlbumDetailPage />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
