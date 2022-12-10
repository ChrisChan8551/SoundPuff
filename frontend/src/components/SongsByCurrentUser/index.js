import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect, NavLink} from 'react-router-dom';
import { getSongs, getSongsbyCurrentUser } from '../../store/song';
// import './SongsPage.css';

const SongsByCurrentUser = () => {
	const songs = Object.values(useSelector((state) => state.song));
	const usersongs = useSelector((state) => state.song)
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedInUser = useSelector((state) => state.session.user);


	// useEffect(() => {
	// 	dispatch(getSongs());
	// }, [dispatch]);

	useEffect(() => {
		dispatch(getSongsbyCurrentUser());
	}, [dispatch]);


	if (!songs) {
		return null;
	}

	const goToDetails = (songId) => {
		console.log('songId', songId);
		history.push(`/songs/${songId}`);
	};

	const getUserSongs = () => {
		return dispatch(getSongsbyCurrentUser())
	};

	console.log('****USERSONGS***', usersongs)
	return (
		<div className='song-container'>
			<div className='getSong-by-currentuser'>

				</div>
			<div className='song-detail'>
				<ul className='ul-songs'>
					{songs &&
						songs.map((song) => {
							return (
								<li key={song.id}>
									<div className='song-list-item' onClick={() => goToDetails(song.id)}>
										<div className='song-list-image'>
											<img className='song-detail-image'src={song.previewImage} alt='Song icon' />
										</div>
										<div>
											<p className='song-list-title'>{song.title}</p>
										</div>
									</div>
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
};

export default SongsByCurrentUser;
