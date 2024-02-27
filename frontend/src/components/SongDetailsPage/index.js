import { useState, useEffect, useRef } from 'react';
import { Modal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import EditCommentFormModal from '../EditComment';
import CreateCommentModal from '../CreateCommentModal';
import { getOneSong, removeSong } from '../../store/song';
import {
    createNewComment,
    removeComment,
    getCommentsBySongId,
} from '../../store/comment';
import './SongDetailPage.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import WaveSurfer from 'wavesurfer.js'
import Regions from 'wavesurfer.js/dist/plugins/regions.esm.js'


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
    const [body, setBody] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const loggedInUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);
    const songUrl = useSelector((state) => state.song)
    const wavesurferRef = useRef(null);
    const wavesurferInstanceRef = useRef(null);
    const audioPlayerRef = useRef(null);

    useEffect(() => {
        dispatch(getCommentsBySongId(songId));
        dispatch(getOneSong(songId));

        return () => {
            if (wavesurferInstanceRef.current) {
                wavesurferInstanceRef.current.destroy();
            }
        };
    }, [dispatch, songId]);


    useEffect(() => {
        // Initialize WaveSurfer when song data is available
        if (song && !wavesurferInstanceRef.current) {
            const wavesurfer = WaveSurfer.create({
                container: wavesurferRef.current,
                responsive: true,
                height: 100,
                barWidth: 2,
                barHeight: 1,
                // barGap: 2,
                backend: 'WebAudio',
                cursorColor: '#f50',
                progressColor: '#f50',
                waveColor: '#999',
                cursorWidth: 2,
                interact: false, // Disable user interaction
            });
            wavesurfer.load(song.url);
            wavesurferInstanceRef.current = wavesurfer;

            // Sync WaveSurfer with AudioPlayer
            audioPlayerRef.current.audio.current.addEventListener('timeupdate', () => {
                const currentTime = audioPlayerRef.current.audio.current.currentTime;
                wavesurfer.seekTo(currentTime / audioPlayerRef.current.audio.current.duration);
            });
        }
    }, [song]);

    const handleListen = () => {
        const currentTime = audioPlayerRef.current.audio.current.currentTime;
        wavesurferInstanceRef.current.seekTo(currentTime / audioPlayerRef.current.audio.current.duration);
    };
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

    // const commentCreateForm = (song) => {
    // 	if (showCreateCommentForm && loggedInUser?.id) {
    // 		return (
    // 			<CreateCommentModal
    // 				song={song}
    // 				hideForm={() => setShowCreateCommentForm(false)}
    // 			/>
    // 		);
    // 	}
    // };
    const createComment = async (e) => {
        if (e.keyCode === 13 && body.trimEnd() !== '') {
            e.preventDefault();

            let payload = { body, userId: loggedInUser.id, songId };
            let data = await dispatch(createNewComment(payload));
            setBody('');
            if (data.errors) {
                setErrors([...Object.values(data.errors)]);
            } else {
                history.push(`/songs/${songId}`);
            }
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
                    <div ref={wavesurferRef}></div>
                    <AudioPlayer
                        src={song.url}
                        onListen={handleListen}
                        ref={audioPlayerRef}
                    >
                        <source src={song.url} type='audio/mp3' />
                        Your browser does not support the audio element.
                    </AudioPlayer>
                    <div>
                        {!showEditSongForm &&
                            song.userId === loggedInUser?.id &&
                            !showDeleteConfirmation && (
                                <button
                                    className='orange-button'
                                    onClick={() => setShowEditSongForm(true)}
                                >
                                    Edit
                                </button>
                            )}

                        {song.userId === loggedInUser?.id &&
                            !showDeleteConfirmation && (
                                <button
                                    className='grey-button'
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                            )}

                        {showDeleteConfirmation && (
                            <>
                                <button
                                    className='blue-button'
                                    onClick={handleDelete}
                                >
                                    Confirm Delete
                                </button>
                                <button
                                    className='grey-button'
                                    onClick={cancelDelete}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                    {songEditForm(song)}
                    {commentEditForm(currentComment)}
                    {/* {commentCreateForm(song)} */}
                </div>

                <div className='song-detail-box'>
                    <h2>User Comments</h2>
                    <div>
                        {/* {!showCreateCommentForm && (
							<button
								className='blue-button'
								onClick={() => setShowCreateCommentForm(true)}
							>
								Add Comment
							</button>
						)} */}
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
                                                <div className='comment-icons'>
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
                                                </div>
                                            )}
                                    </div>
                                ))}
                        <form className='comment-form'>
                            <label>
                                <textarea
                                    onKeyUp={createComment}
                                    type='text'
                                    placeholder='Add a comment'
                                    className='comment-input'
                                    value={body}
                                    required
                                    onChange={(e) => setBody(e.target.value)}
                                />
                            </label>
                        </form>
                    </div>
                </div>
                {/* <div className='song-detail-box'></div>
				<div className='song-detail-box'></div>
				<div className='song-detail-box'></div> */}
            </div>
        </div>
    );
};

export default SongDetailPage;
