import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import EditCommentFormModal from '../EditComment';
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
	const [currentComment, setCurrentComment] = useState('');
	const loggedInUser = useSelector((state) => state.session.user);
	let songEditForm;
	let commentEditForm;

	useEffect(() => {
		dispatch(getCommentsBySongId(songId));
		dispatch(getOneComment(currentComment));
	}, [dispatch, songId, currentComment]);

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
					<ul>
						<li id='song-title'>{song.title}</li>
						<li id='song-artist'>{song?.Artist?.username}</li>
						<li id='song-description'>{`Description: ${song.description}`}</li>

						<div className='song-detail-buttons'>
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
																<button
																	className='song-delete-button'
																	onClick={() =>
																		deleteComment(
																			comment.id
																		)
																	}
																>
																	Delete
																</button>
																{!showEditCommentForm && (
																	<button className='song-edit-button'
																		onClick={() => {
																			setCurrentComment(
																				comment
																			);
																			setShowEditCommentForm(
																				true
																			);
																		}}
																	>
																		EDIT
																	</button>
																)}
															</>
														)}
													</div>
												)
											);
										})}
								</div>
							</div>
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SongDetailPage;
