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
			<div className='navigation-background'>

				{/* <img
					src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_b@2x-7e5ff471.jpg'
					alt='song pic'
				></img> */}
        <div className='song-detail'>
				<ul>
					{songs &&
						songs.map((song) => {
							return (
								<li key={song.id}>
									<div
										className='song-list-item'
										onClick={() => goToDetails(song.id)}
									>
										<div
											className='song-list-image'
											style={{ backgroundImage: `url('${song.previewImage}')` }}
										></div>
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
    </div>
	);
};

export default SongsPage;
