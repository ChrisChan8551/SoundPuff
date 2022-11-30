import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getOneSong, removeSong } from '../../store/song';
import './SongDetailPage.css';

const SongDetailPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { songId } = useParams();
	const song = useSelector((state) => state.song[songId]);

	// const [showCreateCommentForm, setShowCreateCommentForm] = useState(false);


	useEffect(() => {


		dispatch(getOneSong(songId));
	}, [songId, dispatch]);

	if (!song) {
		return null;
	}

	const deleteSong = (songId) => {
		history.push('/songs');
		return dispatch(removeSong(songId));
	};


	return (
		<div className='song-detail'>
			<div className='song-detail-info'>
				<div
					className='song-detail-image'
					style={{ backgroundImage: `url('${song?.previewImage}')` }}
				></div>
				<ul>
					<li id='song-title'>{song.title}</li>
					<li id='song-artist'>{song?.Artist?.username}</li>
					<li id='song-description'>{`Description: ${song.description}`}</li>
					<li id='song-url'>
						
					</li>
				</ul>
			</div>

		</div>
	);
};

export default SongDetailPage;
