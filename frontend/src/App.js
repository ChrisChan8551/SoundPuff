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
import SongDetailPage from './components/SongDetailsPage';

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
					<Route path='/login'>
						<LoginFormPage />
					</Route>
					<Route path='/signup'>
						<SignupFormPage />
					</Route>
					<Route exact path='/songs'>
						<SongsPage />
					</Route>
					<Route path='/songs/:songId'>
						<SongDetailPage/>
					</Route>
					<Route exact path='/albums'>
					<AlbumsPage />
					</Route>
					<Route path='/albums/:albumId'></Route>
				</Switch>
			)}
		</>
	);
}

export default App;
