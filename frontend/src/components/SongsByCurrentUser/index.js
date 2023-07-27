import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect, NavLink } from 'react-router-dom';
import { getSongs, getSongsbyCurrentUser } from '../../store/song';
import CreateSongModal from '../CreateSongModal';
// import './SongsPage.css';

const SongsByCurrentUser = () => {
	const songs = Object.values(useSelector((state) => state.song));
	const usersongs = useSelector((state) => state.song);
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedInUser = useSelector((state) => state.session.user);
	const [showCreateSongForm, setShowCreateSongForm] = useState(false);
	let createSongForm;

	useEffect(() => {
		setShowCreateSongForm(false);
	}, [dispatch]);

	useEffect(() => {
		dispatch(getSongsbyCurrentUser());
	}, [dispatch]);

	if (!songs) {
		return null;
	}
	if (showCreateSongForm && loggedInUser?.id) {
		createSongForm = (
			<CreateSongModal
				album={null}
				hideForm={() => setShowCreateSongForm(false)}
			/>
		);
	}
	const goToDetails = (songId) => {
		// console.log('songId', songId);
		history.push(`/songs/${songId}`);
	};

	const getUserSongs = () => {
		return dispatch(getSongsbyCurrentUser());
	};

	return (
		<div className='song-main-container'>
			{!showCreateSongForm && loggedInUser?.id && (
				<button
					className='blue-button'
					onClick={() => setShowCreateSongForm(true)}
				>
					Add Song
				</button>
			)}
			<div className='song-container'>
				{songs &&
					songs.map((song) => {
						return (
							<div
								className='song-box'
								key={song.id}
								onClick={() => goToDetails(song.id)}
							>
								<div className='song-detail'>
									<div className='song-image'>
										<img
											className='song-detail-image'
											src={song.previewImage}
											alt='Song icon'
										/>
									</div>
									<div className='song-title'>
										{song.title}
									</div>
								</div>
							</div>
						);
					})}
				{createSongForm}
			</div>
		</div>

	);
};

export default SongsByCurrentUser;
