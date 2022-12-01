import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import { getOneSong, removeSong } from '../../store/song';
import './SongDetailPage.css';
import EditSongForm from '../EditSongForm';

const SongDetailPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { songId } = useParams();
	const song = useSelector((state) => state.song[songId]);
	const loggedInUser = useSelector((state) => state.session.user);
	const [showEditSongForm, setShowEditSongForm] = useState(false);
	let otherInfo;

	useEffect(() => {
		setShowEditSongForm(false);
		dispatch(getOneSong(songId));
	}, [songId, dispatch]);

	if (!song) {
		return null;
	}

	const deleteSong = (songId) => {
		history.push('/songs');
		return dispatch(removeSong(songId));
	};

	if (showEditSongForm && song.userId === loggedInUser?.id) {

	}

	return (
		<div className='song-detail'>
			<div className='song-detail-info'>
				<div
					className='song-detail-image'
					// style={{ backgroundImage: `url('${song?.previewImage}')` }}
				>
					////
					<img src={song.previewImage} alt='songimage'></img>
				</div>
				<ul>
					<li id='song-title'>{song.title}</li>
					<li id='song-artist'>{song?.Artist?.username}</li>
					<li id='song-description'>{`Description: ${song.description}`}</li>
					<li id='song-url'>
						<div className='song-detail-buttons'>
							{song.userId === loggedInUser?.id && (
								<button
									className='song-edit-button'
									onClick={() => setShowEditSongForm(true)}
									// <EditSongForm/>
								>
									Edit
								</button>
							)}
							{song.userId === loggedInUser?.id && (
								<button
									className='song-delete-button'
									onClick={() => deleteSong(songId)}
								>
									Delete
								</button>
							)}
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SongDetailPage;
