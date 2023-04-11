import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import EditCommentFormModal from '../EditComment';
import CreateCommentModal from '../CreateCommentModal';
import { getOneSong, removeSong } from '../../store/song';
import {
	removeComment,
	getCommentsBySongId,
	getOneComment,
} from '../../store/comment';
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
	const loggedInUser = useSelector((state) => state.session.user);
	let songEditForm;
	let commentEditForm;
	let commentCreateForm;

	useEffect(() => {
		dispatch(getCommentsBySongId(songId));
		// dispatch(getOneComment(currentComment));
	}, [dispatch, songId]);

	useEffect(() => {
		dispatch(getOneSong(songId));
	}, [songId, dispatch]);

	if (!song) return null;

	if (!comments) return null;

	const deleteComment = (commentId) => {
		history.push(`/songs/${songId}`);
		return dispatch(removeComment(commentId));
	};

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

	if (showEditCommentForm && currentComment.userId === loggedInUser?.id) {
		commentEditForm = (
			<EditCommentFormModal
				comment={currentComment}
				hideForm={() => setShowEditCommentForm(false)}
			/>
		);
	}

	if (showCreateCommentForm && loggedInUser?.id) {
		commentCreateForm = (
			<CreateCommentModal
				song={song}
				hideForm={() => setShowCreateCommentForm(false)}
			/>
		);
	}

	return (
		<div className='song-container'>
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
					{commentEditForm}
					{commentCreateForm}
					<ul>
						<li id='song-title'>{song.title}</li>
						<li id='song-artist'>{song?.Artist?.username}</li>
						<li id='song-description'>{`Description: ${song.description}`}</li>

						<div className='song-detail-buttons'>
							<button
								className='comment-add-button'
								onClick={() => setShowCreateCommentForm(true)}
							>
								Add Comment
							</button>
							{!showEditSongForm &&
								song.userId === loggedInUser?.id && (
									<button
										className='song-edit-button'
										onClick={() =>
											setShowEditSongForm(true)
										}
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
						<div className='ul-comments'>
							User Comments:
							<div className='comments'>
								{comments &&
									comments?.map((comment, idx) => {
										return (
											Number(comment.songId) ===
												Number(songId) && (
												<div
													className='comment-list'
													key={`${comment.id}`}
												>
													{`${comment.body}`}
													{comment.userId ===
														loggedInUser?.id && (
														<>
															{/* <button
																className='song-delete-button'
																onClick={() =>
																	deleteComment(
																		comment.id
																	)
																}
															>
																Delete
															</button> */}
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
																// <button
																// 	className='song-edit-button'
																// 	onClick={() => {
																// 		setCurrentComment(
																// 			comment
																// 		);
																// 		setShowEditCommentForm(
																// 			true
																// 		);
																// 	}}
																// >
																// 	Edit
																// </button>
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
											)
										);
									})}
							</div>
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SongDetailPage;
