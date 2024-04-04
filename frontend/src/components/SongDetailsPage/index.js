import { useState, useEffect, useRef } from 'react';
// import { Modal } from '../../context/Modal';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditSongFormModal from '../EditSongModal';
import EditCommentForm from '../EditComment/EditCommentForm';
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

const SongDetailPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const song = useSelector((state) => state.song[songId]);
    const comments = Object.values(useSelector((state) => state.comment));
    const [showEditSongForm, setShowEditSongForm] = useState(false);
    const [showEditCommentForm, setShowEditCommentForm] = useState(false);
    const [currentComment, setCurrentComment] = useState('');
    const [body, setBody] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const loggedInUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);
    const wavesurferRef = useRef(null);
    const wavesurferInstanceRef = useRef(null);
    const audioPlayerRef = useRef(null);
    let editComment;
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
                backend: 'WebAudio',
                cursorColor: '#f50',
                progressColor: '#f50',
                waveColor: '#999',
                cursorWidth: 2,
                interact: false,
            });
            wavesurfer.load(song.url);
            wavesurferInstanceRef.current = wavesurfer;

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


    if (showEditCommentForm) {
        editComment = (
            <EditCommentForm
                comment={currentComment}
                hideForm={() => setShowEditCommentForm(false)}
            />
        );
    }

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
            <div className='detail-container'>
                <div className='song-detail-box'>
                    <img
                        className='song-detail-image'
                        src={song.previewImage}
                        alt='songimg'
                    ></img>

                </div>
                <div className='song-detail-text-container'>
                    <div className='song-detail-text-box'>

                        <li id='song-title'>{song.title}</li>
                        <li id='song-artist'>{song?.Artist?.username}</li>
                        <li id='song-description'>{`${song.description}`}</li>

                    </div>
                    <div ref={wavesurferRef}></div>
                    <AudioPlayer
                        src={song.url}
                        onListen={handleListen}
                        ref={audioPlayerRef}
                    >
                        <source src={song.url} type='audio/mp3' />
                        Your browser does not support the audio element.
                    </AudioPlayer>

                </div>


            </div>
            <div className='detail-button-container'>

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
            <div className='comments-container'>
                <h2>User Comments</h2>
                <div>
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
                    {!showEditCommentForm &&
                        (<form>
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
                        </form>)}
                </div>
                {editComment}
            </div>
            {songEditForm(song)}
        </div>
    );
};

export default SongDetailPage;
