import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSongs } from '../../store/song';
import './SongsPage.css';

const SongsPage = () => {
	const songs = Object.values(useSelector((state) => state.song));
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(getSongs());
	}, [dispatch]);

	if (!songs) {
		return null;
	}

	const goToDetails = (songId) => {
		console.log('songId', songId);
		history.push(`/songs/${songId}`);
	};

	return (
		<div className='song-container'>
			<div className='song-detail'>
				<ul className='ul-songs'>
					{songs &&
						songs.map((song) => {
							return (
								<li key={song.id}>
									<div
										className='song-list-item'
										onClick={() => goToDetails(song.id)}
									>
										<div className='song-list-image'>
											<img src={song.previewImage} alt='Song icon' />
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

export default SongsPage;
