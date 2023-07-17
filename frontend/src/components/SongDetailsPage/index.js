import { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import EditCommentFormModal from '../EditComment';
import CreateCommentModal from '../CreateCommentModal';
import { getOneSong, removeSong } from '../../store/song';
import { removeComment, getCommentsBySongId } from '../../store/comment';
import './SongDetailPage.css';

const SongDetailPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { songId } = useParams();
	const song = useSelector((state) => state.song[songId]);
	const comments = Object.values(useSelector((state) => state.comment));
	const [showEditSongForm, setShowEditSongForm] = useState(false);
	const [showEditCommentForm, setShowEditCommentForm] = useState(false);
	const [showCreateCommentForm, setShowCreateCommentForm] = useState(false);
	const [currentComment, setCurrentComment] = useState('');
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const loggedInUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(getCommentsBySongId(songId));
	}, [dispatch, songId]);

	useEffect(() => {
		dispatch(getOneSong(songId));
	}, [songId, dispatch]);

	const deleteComment = (commentId) => {
		history.push(`/songs/${songId}`);
		return dispatch(removeComment(commentId));
	};

	const confirmDelete = () => {
		setShowDeleteConfirmation(true);
	};

	const cancelDelete = () => {
		setShowDeleteConfirmation(false);
	};

	const handleDelete = () => {
		history.push('/songs');
		dispatch(removeSong(songId));
	};

	const songEditForm = (song) => {
		if (showEditSongForm && song.userId === loggedInUser?.id) {
			return (
				<EditSongFormModal
					song={song}
					hideForm={() => setShowEditSongForm(false)}
				/>
			);
		}
	};

	const commentEditForm = (comment) => {
		if (showEditCommentForm && comment.userId === loggedInUser?.id) {
			return (
				<EditCommentFormModal
					comment={comment}
					hideForm={() => setShowEditCommentForm(false)}
				/>
			);
		}
	};

	const commentCreateForm = (song) => {
		if (showCreateCommentForm && loggedInUser?.id) {
			return (
				<CreateCommentModal
					song={song}
					hideForm={() => setShowCreateCommentForm(false)}
				/>
			);
		}
	};

	if (!song || !comments) {
		return null;
	}

	return (
		<div className='song-detail-main-container'>
			<div className='song-detail-container'>
				<div className='song-detail-box'>
					<img
						className='song-detail-detail-image'
						src={song.previewImage}
						alt='songimg'
					></img>
				</div>
				<div className='song-detail-box'>
					<ul>
						<li id='song-title'>{song.title}</li>
						<li id='song-artist'>{song?.Artist?.username}</li>
						<li id='song-description'>{`Description: ${song.description}`}</li>
					</ul>
					<audio
						controls
						controlsList='nodownload'
						className='audio-control'
					>
						<source src={song.url} type='audio/mp3' />
						Your browser does not support the audio element.
					</audio>
					<div>
						{!showEditSongForm &&
							song.userId === loggedInUser?.id &&
							!showDeleteConfirmation && (
								<button
									className='update-song-button'
									onClick={() => setShowEditSongForm(true)}
								>
									Edit
								</button>
							)}

						{song.userId === loggedInUser?.id &&
							!showDeleteConfirmation && (
								<button
									className='cancel-update-song-button'
									onClick={confirmDelete}
								>
									Delete
								</button>
							)}

						{showDeleteConfirmation && (
							<>
								<button
									className='add-song-button'
									onClick={handleDelete}
								>
									Confirm Delete
								</button>
								<button
									className='song-delete-button'
									onClick={cancelDelete}
								>
									Cancel
								</button>
							</>
						)}
					</div>
					{songEditForm(song)}
					{commentEditForm(currentComment)}
					{commentCreateForm(song)}
				</div>
				<div className='song-detail-box'></div>
				<div className='song-detail-box'>
					<div className='comments'>COMMENTS</div>
					<div className='comments'>
						{!showCreateCommentForm && (
							<button
								className='blue-button'
								onClick={() => setShowCreateCommentForm(true)}
							>
								Add Comment
							</button>
						)}
						{comments &&
							comments
								.filter(
									(comment) =>
										Number(comment.songId) ===
										Number(songId)
								)
								.map((comment, idx) => (
									<div
										className='comment-list'
										key={`${comment.id}`}
									>
										{`${comment.body}`}
										{comment.userId ===
											loggedInUser?.id && (
											<>
												<img
													className='trash-icon'
													src='/trash-icon.png'
													alt=''
													onClick={() =>
														dispatch(
															deleteComment(
																comment.id
															)
														)
													}
												/>
												{!showEditCommentForm && (
													<img
														className='edit-icon'
														src='/edit-icon.png'
														alt=''
														onClick={() => {
															setShowEditCommentForm(
																true
															);
															setCurrentComment(
																comment
															);
														}}
													/>
												)}
											</>
										)}
									</div>
								))}
					</div>
				</div>
				<div className='song-detail-box'></div>
				<div className='song-detail-box'></div>
			</div>
		</div>
	);
};

export default SongDetailPage;
