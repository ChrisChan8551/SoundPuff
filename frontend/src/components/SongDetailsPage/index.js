import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import { getOneSong, removeSong } from '../../store/song';
import './SongDetailPage.css';

const SongDetailPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { songId } = useParams();
	const song = useSelector((state) => state.song[songId]);
	const [showEditSongForm, setShowEditSongForm] = useState(false);
	const loggedInUser = useSelector((state) => state.session.user);
	let songEditForm;

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
		songEditForm = (
			<EditSongFormModal
				song={song}
				hideForm={() => setShowEditSongForm(false)}
			/>
		);
	}

	return (
		<div className='song-detail'>
			<div className='song-detail-info'>
				<div className='song-detail-image'>
					<img className='song-detail-image'src={song.previewImage} alt='songimg'></img>
				</div>
				{songEditForm}
				<ul>
					<li id='song-title'>{song.title}</li>
					<li id='song-artist'>{song?.Artist?.username}</li>
					<li id='song-description'>{`Description: ${song.description}`}</li>
					<div className='song-detail-buttons'>
						{!showEditSongForm && song.userId === loggedInUser?.id && (
							<button
								className='song-edit-button'
								onClick={() => setShowEditSongForm(true)}
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
				</ul>
			</div>
		</div>
	);
};

export default SongDetailPage;
