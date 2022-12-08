import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import { getOneSong, removeSong } from '../../store/song';
import commentReducer, { getCommentsBySongId } from '../../store/comment';
import './SongDetailPage.css';

const SongDetailPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { songId } = useParams();
	const song = useSelector((state) => state.song[songId]);
	const comments = Object.values(useSelector((state) => state.comment));
	const [showEditSongForm, setShowEditSongForm] = useState(false);
	const loggedInUser = useSelector((state) => state.session.user);
	let songEditForm;

	useEffect(() => {
		dispatch(getCommentsBySongId(songId));
	}, [songId, dispatch]);

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
	console.log('*****COMMENTS****');
	console.log(comments);
	// console.log(song)
	return (
		<div className='song-detail'>
			<div className='song-detail-info'>
				<div className='song-detail-image'>
					<img
						className='song-detail-image'
						src={song.previewImage}
						alt='songimg'
					></img>
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
						<div className='ul-comments'>
							User Comments:
							{comments &&
								comments?.map((comment, idx) => {
									return (
										Number(comment.songId) === Number(songId) && (
											<li className='comment-list' key={`${comment.id}`}>
												{`${comment.body}`}
											</li>
										)
									);
								})}
						</div>
					</div>
				</ul>
			</div>
		</div>
	);
};

export default SongDetailPage;
